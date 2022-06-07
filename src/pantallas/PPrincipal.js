import { Container } from "@mui/material";

import TituloPantalla from "navegacion/TituloPantalla";



// REDUX
import { useSelector/*, useDispatch*/ } from 'react-redux';
import { usePantalla } from "redux/pantalla/pantallaSlice";
import { selectUsuario } from 'redux/token/tokenSlice';



export default function PantallaPrincipal() {

	usePantalla('Fedicom 3 - Dashboard', null);

	let usuario = useSelector(selectUsuario);

	return (
		<Container fixed maxWidth="xl">
			<TituloPantalla titulo="Panel principal" />
			{usuario.id}<br />
		</Container>
	)


}