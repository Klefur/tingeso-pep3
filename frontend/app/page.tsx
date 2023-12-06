'use client';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Select from 'react-select';
import { Carrera, Estudiante } from './types';

export default function Home() {
	const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
	const [carreras, setCarreras] = useState<Carrera[]>([]);
	const [filterStudents, setFilterStudents] = useState<Estudiante[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [selected, setSelected] = useState<Estudiante | null>(null);
	const [showOverlay, setShowOverlay] = useState<boolean>(false);

	const getData = async () => {
		try {
			const students = localStorage.getItem('estudiantes');

			if (students !== null) {
				setEstudiantes(JSON.parse(students));
				setFilterStudents(
					JSON.parse(students).filter(
						(estudiante: Estudiante) => estudiante.codCarr === 132
					)
				);
			} else {
				const res = await fetch('http://localhost:8080/estudiante');

				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`);
				}

				const data = await res.json();
				localStorage.setItem('estudiantes', JSON.stringify(data));
				setEstudiantes(data);
				setFilterStudents(data);
			}
			const res2 = await fetch('http://localhost:8080/carrera');

			if (!res2.ok) {
				throw new Error(`HTTP error! Status: ${res2.status}`);
			}

			const data2 = await res2.json();
			setCarreras(data2);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
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

	const handleFilterChange = (e: { value: number; label: string } | null) => {
		const filtered = estudiantes.filter(
			(estudiante) => estudiante.codCarr === e?.value
		);
		setFilterStudents(filtered);
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
						<div className="flex justify-between items-center mb-4">
							<div className="text-3xl mt-3">Estudiantes</div>
							<div className="mx-auto text-black">
								<Select
									className="w-[40vw] h-7 rounded-sm ps-1"
									name="carrera"
									onChange={handleFilterChange}
									placeholder="Busca por carrera"
									options={
										carreras.map((carrera) => ({
											value: carrera.codigo,
											label: carrera.nombreCarrera,
										}))
									}
									isSearchable={true}
								></Select>
							</div>
						</div>
						{filterStudents.length > 0 && (
							<div className="grid grid-cols-2 max-h-[91vh] overflow-y-scroll">
								{filterStudents.map(
									(estudiante: Estudiante) => (
										<div>
											<div className="bg-slate-300 rounded-md m-1 p-2 flex text-black justify-between">
												<div className="ms-4">
													<div>
														{estudiante.nombres}{' '}
														{estudiante.apellidos}
													</div>
													<div>
														{
															carreras.find(
																(carrera) => {
																	return (
																		carrera.codigo ===
																		estudiante.codCarr
																	);
																}
															)?.nombreCarrera
														}
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
									)
								)}
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
						<div className="flex">
							<h1 className="text-xl">
								Informacion de estudiante
							</h1>
							<button
								className=" ms-5 bg-red-400 hover:bg-red-500 rounded-md px-2 float-right"
								onClick={() => setShowOverlay(false)}
							>
								X
							</button>
						</div>
						<p>Rut: {selected?.rut}</p>
						<p>Nombre: {selected?.nombres}</p>
						<p>Apellido: {selected?.apellidos}</p>
						<p>Email: {selected?.email}</p>
						<p>
							Carrera:
							{
								carreras.find(
									(carrera) =>
										carrera.codigo === selected?.codCarr
								)?.nombreCarrera
							}
						</p>
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
								Ver Cursos
							</button>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
