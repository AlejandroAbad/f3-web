// MUI
import {  Button, Card, CardContent, Chip, CircularProgress, Paper, Typography } from "@mui/material";
import { format } from "date-fns";
import { cloneDeep } from "lodash";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { crearPedido } from "redux/herramientas/simuladorPedidosSlice";


const ResultadoEnvio = ({ envio }) => {

	let pedidoRecibido = !Array.isArray(envio.respuesta);

	if (pedidoRecibido) {

		let lineasConIncidencias = envio.respuesta.lineas.filter(linea => Boolean(linea.incidencias?.length)).length;

		return <>
			<Card elevation={3} sx={{ px: 2, pt: 1, mt: 2 }}>
				<CardContent>
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						{format(new Date(envio.fecha), 'hh:MM:ss')} • <Chip size="small" color="success" label="Entregado" />
					</Typography>
					<Typography variant="h6" component="div">
						{envio.respuesta.codigoCliente}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						{envio.respuesta.numeroPedido}
					</Typography>
					<Typography variant="body2">
						{
							envio.respuesta.incidencias?.length &&
							envio.respuesta.incidencias.map((incidencia, i) => <Typography color="warning.main" key={i}>• {incidencia.descripcion}</Typography>)
						}
						{envio.respuesta.lineas.length} línea{envio.respuesta.lineas.length !== 1 && 's'}{lineasConIncidencias && `, ${lineasConIncidencias} con incidencia`}
					</Typography>
				</CardContent>
			</Card>
		</>
	} else {
		return <>
			<Card elevation={3} sx={{ px: 2, pt: 1, mt: 2 }}>
				<CardContent>
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						{format(new Date(envio.fecha), 'hh:MM:ss')} • <Chip size="small" color="error" label="Error" />
					</Typography>
					<Typography variant="h6" component="div">
						{envio.consulta.pedido.codigoCliente}
					</Typography>
					<Typography variant="body2" sx={{mt:1}}>
						{
							envio.respuesta.map((incidencia, i) => <Typography color="error.main" key={i}>• {incidencia.descripcion}</Typography>)
						}
					</Typography>
				</CardContent>
			</Card>
		</>
	}


}


export default function PanelEnvio({ refFormulario }) {

	const dispatch = useDispatch();
	const enviosRealizados = useSelector(state => state.herramientas.simuladorPedidos.envios)
	const estadoEnvio = useSelector(state => state.herramientas.simuladorPedidos.estado)

	const envioEnCurso = estadoEnvio === 'cargando';

	const realizarEnvio = () => {

		
		let { usuario, dominio, ...pedido } = cloneDeep(refFormulario.current);

		if (pedido.numeroPedidoOrigen === false)
			pedido.numeroPedidoOrigen = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

		dispatch(crearPedido({ usuario, dominio, pedido }));
	}

	return <>
		<Paper elevation={3} sx={{ p: 3 }}>
			<Button variant="contained" fullWidth size="large" onClick={realizarEnvio} enabled={envioEnCurso}>Enviar cohete</Button>
		</Paper>

		{envioEnCurso && 
			<Card elevation={3} sx={{ px: 2, pt: 1, mt: 2 }}>
				<CardContent>
					<CircularProgress />
				</CardContent>
			</Card>
		}

		{
			enviosRealizados.map((envio, i) => <ResultadoEnvio key={i} envio={envio} />)
		}

	</>

}