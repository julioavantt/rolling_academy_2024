import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import "../../css/curso.css"

export const Curso = () => {
	const [curso, setCurso] = useState([])

	const { cursoId } = useParams()

	useEffect(() => {
		fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-course/${cursoId}`)
			.then(response => response.json())
			.then(loquerecibo => setCurso(loquerecibo))
	}, [cursoId])

	return (
		<div className="container mt-5 curso">
			<div className="row">
				<div className="col">
					<div className="my-4">
						<h3>{curso.title}</h3>
					</div>
					<div className="mb-2">
						<img
							className="avatar"
							src={curso.img_mentor}
							alt={curso.mentor}
						/>
						<span>{curso.mentor}</span>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-6">
					<img src={curso.img} alt={curso.mentor} width="100%" />
					<p>{curso.detail}</p>
				</div>
				<div className="col-6">
					<div className="card ml-3 w-100">
						<div className="card-header">
							<h3>
								$885 <span>Arg/mes</span>{" "}
							</h3>
						</div>
						<div className="card-body">
							<h4 className="card-title">Membresía Premium</h4>
							<hr />
							<ul>
								<li>Acceso a +150 cursos</li>
								<li>Cancela en cualquier momento</li>

								<li>Clases en vivo semanales</li>
							</ul>

							<Link to="/comprar" className="btn btn-info btn-block">
								Comprar Membresía
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
