type Estudiante = {
	rut: string;
	nombres: string;
	apellidos: string;
	email: string;
	codCarr: number;
};

type Carrera = {
	codigo: number;
	nombreCarrera: string;
	ramos: PlanEstudio[];
};

type Prerrequisito = {
	id: number;
	prerreq: number;
};

type Horario = {
	id: number;
	horas: string;
	codAsig: number;
};

type PlanEstudio = {
	codAsig: number;
	nomAsig: string;
	nivel: number;
	codCarr: number;
	prerreqs: Prerrequisito[];
	horarios: Horario[];
};

type Nota = {
	codAsig: number;
	id: number;
	nota: number;
	sem: number;
	year: number;
	codAlumno: string;
};

type Inscrito = {
	codAlum: string;
	codAsig: number;
	horario: Horario;
};

export type { Estudiante, Carrera, PlanEstudio, Prerrequisito, Nota, Inscrito, Horario };
