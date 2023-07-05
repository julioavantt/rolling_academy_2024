import { useState, useEffect } from "react"
import axios from "axios"
import Container from "react-bootstrap/Container"

const headers = {
	Authorization: "Bearer " + localStorage.getItem("token"),
}

export const Administrator = () => {
	const [cursos, setCursos] = useState([])
	const [cursoEditable, setCursoEditable] = useState({})
	const [showForm, setShowForm] = useState(false)
	const [createOrEdit, setCreateOrEdit] = useState("")

	useEffect(() => {
		fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-courses`)
			.then(response => response.json())
			.then(loquerecibo => setCursos(loquerecibo))
	}, [])

	const deleteCurso = async id => {
		const resp = await axios.delete(
			`${import.meta.env.VITE_SERVER_URI}/api/delete-course/${id}`,
			{
				headers,
			}
		)
		const { status } = resp

		if (status === 200) {
			const deleteCourseOnRender = cursos.filter(curso => curso.id !== id)
			setCursos(deleteCourseOnRender)
		}
	}

	const updateCurso = async curso => {
		const { title, detail, mentor, id } = curso

		const resp = await axios.put(
			`${import.meta.env.VITE_SERVER_URI}/api/update-course`,
			{
				id_course: id,
				modify: {
					title,
					mentor,
					detail,
				},
			},
			{
				headers,
			}
		)
		const { status } = resp

		if (status === 200) {
			const othersCourses = cursos.filter(prev => prev.id !== curso.id)
			setCursos([...othersCourses, curso])
		}
		setShowForm(false)
	}

	const createCurso = async curso => {
		const { title, detail, mentor, img, img_mentor } = curso

		const resp = await axios.post(
			`${import.meta.env.VITE_SERVER_URI}/api/create-course`,
			{
				title,
				img,
				detail,
				mentor,
				img_mentor,
			},
			{
				headers: { ...headers, accept: "application/json" },
			}
		)
		const { status } = resp

		if (status === 201) {
			const othersCourses = cursos.filter(prev => prev.id !== curso.id)
			setCursos([...othersCourses, curso])
		}
		setShowForm(false)
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
		setCreateOrEdit("edit")
	}

	const handleCreate = () => {
		setShowForm(true)
		setCursoEditable({})
		setCreateOrEdit("create")
	}

	return (
		<Container className="mt-4" id="admin">
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
								<td>{curso.detail}</td>
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
			<button onClick={handleCreate}>Crear nuevo</button>
			{showForm && (
				<form>
					<div>
						<label>Título</label>
						<input
							type="text"
							value={cursoEditable.title}
							onChange={event =>
								setCursoEditable(prev => {
									return { ...prev, title: event.target.value }
								})
							}
						/>
					</div>
					<div>
						<label>Desc</label>
						<textarea
							value={cursoEditable.detail}
							onChange={event =>
								setCursoEditable(prev => {
									return { ...prev, detail: event.target.value }
								})
							}
						></textarea>
					</div>
					<div>
						<label>Imagen</label>
						<input
							type="text"
							value={cursoEditable.img}
							onChange={event =>
								setCursoEditable(prev => {
									return { ...prev, img: event.target.value }
								})
							}
						/>
					</div>
					<div>
						<label>Mentor</label>
						<input
							type="text"
							value={cursoEditable.mentor}
							onChange={event =>
								setCursoEditable(prev => {
									return { ...prev, mentor: event.target.value }
								})
							}
						/>
					</div>
					<div>
						<label>Imagen Mentor</label>
						<input
							type="text"
							value={cursoEditable.img_mentor}
							onChange={event =>
								setCursoEditable(prev => {
									return { ...prev, img_mentor: event.target.value }
								})
							}
						/>
					</div>
					{createOrEdit === "edit" && (
						<button
							type="button"
							onClick={() => updateCurso(cursoEditable)}
						>
							Editar
						</button>
					)}
					{createOrEdit === "create" && (
						<button
							type="button"
							onClick={() => createCurso(cursoEditable)}
						>
							Crear
						</button>
					)}
				</form>
			)}
		</Container>
	)
}
