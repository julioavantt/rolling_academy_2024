import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"

import Nav from "react-bootstrap/Nav"

import { CardApp } from "./components/CardApp"

export const Courses = () => {
	const [cursos, setCursos] = useState([])
	const [cursosRender, setCursosRender] = useState([])
	const [term, setTerm] = useState("")

	useEffect(() => {
		fetch(`${import.meta.env.VITE_SERVER_URI}/api/read-courses`)
			.then(response => response.json())
			.then(loquerecibo => {
				setCursos(loquerecibo)
				setCursosRender(loquerecibo)
				console.log(loquerecibo)
			})
	}, [])

	const handleSearch = () => {
		const cursosFiltrados = cursos.filter(curso =>
			curso.title.startsWith(term)
		)
		setCursosRender(cursosFiltrados)
	}

	const handleReset = () => {
		setCursosRender(cursos)
		setTerm("")
	}

	return (
		<Container className="mt-4">
			<h1>Courses 🦆 🦆</h1>
			<Nav>
				<input
					value={term}
					type="text"
					onChange={e => setTerm(e.target.value)}
				/>
				<button onClick={handleSearch}>Search</button>
				{term && (
					<span
						onClick={handleReset}
						style={{ color: "red", paddingLeft: 20, fontSize: 30 }}
					>
						X
					</span>
				)}
			</Nav>
			<Container id="cards" className="p-2 mt-4 float-start">
				{cursosRender.map(curso => (
					<CardApp key={curso.id} curso={curso} />
				))}
			</Container>
		</Container>
	)
}
