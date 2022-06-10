import React from "react";

// MUI
import Typography from "@mui/material/Typography";

// REDUX
import { useSelector } from "react-redux";
import { selectPedido } from "redux/consultas/pedidosSlice";

// SUBCOMPONENTES
import BoxInfo from "../BoxInfo";

const InfoCrc = () => {

	let pedido = useSelector(selectPedido);

	let { crc, crcSap } = pedido;

	if (!crc) return null;
	return <BoxInfo titulo="Crc:">
		<Typography component="div" variant="body1" sx={{ fontWeight: 'bold', fontSize: 22 }}>
			{crcSap.toUpperCase()}
		</Typography>
		<Typography component="div" variant="subtitle2" sx={{ color: 'text.secondary' }}>
			{crc.toUpperCase()}
		</Typography>
	</BoxInfo>
}


export default React.memo(InfoCrc)