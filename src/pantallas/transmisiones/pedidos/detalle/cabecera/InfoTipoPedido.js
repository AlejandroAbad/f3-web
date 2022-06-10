import React from "react";

// MUI
import Typography from "@mui/material/Typography";


// REDUX
import { useSelector } from "react-redux";
import { selectPedido } from "redux/consultas/pedidosSlice";

// SUBCOMPONENTES
import BoxInfo from "../BoxInfo";

const InfoTipoPedido = () => {

	let pedido = useSelector(selectPedido);
	let { tipoPedido/*, tipoPedidoSap, motivoPedidoSap*/ } = pedido;

	return <BoxInfo titulo="Tipo de pedido:">
		<Typography component="div" variant="body1" sx={{ fontWeight: 'bold', fontSize: 22 }}>
			{tipoPedido ?? 0}
		</Typography>
	</BoxInfo>
}

export default React.memo(InfoTipoPedido)