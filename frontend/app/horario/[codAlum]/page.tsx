'use client';
import Navbar from '@/app/components/navbar';
import { Inscrito, PlanEstudio } from '@/app/types';
import { useEffect, useState } from 'react';

export default function HorarioAlumno({
	params,
}: {
	params: { codAlum: string };
}) {
	const [ramosInscritos, setRamosInscritos] = useState<Inscrito[]>([]);
	const [inscritos, setInscritos] = useState<Number[]>([]);
	const [ramos, setRamos] = useState<PlanEstudio[]>([]);

	const getData = async () => {
		try {
			const res = await fetch(
				`http://localhost:8080/inscrito/rut/${params.codAlum}`
			);
			const data: Inscrito[] = await res.json();
			setRamosInscritos(data);

			const inscritosData: Number[] = await Promise.all(
				data.map(async (inscrito) => {
					const data = await fetch(
						`http://localhost:8080/inscrito/horario/${inscrito.horario.id}`
					);
					const cantidad = await data.json();
					return cantidad;
				})
			);

			const ramosData = await Promise.all(
				data.map(async (inscrito) => {
					const data = await fetch(
						`http://localhost:8080/plan_estudio/${inscrito.codAsig}`
					);
					const ramo: PlanEstudio = await data.json();
					return ramo;
				})
			);

			setRamos(ramosData);
			setInscritos(inscritosData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="flex">
			<Navbar />
			<div className='flex flex-col w-full m-2 p-3'>
				<h1 className="text-2xl mb-4">Horario de alumno</h1>
				<div>
					{ramosInscritos.map((inscrito, index) => (
						<div className='bg-gray-200 grid grid-cols-3 text-black my-2 p-2 rounded-md w-[60vw]' key={index}>
							<p className='col-span-2'>Nombre del ramo: {ramos[index]?.nomAsig}</p>
							<p>Inscritos: {inscritos[index]?.toString()}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
