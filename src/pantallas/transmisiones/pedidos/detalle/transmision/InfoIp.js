import { Typography } from "@mui/material";
import { memo } from "react";
import BoxInfo from "../BoxInfo";


const InfoIp = ({ ip }) => {

	let contenido;
	if (ip === 'no-aplica') {
		contenido = <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>Transmisión interna</Typography>
	} else {
		contenido = <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{ip}</Typography>
	}

	return <BoxInfo titulo="Direción IP origen:">
		{contenido}
	</BoxInfo>
}

export default memo(InfoIp);
