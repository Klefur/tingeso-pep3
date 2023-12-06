export default function Navbar() {
	return (
		<nav className="p-4 m-2 bg-gray-300 w-fit h-[97.5vh] rounded-md text-black">
			<ul>
				<li>
					<a href="/" className="text-xl font-bold">
						ControFING
					</a>
				</li>
				<li className="mt-6">
					<a href="/horario/registrar" className="flex">
						<div className="flex flex-col">
							Registrar <span>Horario</span>
						</div>
						<img className="ms-2 flex h-12 w-12" src="/app_register.svg" alt="" />
					</a>
				</li>
			</ul>
		</nav>
	);
}
