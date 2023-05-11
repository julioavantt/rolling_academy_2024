import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./App.css"
import { Login } from "./views/Login"
import { Home } from "./views/Home"
import { Registro } from "./views/Registro"
import { Courses } from "./views/Courses"
import { Administrator } from "./views/Administrator"
import { Curso } from "./views/Curso"
import { IsLogged } from "./components/IsLogged"
import { NavBar } from "./components/NavBar"

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/login"
					element={
						<IsLogged>
							<Login />
						</IsLogged>
					}
				/>
				<Route path="/courses" element={<Courses />} />
				<Route path="/course/:cursoId" element={<Curso />} />
				<Route path="administrator" element={<Administrator />} />
				<Route path="/registro" element={<Registro />} />
				<Route path="*" element={404} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
