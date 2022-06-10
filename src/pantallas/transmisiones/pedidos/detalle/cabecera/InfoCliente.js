import React from "react";

// MUI
import Typography from "@mui/material/Typography";

// REDUX
import { useSelector } from "react-redux";
import { selectPedido } from "redux/consultas/pedidosSlice";

// SUBCOMPONENTES
import BoxInfo from "../BoxInfo";


const InfoCliente = () => {

	let pedido = useSelector(selectPedido);
	
	return <BoxInfo titulo="Datos del cliente:">
		<Typography component="span" sx={{ fontWeight: 'bold', fontSize: '22px' }}>{pedido.codigoCliente}</Typography>
		{pedido.clienteSap && 
			<Typography component="span" variant='subtitle2'> » {pedido.clienteSap}</Typography>
		}

		{pedido.puntoEntrega && <Typography component="div" variant='caption'>@ {pedido.puntoEntrega}</Typography> }
		
	</BoxInfo>
}

export default React.memo(InfoCliente);
