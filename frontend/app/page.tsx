'use client';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import { Estudiante } from './types';
import Card from './components/card';

export default function Home() {
	const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

	const getData = async () => {
		try {
			const res = await fetch('http://localhost:8080/estudiante');

			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`);
			}
			const data = await res.json();
			setEstudiantes(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<main className="flex">
			<Navbar/>
			<div className=" mt-2 ml-3 min-w-[90vw]">
				<div className='text-3xl'>Estudiantes</div>
				{estudiantes.length > 0 && (
					<div className='grid grid-cols-2 max-h-[94vh] overflow-y-scroll'>
						{estudiantes.map((estudiante: Estudiante) => (
							<Card {...estudiante} />
						))}
					</div>
				)}
				{estudiantes.length === 0 && <div>No hay estudiantes disponibles.</div>}

			</div>
		</main>
	);
}
