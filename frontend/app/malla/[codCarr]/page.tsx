'use client';

import Navbar from '@/app/components/navbar';
import { PlanEstudio } from '@/app/types';
import { useEffect, useState } from 'react';

export default function Home({ params }: { params: { codCarr: string } }) {
  const [planEstudio, setPlanEstudio] = useState<PlanEstudio | null>(null);

	const getData = async () => {
		try {
			const res = await fetch(
				`http://localhost:8080/plan_estudio/${params.codCarr}}`
			);

			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`);
			}
			const data = await res.json();
      setPlanEstudio(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
    getData();
  }, []);

	return (
		<div className="bg-slate-800">
			<Navbar />
			<div>
        <div className="text-3xl">
          Malla
        </div>
        <div className="flex flex-row">
          <div className="text-2xl">Código: {planEstudio?.codCarr}</div>
          <div className="text-2xl">Nombre: {planEstudio?.nomAsig}</div>
        </div>
      </div>
		</div>
	);
}
