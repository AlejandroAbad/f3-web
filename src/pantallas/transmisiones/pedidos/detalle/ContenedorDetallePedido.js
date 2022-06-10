import React from "react";
import { convertirErrorLlamadaFedicom } from "common/FediCommons";

// MUI
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { consultaPedido } from "redux/consultas/pedidosSlice";

// SUBCOMPONENTES
import GridDatosPedido from "./GridDatosPedido";



export default function ContenedorDetallePedido({ idPedido }) {

	let dispatch = useDispatch();
	let pedidoActual = useSelector(state => state.consultas.pedidos.pedidoActual);

	React.useEffect(() => {
		if (idPedido) {
			dispatch(consultaPedido({idPedido}))
		}
	}, [idPedido, dispatch])

	let contenido = null;

	if (pedidoActual.estado === 'error') {
		contenido = <Box>
			<Paper elevation={3} >
				<Alert severity='error' sx={{ mt: 4, py: 2, px: 4 }}>
					{convertirErrorLlamadaFedicom(pedidoActual.mensajes)}
				</Alert>
			</Paper >
		</Box>
	} else if (pedidoActual.estado === 'cargando') {
		contenido = <div>Cargando datos del pedido ...</div>
	} else {
		contenido = <GridDatosPedido />
	}


	return (
		<Container fixed maxWidth="xl">
			{contenido}
		</Container>
	)

}