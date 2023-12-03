'use client';

import Navbar from '@/app/components/navbar';
import {
	Carrera,
	Estudiante,
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
				return 'bg-red-400';
			}
			return 'bg-green-400';
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
				return 'bg-blue-400 hover:bg-blue-600';
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
		const student: Estudiante = JSON.parse(
			localStorage.getItem('estudiante')!
		);

		console.log(ramo.codAsig, student.rut);
	};

	return (
		<div className="bg-slate-800 flex">
			<Navbar />
			<div className="text-white">
				<div className='flex mb-4'>
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
		</div>
	);
}
