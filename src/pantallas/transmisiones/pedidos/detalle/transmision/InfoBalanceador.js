import React from "react";

// MUI
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

// SUBCOMPONENTES
import BoxInfo from "../BoxInfo";


const InfoBalanceador = ({ balanceador, concentrador }) => {

	let { servidor,  /* version, pid , git*/ } = concentrador;

	let infoBalanceador = null;
	if (!balanceador)
		infoBalanceador = <>
			<Chip color="warning" size="small" sx={{ fontWeight: 'bold' }} label="DIRECTO" />
			<Typography sx={{ ml: 1, fontWeight: 'bold' }} variant='subtitle1' component="span">⟶</Typography>
		</>
	else
		if (balanceador === 'no-aplica') {
			infoBalanceador = <>
				<Chip color="secondary" size="small" sx={{ fontWeight: 'bold' }} label="★" />
				<Typography sx={{ ml: 1, fontWeight: 'bold' }} variant='subtitle1' component="span">⟶</Typography>
			</>
		} else {
			infoBalanceador = <>
				<Chip color="primary" size="small" sx={{ fontWeight: 'bold' }} label={balanceador.toUpperCase()} />
				<Typography sx={{ ml: 1, fontWeight: 'bold' }} variant='subtitle1' component="span">⟶</Typography>
			</>
		}


	let infoConcentrador = <>
		<Chip color="primary" size="small" sx={{ ml: 1, fontWeight: 'bold' }} label={servidor.toUpperCase()} />
	</>

	return <BoxInfo titulo="Balanceo:">
		{infoBalanceador}
		{infoConcentrador}
	</BoxInfo>

}

export default React.memo(InfoBalanceador);
