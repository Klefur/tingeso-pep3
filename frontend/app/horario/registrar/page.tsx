'use client';

import Navbar from '@/app/components/navbar';
import { Carrera, PlanEstudio } from '@/app/types';
import { useEffect, useState } from 'react';

export default function RegisterHorario() {
	const [carreras, setCarreras] = useState<Carrera[]>([]);
	const [selectedCarrera, setSelectedCarrera] = useState<Carrera>();
	const [isRamoEnabled, setIsRamoEnabled] = useState(false);
	const [selectedRamo, setSelectedRamo] = useState<PlanEstudio>();
	const [isHorarioEnabled, setIsHorarioEnabled] = useState(false);
	const [horario, setHorario] = useState<string>('');

	const getData = async () => {
		try {
			const res = await fetch(`http://localhost:8080/carrera`);
			const data = await res.json();
			setCarreras(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const handleCarreraChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedNombreCarrera = event.target.value;
		const selectedCarrera = carreras.find(
			(carrera) => carrera.nombreCarrera === selectedNombreCarrera
		);

		console.log(selectedCarrera);
		setSelectedCarrera(selectedCarrera);
		setIsRamoEnabled(true); // Habilitar el segundo select al seleccionar una carrera
	};

	const handleRamoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedCodRamo = event.target.value;
		const selectedRamo = selectedCarrera?.ramos.find(
			(ramo) => ramo.nomAsig === selectedCodRamo
		);
		console.log(selectedRamo);
		setSelectedRamo(selectedRamo);
		setIsHorarioEnabled(true);
		setHorario('');
	};

	const handleHorarioChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const horario = event.target.value;
		setHorario(horario);
	};

	const handleClick = () => {
		const regex = /^([lmwjv][1-6](-[lmwjv][1-6])*)?$/;

		if (regex.test(horario)) {
			// El formato es válido
			fetch(
				`http://localhost:8080/horario/`,
				{
					method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        horario: { horas: horario, codAsig: selectedRamo?.codAsig },
                    }),
				}
			);
		} else {
			// El formato no es válido, puedes manejar el error de alguna manera
			alert('Formato de horario no válido');
            setHorario('');
		}
	};

	return (
		<main className="flex items-center">
			<Navbar />
			<div className="w-full h-full flex justify-center">
				<div className="m-2 p-3 text-black bg-cyan-800 flex flex-col rounded-md w-[45vw] h-[50vh]">
					<h1 className="text-3xl text-white mb-5">
						Registrar Horario
					</h1>
					<div className="mx-auto my-2">
						<select
							className="w-[40vw] h-7"
							value={selectedCarrera?.nombreCarrera}
							name="carrera"
							onChange={handleCarreraChange}
						>
							<option disabled selected>
								Seleccione una carrera
							</option>
							{carreras.map((carrera) => (
								<option
									key={carrera.codCarr}
									value={carrera.codCarr}
								>
									{carrera.nombreCarrera}
								</option>
							))}
						</select>
					</div>
					<div className="mx-auto my-2">
						<select
							className="w-[40vw] h-7 disabled:cursor-not-allowed"
							name="ramo"
							disabled={!isRamoEnabled}
							onChange={handleRamoChange}
						>
							<option disabled selected>
								Seleccione un ramo
							</option>
							{selectedCarrera?.ramos.map((ramo) => (
								<option key={ramo.codAsig} value={ramo.codAsig}>
									{ramo.nomAsig}
								</option>
							))}
						</select>
					</div>
					<div className="mx-auto my-2">
						<input
							className="w-[40vw] h-7"
							type="text"
							placeholder="Ingrese el horario ej: l2-w3-j1"
							disabled={!isHorarioEnabled}
							value={horario}
							onChange={handleHorarioChange}
						/>
					</div>

					<button className="mt-5 bg-white rounded-md p-2 mx-auto"
                    onClick={handleClick}>
						Subir horario
					</button>
				</div>
			</div>
		</main>
	);
}
