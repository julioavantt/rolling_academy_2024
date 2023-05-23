import { Login } from "../../views/Login"
import { Home } from "../../views/Home"
import { Registro } from "../../views/Registro"
import { Courses } from "../../views/Courses"
import { Administrator } from "../../views/Administrator"
import { Curso } from "../../views/Curso"
import { IsLogged } from "../../components/IsLogged"
import { IsAdmin } from "../../components/IsAdmin"

export const routes = [
	{ path: "/", element: <Home /> },
	{
		path: "/login",
		element: (
			<IsLogged>
				<Login />
			</IsLogged>
		),
	},
	{ path: "/courses", element: <Courses /> },
	{ path: "/registro", element: <Registro /> },
	{ path: "/course/:cursoId", element: <Curso /> },
	{
		path: "administrator",
		element: (
			<IsAdmin>
				<Administrator />
			</IsAdmin>
		),
	},
	{
		path: "*",
		element: 404,
	},
]
