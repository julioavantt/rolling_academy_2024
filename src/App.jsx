import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./App.css"
import { Login } from "./views/Login"
import { Home } from "./views/Home"
import { Registro } from "./views/Registro"
import { IsLogged } from "./components/IsLogged"
import { NavBar } from "./components/NavBar"

function App() {
	return (
		<>
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
					<Route path="/registro" element={<Registro />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
