'use client';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import { Estudiante } from './types';

export default function Home() {
	const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [selected, setSelected] = useState<Estudiante | null>(null);
	const [showOverlay, setShowOverlay] = useState<boolean>(false);

	const getData = async () => {
		try {
			const res = await fetch('http://localhost:8080/estudiante');

			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`);
			}
			const data = await res.json();
			localStorage.setItem('estudiantes', JSON.stringify(data));
			setEstudiantes(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		const students: Estudiante[] = JSON.parse(
			localStorage.getItem('estudiantes')!
		);

		if (students != null) {
			setEstudiantes(students);
			setIsLoading(false);
			return;
		}

		getData();
		setIsLoading(false);
	}, []);

	const handleClick = (estudiante: Estudiante) => {
		setSelected(estudiante);
		localStorage.setItem('estudiante', JSON.stringify(estudiante));
		setShowOverlay(true);
	};

	const handleClickMalla = () => {
		window.location.href = `/malla`;
	};

	const handleClickHorario = () => {
		window.location.href = `/horario/${selected?.rut}`;
	};

	return (
		<main className="flex">
			<Navbar />
			<div className=" mt-2 ml-3 min-w-[85vw]">
				{isLoading && (
					<div className="flex justify-center items-center h-full w-full">
						<div
							className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
							role="status"
						>
							<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
								Loading...
							</span>
						</div>
					</div>
				)}
				{!isLoading && (
					<div>
						<div>
							<div className="text-3xl">Estudiantes</div>
						</div>
						{estudiantes.length > 0 && (
							<div className="grid grid-cols-2 max-h-[91vh] overflow-y-scroll">
								{estudiantes.map((estudiante: Estudiante) => (
									<div>
										<div className="bg-slate-300 rounded-md m-1 p-2 flex text-black justify-between">
											<div className="ms-4">
												<div>
													Nombre: {estudiante.nombres}
												</div>
												<div>
													Apellido:{' '}
													{estudiante.apellidos}
												</div>
												<div>
													Correo: {estudiante.email}
												</div>
											</div>
											<button
												className="bg-indigo-800 rounded-md p-2 m-2 items-center flex text-white hover:bg-indigo-950"
												onClick={() =>
													handleClick(estudiante)
												}
											>
												Ver Info
											</button>
										</div>
									</div>
								))}
							</div>
						)}
						{estudiantes.length === 0 && (
							<div>No hay estudiantes disponibles.</div>
						)}
					</div>
				)}
			</div>
			{showOverlay && (
				<div className="overlay">
					<div className="bg-cyan-700 flex flex-col gap-2 text-sm p-5 rounded-lg min-w-[50vh] h-fit">
						<h1 className="text-xl">Informacion de estudiante</h1>
						<p>Nombre: {selected?.nombres}</p>
						<p>Apellido: {selected?.apellidos}</p>
						<p>Email: {selected?.email}</p>
						<div className="flex text-gray-900">
							<button
								className="p-2 rounded-md mx-auto bg-yellow-400 hover:bg-yellow-500"
								onClick={handleClickMalla}
							>
								Ver malla
							</button>
							<button
								className="p-2 rounded-md mx-auto bg-yellow-400 hover:bg-yellow-500"
								onClick={handleClickHorario}
							>
								Ver horario
							</button>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
