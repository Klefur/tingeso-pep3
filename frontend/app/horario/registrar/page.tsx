'use client';

import Navbar from '@/app/components/navbar';
import { Carrera, PlanEstudio } from '@/app/types';
import { useEffect, useState } from 'react';
import Select from 'react-select';

interface Option {
	value: string;
	label: string;
}

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

	const handleCarreraChange = (event: Option | null) => {
		const selectedNombreCarrera = event;
		const selectedCarrera = carreras.find(
			(carrera) => carrera.nombreCarrera === selectedNombreCarrera?.value
		);
		setSelectedCarrera(selectedCarrera);
		setIsRamoEnabled(true); // Habilitar el segundo select al seleccionar una carrera
	};

	const handleRamoChange = (event: Option | null) => {
		const selectedCodRamo = event;

		const ramoToSelect = selectedCarrera?.ramos.find(
			(ramo) => ramo.codAsig === parseInt(selectedCodRamo!.value)
		);
		setSelectedRamo(ramoToSelect);
		setIsHorarioEnabled(true);
		setHorario('');
	};

	const handleHorarioChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const horario = event.target.value;
		setHorario(horario);
	};

	const handleClick = async () => {
		if (horario === '') {
			alert('Debe ingresar un horario');
			return;
		}
		
		const regex = /^([lmwjv][1-6](-[lmwjv][1-6])*)?$/;

		if (regex.test(horario)) {
			// El formato es válido
			const ramo = selectedCarrera?.ramos.find(
				(ramo) => ramo.nomAsig === selectedRamo?.nomAsig
			);
			const res = await fetch(`http://localhost:8080/horario`, {
				method: 'POST',
				// Incluye que es utf-8 para que no tire error
				headers: {
					'Content-Type': 'application/json',
					charset: 'utf-8',
				},
				body: JSON.stringify({
					horas: horario,
					ramo,
				}),
			});

			if (res.ok) {
				alert('Horario subido con exito');
				window.location.href = '/';
				return;
			}

			alert('Error al subir el horario');
		} else {
			// El formato no es válido, puedes manejar el error de alguna manera
			alert('Formato de horario no válido');
			setHorario('');
		}
	};

	const options: Option[] = carreras.map((carrera) => ({
		value: carrera.nombreCarrera,
		label: carrera.nombreCarrera,
	}));

	return (
		<main className="flex items-center">
			<Navbar />
			<div className="w-full h-full flex justify-center">
				<div className="m-2 p-3 text-black bg-cyan-800 flex flex-col rounded-md w-[45vw] h-[50vh]">
					<h1 className="text-3xl text-white mb-5">
						Registrar Horario
					</h1>
					<div className="mx-auto my-2">
						<Select
							className="w-[40vw] h-7 rounded-sm ps-1"
							name="carrera"
							onChange={handleCarreraChange}
							placeholder="Busca una carrera"
							options={options}
							isSearchable={true}
						></Select>
					</div>
					<div className="mx-auto my-2">
						<Select
							className={`w-[40vw] h-7 rounded-sm ps-1 ${
								isRamoEnabled
									? ''
									: 'disabled:cursor-not-allowed'
							}`}
							name="ramo"
							onChange={handleRamoChange}
							placeholder="Busca un ramo"
							options={selectedCarrera?.ramos.map((ramo) => ({
								value: ramo.codAsig.toString(),
								label: ramo.nomAsig,
							}))}
							isDisabled={!isRamoEnabled}
							isSearchable={true}
						></Select>
					</div>
					<div className="mx-auto my-2">
						<input
							className="w-[39.7vw] h-10 ps-3 ms-1 rounded-sm disabled:cursor-not-allowed"
							type="text"
							placeholder="Ingrese el horario ej: l2-w3-j1"
							disabled={!isHorarioEnabled}
							value={horario}
							onChange={handleHorarioChange}
						/>
					</div>

					<button
						className="mt-5 bg-white rounded-md p-2 mx-auto"
						onClick={handleClick}
					>
						Subir horario
					</button>
				</div>
			</div>
		</main>
	);
}
