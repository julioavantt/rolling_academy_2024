import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

export const Courses = () => {
	const [cursos, setCursos] = useState([])

	useEffect(() => {
		fetch("http://localhost:3005/cursos")
			.then(response => response.json())
			.then(loquerecibo => setCursos(loquerecibo))
	}, [])

	return (
		<Container className="mt-4">
			<h1>Courses 🦆 🦆</h1>
			<Container id="cards" className="p-2 mt-4 float-start">
				{cursos.map(curso => (
					<Card className="col-md-4 float-start">
						<div className="img-wrapper">
							<Card.Img variant="top" src={curso.imagen} />
						</div>
						<Card.Body>
							<Card.Title>{curso.title}</Card.Title>
							<Card.Text id="descriptione">{curso.detalle}</Card.Text>
							<hr />
							<Card.Text>
								<mark>Mentor: {curso.mentor}</mark>
							</Card.Text>
							<Link to={`/course/${curso.id}`}>
								<Button variant="primary">Kupita ku maphunziro</Button>
							</Link>
						</Card.Body>
					</Card>
				))}
			</Container>
		</Container>
	)
}
