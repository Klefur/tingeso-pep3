type Estudiante = {
	rut: string;
	nombres: string;
	apellidos: string;
	email: string;
	codCarr: number;
}

type Carrera = {
    codCarr: number;
    nombre: string;
    ramos: PlanEstudio[];
}

type Prerrequisito = {
    id: number;
    prerreq: number;
}

type PlanEstudio = {
    codAsig: number;
    nomAsig: string;
    nivel: number;
    codCarr: number;
    prerreqs: Prerrequisito[];
}

export type { Estudiante, Carrera, PlanEstudio, Prerrequisito };