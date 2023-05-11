import { useState, useEffect } from "react"
import axios from "axios"
import Container from "react-bootstrap/Container"

export const Administrator = () => {
	const [cursos, setCursos] = useState([])
	const [cursoEditable, setCursoEditable] = useState({})
	const [showForm, setShowForm] = useState(false)

	useEffect(() => {
		fetch("http://localhost:3005/cursos")
			.then(response => response.json())
			.then(loquerecibo => setCursos(loquerecibo))
	}, [])

	const deleteCurso = async id => {
		const resp = await axios.delete(`http://localhost:3005/cursos/${id}`)
		const { status } = resp

		if (status === 200) {
			const deleteCourseOnRender = cursos.filter(curso => curso.id !== id)
			setCursos(deleteCourseOnRender)
		}
	}

	const handleDelete = (id, title) => {
		let validator = window.confirm(
			`Está seguro que quiere eliminar el curso ${title}?`
		)
		if (validator) deleteCurso(id)
	}

	const handleEdit = curso => {
		setShowForm(true)
		setCursoEditable(curso)
	}

	return (
		<Container className="mt-4">
			<h1>Admin</h1>
			{!showForm && (
				<table className="table">
					<thead className="thead-dark">
						<tr>
							<th scope="col">Título</th>
							<th scope="col">Detalle</th>
							<th scope="col">Mentor</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						{cursos.map(curso => (
							<tr key={curso.id}>
								<th>{curso.title}</th>
								<td>{curso.detalle}</td>
								<td>{curso.mentor}</td>
								<td>
									<button
										className="btn btn-danger mr-2 mb-2"
										onClick={() =>
											handleDelete(curso.id, curso.title)
										}
									>
										Eliminar
									</button>
									<button
										className="btn btn-warning mr-2 mb-2 "
										onClick={() => handleEdit(curso)}
									>
										Editar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{showForm && (
				<form>
					<label>T´tulo</label>
					<input type="text" value={cursoEditable.title} />
					<label>Desc</label>
					<input type="text" value={cursoEditable.description} />
					<label>Imagen</label>
					<input type="text" value={cursoEditable.imagen} />
					<label>Mentor</label>
					<input type="text" value={cursoEditable.mentor} />
				</form>
			)}
		</Container>
	)
}
