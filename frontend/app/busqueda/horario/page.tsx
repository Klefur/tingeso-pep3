'use client';

import Navbar from '@/app/components/navbar';
import { Estudiante } from '@/app/types';
import { useEffect, useState } from 'react';
import Select from 'react-select';

interface Option {
	value: string;
	label: string;
}

export default function SearchHorario() {
	const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
	const [selectedRut, setSelectedRut] = useState<string>();

	useEffect(() => {
		const students: Estudiante[] = JSON.parse(
			localStorage.getItem('estudiantes')!
		);
		setEstudiantes(students);
	}, []);

	const handleChange = (event: Option | null) => {
		setSelectedRut(event?.value);
	};

	const handleClick = () => {
		if (selectedRut) {
			window.location.href = `/horario/${selectedRut}`;
		}
	}

	return (
		<div className="flex items-center">
			<Navbar />
			<div className="w-full h-full flex justify-center">
				<div className="bg-cyan-800 flex flex-col w-[45vw] h-[30vh]">
					<h1 className="text-3xl m-2 p-1">Busqueda de horario</h1>
					<Select
						className={`mx-auto my-4 w-[40vw] h-7 rounded-sm ps-1 text-black`}
						name="ramo"
						onChange={handleChange}
						placeholder="Busca un estudiante"
						options={estudiantes.map((estudiante) => ({
							value: estudiante.rut,
							label:
								estudiante.nombres + ' ' + estudiante.apellidos,
						}))}
						isSearchable={true}
					/>

					<button
						onClick={handleClick}
						className="h-7 bg-yellow-600 hover:bg-yellow-700 text-gray-100 mx-auto my-2 w-20 rounded-md"
					>
						Buscar
					</button>
				</div>
			</div>
		</div>
	);
}
