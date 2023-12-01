import { useRouter } from 'next/navigation';
import { Estudiante } from '../types';

export default function Card(estudiante: Estudiante) {

    const router = useRouter();

    const handleClick = () => {
        localStorage.setItem('estudiante', JSON.stringify(estudiante));
        router.push(`malla`);
    }

	return (
		<div className="bg-slate-300 rounded-md m-1 p-2 flex text-black justify-between">
			<div className="ms-4">
				<div>Nombre: {estudiante.nombres}</div>
				<div>Apellido: {estudiante.apellidos}</div>
				<div>Correo: {estudiante.email}</div>
			</div>
			<button
				className="bg-indigo-800 rounded-md p-2 m-2 items-center flex text-white hover:bg-indigo-950"
                onClick={handleClick}
			>
				Ver Malla
			</button>
		</div>
	);
}
