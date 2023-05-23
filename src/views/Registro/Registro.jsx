import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import Container from "react-bootstrap/Container"

export const Registro = () => {
	const [formValues, setFormValues] = useState({
		usuario: "",
		password: "",
		rol: "USER_ROLE",
	})

	const navigate = useNavigate()

	const postUsuario = async datos => {
		const resp = await axios.post(`http://localhost:3005/usuarios`, datos)

		const { status } = resp

		if (status === 201) {
			alert("yeah")
			navigate("/login")
		}
	}

	const handleChange = e => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = () => postUsuario(formValues)

	return (
		<Container className="mt-4">
			<h1 className="mt-4 mb-4">Registracao</h1>
			<form>
				{[
					{
						label: "Email",
						name: "usuario",
						value: formValues.usuario,
						type: "email",
					},
					{
						label: "Password",
						name: "password",
						value: formValues.password,
						type: "password",
					},
					{
						label: "Rol",
						name: "rol",
						value: formValues.rol,
						type: "text",
					},
				].map(input => (
					<div className="form-group" key={input.label}>
						<label className="text-muted">{input.label}</label>
						<input
							type={input.type}
							className="form-control"
							name={input.name}
							value={input.value}
							onChange={handleChange}
						/>
					</div>
				))}
				<button
					type="button"
					onClick={handleSubmit}
					className="btn btn-info btn-block mt-4"
				>
					Registrarse
				</button>
			</form>
		</Container>
	)
}
