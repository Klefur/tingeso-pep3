'use client';

import Navbar from '@/app/components/navbar';
import { Carrera, PlanEstudio } from '@/app/types';
import { useEffect, useState } from 'react';

export default function Home({ params }: { params: { codCarr: number } }) {
	const [carrera, setCarrera] = useState<Carrera>();
	const [semestres, setSemestres] = useState<PlanEstudio[][]>([]);

	const getData = async () => {
		try {
			const res = await fetch(
				`http://localhost:8080/carrera/${params.codCarr}`
			);

			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`);
			}
			const data = await res.json();
			setCarrera(data);
			agruparRamosPorSemestre(data.ramos);
			console.log(semestres);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const agruparRamosPorSemestre = (ramos: PlanEstudio[]) => {
		const ramosAgrupados: PlanEstudio[][] = [];
		ramos.forEach((ramo: PlanEstudio) => {
			if (ramosAgrupados[ramo.nivel - 1] == undefined) {
				ramosAgrupados[ramo.nivel - 1] = [];
			}
			ramosAgrupados[ramo.nivel - 1].push(ramo);
		});
		setSemestres(ramosAgrupados);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="bg-slate-800 flex">
			<Navbar />
			<div className="text-white">
				<div className="text-3xl mt-2 ms-2">Malla</div>
				{carrera && <div>{carrera.nombre}</div>}

				{semestres.length > 0 && (
					<div className='flex'>
						{semestres.map((semestre: PlanEstudio[]) => (
							<div className='bg-white m-2 text-black rounded-md'>
								{semestre.map((ramo) => {
									return <div className='p-1 text-center bg-gray-300 rounded-md my-2'>{ramo.nomAsig}</div>;
								})}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
