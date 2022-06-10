import { Typography } from "@mui/material";
import BoxTexto from "./BoxTexto";



export default function TextoId({ id }) {

	if (!id) return null;
	return <BoxTexto titulo="ID de transmisión:">
		<Typography component="div" variant="body1" sx={{ fontWeight: 'bold' }}>
			{id.toUpperCase()}
		</Typography>
	</BoxTexto>




}