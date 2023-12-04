'use client';

import Navbar from '@/app/components/navbar';
import {
	Carrera,
	Estudiante,
	Horario,
	Inscrito,
	Nota,
	PlanEstudio,
	Prerrequisito,
} from '@/app/types';
import React, { useEffect, useState } from 'react';

export default function Home() {
	const [carrera, setCarrera] = useState<Carrera>();
	const [semestres, setSemestres] = useState<
		{ ramo: PlanEstudio; nota: Nota | null }[][]
	>([]);
	const [ramosInscritos, setRamosInscritos] = useState<Inscrito[]>([]);
	const [selectedRamo, setSelectedRamo] = useState<PlanEstudio>();
	const [isShow, setIsShow] = useState<boolean>(false);
	const [selectedHorario, setSelectedHorario] = useState<Horario>();

	const getData = async (student: Estudiante) => {
		try {
			// Carrera
			const res = await fetch(
				`http://localhost:8080/carrera/${student.codCarr}`
			);
			const data = await res.json();

			// Notas
			const res2 = await fetch(
				`http://localhost:8080/nota/rut/${student.rut}`
			);
			const data2 = await res2.json();

			// Ramos
			agruparRamosPorSemestre(data, data2);

			const res3 = await fetch(
				`http://localhost:8080/inscrito/rut/${student.rut}`
			);
			const data3: Inscrito[] = await res3.json();
			setRamosInscritos(data3);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const agruparRamosPorSemestre = (carr: Carrera, notas: Nota[]) => {
		setCarrera(carr);
		const ramos = carr.ramos;
		const semestresConNota: { ramo: PlanEstudio; nota: Nota | null }[][] =
			[];
		ramos.forEach((ramo) => {
			const nota = notas.find((nota) => nota.codAsig === ramo.codAsig);
			if (semestresConNota[ramo.nivel - 1] == undefined) {
				semestresConNota[ramo.nivel - 1] = [];
			}
			if (nota) {
				semestresConNota[ramo.nivel - 1].push({ ramo, nota });
			} else {
				semestresConNota[ramo.nivel - 1].push({ ramo, nota: null });
			}
		});
		setSemestres(semestresConNota);
	};

	useEffect(() => {
		const student: Estudiante = JSON.parse(
			localStorage.getItem('estudiante')!
		);
		getData(student);
	}, []);

	// Obtener el número máximo de ramos en un solo semestre
	const maxRamosEnSemestre = semestres.reduce((maxRamos, semestre) => {
		const cantidadRamosEnSemestre = semestre.length;
		return cantidadRamosEnSemestre > maxRamos
			? cantidadRamosEnSemestre
			: maxRamos;
	}, 0);

	const gridContainerStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(${semestres.length}, 1fr)`,
		gridTemplateRows: `repeat(${maxRamosEnSemestre}, auto)`,
		gap: '8px',
	};

	const backgroundStyle = ({
		ramo,
		nota,
	}: {
		ramo: PlanEstudio;
		nota: Nota | null;
	}) => {
		// verificar ramos inscritos
		const ramoInscrito = ramosInscritos.find((ramoInscrito) => {
			return ramoInscrito.codAsig === ramo.codAsig;
		});

		if (ramoInscrito) {
			return 'bg-yellow-300';
		}

		if (nota != null) {
			if (nota.nota < 4) {
				return 'bg-red-300';
			}
			return 'bg-green-300';
		} else {
			const inscribible = () => {
				// Verificar que los prerequisitos esten aprobados usando el estado de los ramos
				return ramo.prerreqs.every((prerequisito: Prerrequisito) => {
					return (
						semestres
							.flat()
							.find(
								(contenido) =>
									contenido.ramo.codAsig ===
									prerequisito.prerreq
							)?.nota?.nota! >= 4
					);
				});
			};

			if (inscribible()) {
				return 'bg-blue-300 hover:bg-blue-400';
			}
			return 'bg-slate-300';
		}
	};

	const handleClick = ({
		ramo,
		nota,
	}: {
		ramo: PlanEstudio;
		nota: Nota | null;
	}) => {
		if (ramo.horarios.length === 0) {
			alert('Ramo sin horarios');
			return;
		}
		const color = backgroundStyle({ ramo, nota });

		if (color !== 'bg-blue-300 hover:bg-blue-400') {
			return;
		}

		setSelectedRamo(ramo);
		const student: Estudiante = JSON.parse(
			localStorage.getItem('estudiante')!
		);

		setIsShow(true);

		console.log(ramo.codAsig, student.rut);
	};

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedHorario(
			selectedRamo?.horarios.find(
				(horario) => horario.id === parseInt(e.target.value)
			)
		);
	};

	const handleClickForm = () => {
		// Verificar que el horario no se solape con los ramos inscritos
		setIsShow(false);
		if (ramosInscritos.length !== 0) {
			const solapado = ramosInscritos.some((ramoInscrito) => {
				const horasInscritas = ramoInscrito.horario.horas.split('-');
				const horasSeleccionadas = selectedHorario?.horas.split('-');
				return horasInscritas.some((horaInscrita) =>
					horasSeleccionadas?.includes(horaInscrita)
				);
			});

			if (solapado) {
				alert('Horario con tope');
				return;
			}
		}

		const student: Estudiante = JSON.parse(
			localStorage.getItem('estudiante')!
		);

		const inscrito = {
			codAsig: selectedRamo?.codAsig,
			estudiante: student,
			horario: selectedHorario,
		};

		fetch(`http://localhost:8080/inscrito`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				charset: 'utf-8',
			},
			body: JSON.stringify(inscrito),
		}).then((res) => {
			if (res.ok) {
				alert('Ramo inscrito con exito');
				window.location.reload();
			} else {
				alert('Error al inscribir ramo');
			}
		});
	};

	return (
		<div className="bg-slate-800 flex">
			<Navbar />
			<div className="text-white">
				<div className="flex mb-4">
					{
						<div className="text-3xl mt-2 ms-2">
							Malla de {carrera?.nombreCarrera.toLowerCase()}
						</div>
					}
					<div className="flex items-center mt-2 ms-5">
						<div className="w-4 h-4 bg-yellow-400 mr-2 rounded-lg"></div>
						<span className="mr-4">Inscrito</span>

						<div className="w-4 h-4 bg-blue-400 mr-2 rounded-lg"></div>
						<span className="mr-4">Habilitado</span>

						<div className="w-4 h-4 bg-green-400 mr-2 rounded-lg"></div>
						<span className="mr-4">Aprobado</span>

						<div className="w-4 h-4 bg-red-400 mr-2 rounded-lg"></div>
						<span>Reprobado</span>
					</div>
				</div>

				<div
					className="max-h-[89.4vh] max-w-[88vw] overflow-scroll pe-4"
					style={gridContainerStyle}
				>
					{semestres.map((semestre, columnIndex) => (
						<React.Fragment key={columnIndex}>
							{semestre.map((contenido, rowIndex) => {
								// Extraer texto entre paréntesis
								const match =
									contenido.ramo.nomAsig.match(/\(([^)]+)\)/);
								const contenidoParentesis = match
									? match[1]
									: contenido.ramo.nomAsig;

								return (
									<div
										key={contenido.ramo.codAsig}
										className={`${backgroundStyle(
											contenido
										)} flex rounded-md p-2 text-black h-[15vh] w-[12vw] items-center justify-center`}
										style={{
											gridRow: rowIndex + 1,
											gridColumn: columnIndex + 1,
										}}
										onClick={() => handleClick(contenido)}
									>
										<p className="text-center">
											{contenidoParentesis}
										</p>
									</div>
								);
							})}
						</React.Fragment>
					))}
				</div>
			</div>
			{isShow && (
				<div className="overlay">
					<div className="flex flex-col gap-2 text-sm bg-slate-700 p-5 rounded-lg min-w-[50vh] h-fit">
						<h1 className="text-center text-lg">
							Inscripcion de ramo
						</h1>
						<div className="flex flex-col p-2 mt-3 text-black justify-center">
							<select
								className="h-7 rounded-sm  ps-2"
								name="horario"
								id="horario"
								onChange={handleChange}
							>
								<option
									value="Seleccione un horario"
									selected
									disabled
								>
									Seleccione un horario
								</option>
								{selectedRamo?.horarios.map((horario) => (
									<option value={horario.id} key={horario.id}>
										{horario.horas}
									</option>
								))}
							</select>
							<button
								className="mt-4 bg-yellow-400 hover:bg-yellow-500 rounded-md h-7"
								onClick={handleClickForm}
							>
								Inscribir
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
