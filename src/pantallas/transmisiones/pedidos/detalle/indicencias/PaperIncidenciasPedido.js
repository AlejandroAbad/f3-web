import React from "react"

// MUI
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


// REDUX
import { useSelector } from "react-redux";
import { selectPedido } from "redux/consultas/pedidosSlice";

const PaperIncidenciasPedido = () => {

	let pedido = useSelector(selectPedido);
	let incidencias = pedido.incidenciasCliente;

	if (!incidencias || !incidencias.length) return null;

	let eleIncidencias = incidencias.map(incidencia => {
		let severity = 'info'
		if (incidencia.codigo.startsWith('PED-ERR') && incidencia.codigo !== 'PED-ERR-008') severity = 'error'
		if (incidencia.codigo.startsWith('PED-WARN')) severity = 'warning'

		return <Alert severity={severity} key={incidencia.codigo}>
			<strong>{incidencia.codigo}</strong>: {incidencia.descripcion}
		</Alert>
	});

	return <Box>
		<Paper elevation={10} sx={{ px: 4, py: 2 }}>
			<Typography variant='h5' component="h2" sx={{ mb: 2 }}>Incidencias en cabecera:</Typography>
			{eleIncidencias}
		</Paper>
	</Box>
}

export default React.memo(PaperIncidenciasPedido);