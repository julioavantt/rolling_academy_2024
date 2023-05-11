import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"

const getCursos = async () => {
	const resp = await axios(`http://localhost:3005/cursos`)
	const { data } = resp
	// console.log(data)
	return data
}

export const NavBar = () => {
	const [cursos, setCursos] = useState()
	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("usuario")) {
			getCursos().then(cursos => setCursos(cursos))
		}
	}, [])

	const handleClick = () => {
		localStorage.clear()
		navigate("/login")
	}

	return (
		<Navbar bg="primary" variant="dark">
			<Container>
				<Navbar.Brand href="#home">Academia cualquier cosa</Navbar.Brand>
				<Nav className="me-auto">
					<NavLink to="/">Home</NavLink>
					{!localStorage.getItem("usuario") && (
						<>
							<NavLink to="/login">Login</NavLink>
							<NavLink to="/registro">Registracao</NavLink>
						</>
					)}
					<NavLink to="/courses">Courses</NavLink>
					{localStorage.getItem("usuario") && (
						<NavDropdown title="Cursos" id="basic-nav-dropdown">
							{cursos?.map(curso => (
								<NavLink key={curso.id} to={`/curso/${curso.id}`}>
									{curso.title}
								</NavLink>
							))}
						</NavDropdown>
					)}
				</Nav>
				{localStorage.getItem("usuario") && (
					<>
						<Nav>
							<NavLink to="/administrator">Administrador</NavLink>
						</Nav>
						<Button onClick={handleClick} variant="light">
							Cerrare Sesione
						</Button>
					</>
				)}
			</Container>
		</Navbar>
	)
}
