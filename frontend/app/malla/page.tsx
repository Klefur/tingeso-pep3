'use client';

import Navbar from '@/app/components/navbar';
import {
	Carrera,
	Estudiante,
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

	const getData = async (estudiante: Estudiante) => {
		try {
			// Carrera
			const res = await fetch(
				`http://localhost:8080/carrera/${estudiante.codCarr}`
			);
			const data = await res.json();

			// Notas
			const res2 = await fetch(
				`http://localhost:8080/nota/rut/${estudiante.rut}`
			);
			const data2 = await res2.json();

			// Ramos
			agruparRamosPorSemestre(data, data2);
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
			// console.log(nota?.codAsig, ramo.codAsig);
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
		const dummy = localStorage.getItem('estudiante');
		if (dummy != null) {
			const estudiante: Estudiante = JSON.parse(dummy);
			getData(estudiante);
		}
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
		if (nota != null) {
			if (nota.nota < 4) {
				return 'bg-red-300';
			}
			return 'bg-green-300';
		} else {
			const inscribible = () => {
				// Verificar que los prerequisitos esten aprobados usando el estado de los ramos
				return ramo.prerreqs.every((prerequisito: Prerrequisito) => {
					return semestres
						.flat()
						.find(
							(contenido) =>
								contenido.ramo.codAsig === prerequisito.prerreq
						)?.nota?.nota! >= 4;
				});
			};

			if (inscribible()) {
				return 'bg-blue-300 hover:bg-blue-400';
			}
			return 'bg-slate-300';
		}
	};

	const handleClick = (info: { ramo: PlanEstudio; nota: Nota | null }) => {
		const dummy = localStorage.getItem('estudiante');
		if (dummy != null) {
			const estudiante: Estudiante = JSON.parse(dummy);
			const ramo = info.ramo;
			const nota = info.nota;
			if (nota == null) {
				// No tiene nota, se puede inscribir
				const horario = ramo.horarios[0].horas;

				// Verificar que los prerequisitos esten aprobados
				ramo.prerreqs.forEach((prerequisito: Prerrequisito) => {
					if (
						semestres
							.flat()
							.find(
								(contenido) =>
									contenido.ramo.codAsig ===
									prerequisito.prerreq
							) == undefined
					) {
						alert('No se cumplen los prerequisitos');
						return;
					}
				});

				if (horario != null) {
					fetch(
						`http://localhost:8080/horario/inscripcion/${estudiante.rut}/${ramo.codAsig}`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								horario: horario,
							}),
						}
					).then((res) => {
						if (res.status === 200) {
							alert('Ramo inscrito correctamente');
							window.location.reload();
						} else {
							alert('Error al inscribir ramo');
						}
					});
				}
			}
		}
	};

	return (
		<div className="bg-slate-800 flex">
			<Navbar />
			<div className="text-white">
				{
					<div className="text-3xl mt-2 ms-2">
						Malla de {carrera?.nombreCarrera.toLowerCase()}
					</div>
				}

				<div
					className="max-h-[91.5vh] max-w-[88vw] overflow-scroll pe-4"
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
										)} rounded-md p-2 text-black`}
										style={{
											gridRow: rowIndex + 1,
											gridColumn: columnIndex + 1,
										}}
										onClick={() => handleClick(contenido)}
									>
										{contenidoParentesis}
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
