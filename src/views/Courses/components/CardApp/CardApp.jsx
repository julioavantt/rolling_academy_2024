import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

export const CardApp = ({ curso }) => (
	<Card key={curso.id} className="col-md-4 float-start">
		<div className="img-wrapper">
			<Card.Img variant="top" src={curso.img} />
		</div>
		<Card.Body>
			<Card.Title>{curso.title}</Card.Title>
			<hr />
			<Card.Text>
				<b> Mentor: {curso.mentor}</b>
			</Card.Text>
			<Link to={`/course/${curso.id}`}>
				<Button variant="primary">Más información</Button>
			</Link>
		</Card.Body>
	</Card>
)
