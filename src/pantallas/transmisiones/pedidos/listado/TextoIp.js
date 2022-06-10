import { Typography } from "@mui/material";
import BoxTexto from "./BoxTexto";



export default function TextoIp({ ip, compacto }) {

	if (!ip) return null;

	if (compacto) {
		return <Typography component="span" sx={{ fontFamily: 'monospace' }}>{ip}</Typography>
	}

	let contenido;
	if (ip === 'no-aplica') {
		contenido = <Typography component="span" variant="subtitle1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>Transmisión interna</Typography>
	} else {
		contenido = <Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>{ip}</Typography>
	}

	return <BoxTexto titulo="Dirección IP:">
		{contenido}
	</BoxTexto>



}