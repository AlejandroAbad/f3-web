import React from "react";

// MUI
import Typography from "@mui/material/Typography";


// REDUX
import { useSelector } from "react-redux";
import { selectPedido } from "redux/consultas/pedidosSlice";

// SUBCOMPONENTES
import BoxInfo from "../BoxInfo";

const InfoPedidoOrigen = () => {

	let pedido = useSelector(selectPedido);
	let { numeroPedidoOrigen } = pedido;

	if (!numeroPedidoOrigen) return null
	return <BoxInfo titulo="Pedido Origen:">
		<Typography component="div" variant="body1" sx={{ color: 'text.secondary' }} >{numeroPedidoOrigen}</Typography>
	</BoxInfo>
}


export default React.memo(InfoPedidoOrigen)