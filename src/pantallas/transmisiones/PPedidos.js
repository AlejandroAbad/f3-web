import React from "react";
import useNavegacion from "hooks/useNavegacion";
import { convertirErrorLlamadaFedicom } from "common/FediCommons";

// MUI
import Alert from "@mui/material/Alert";
import AppBar from "@mui/material/AppBar";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// MUI-ICONS
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// REDUX
import { usePantalla } from "redux/pantalla/pantallaSlice";
import { abortarPeticion, listarPedidos } from "redux/consultas/pedidosSlice";
import { useSelector, useDispatch } from "react-redux";

// SUBCOMPONENTES
import ControlNavegacionPedidos from "./pedidos/ControlNavegacionPedidos";
import ResumenFiltrosActivos from "./pedidos/ResumenFiltrosActivos";
import LineaNavegadorPedido from "./pedidos/listado/LineaNavegadorPedido";
import ContenedorDetallePedido from "./pedidos/detalle/ContenedorDetallePedido";
import { Button } from "@mui/material";



function PantallaPedidos() {

	const dispatch = useDispatch();
	let [idPedido, setIdPedido] = useNavegacion('/transmisiones/pedidos', 3);
	usePantalla(idPedido ? 'Pedido ' + idPedido : 'Pedidos', 'pedidos');

	let { resultado, estado, mensajes } = useSelector(state => state.consultas.pedidos);

	let estaCargando = estado === 'cargando';
	let estaError = estado === 'error';

	React.useEffect(() => {
		if (estado === 'inicial' && !idPedido) dispatch(listarPedidos())
	}, [estado, idPedido, dispatch])

	let contenido = null;
	let eleResumenFiltros = <ResumenFiltrosActivos />
	let eleControlNavegacionVacio = <ControlNavegacionPedidos />;
	if (estaCargando) {
		contenido = <Box>
			{eleControlNavegacionVacio}
			{eleResumenFiltros}
			<Paper elevation={3} sx={{ mt: 4, py: 4, px: 4, textAlign: 'center' }}>
				<CircularProgress />
				<Typography component="div" variant="h6">Buscando pedidos</Typography>
				<Button onClick={() => dispatch(abortarPeticion())}>Cancelar consulta</Button>
			</Paper>
		</Box>
	} else if (estaError) {
		contenido = <Box>
			{eleControlNavegacionVacio}
			{eleResumenFiltros}
			<Paper elevation={3} >
				<Alert severity='error' sx={{ mt: 4, py: 2, px: 4 }}>
					{convertirErrorLlamadaFedicom(mensajes)}
				</Alert>
			</Paper >
		</Box>
	} else if (!resultado?.resultados?.length) {
		contenido = <Box>
			{eleControlNavegacionVacio}
			{eleResumenFiltros}
			<Paper elevation={3} >
				<Alert severity='info' sx={{ mt: 4, py: 2, px: 4 }}>
					No se han encontrado pedidos
				</Alert>
			</Paper >
		</Box>
	} else {
		contenido = <Box>
			<ControlNavegacionPedidos />
			<Box sx={{ position: 'sticky', top: '190px' }}>
				{eleResumenFiltros}
				<List sx={{ mt: 2 }} >
					<LineaNavegadorPedido cabecera />
					{resultado.resultados.map(pedido => <LineaNavegadorPedido key={pedido._id} pedido={pedido} />)}
				</List>
			</Box>

		</Box>
	}

	return (<>
		<Container fixed maxWidth="xl" >
			{contenido}
		</Container>
		<Dialog
			fullScreen
			scroll='body'
			open={Boolean(idPedido)}
			onClose={(e) => setIdPedido(null, e)}
		>
			<AppBar sx={{ position: 'fixed' }}>
				<Toolbar>
					<IconButton edge="start" color="inherit" onClick={(e) => setIdPedido(null, e)} >
						<ArrowBackIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						Pedido {idPedido?.toUpperCase()}
					</Typography>
				</Toolbar>
			</AppBar>
			<Box sx={{ mt: 12 }}>
				<ContenedorDetallePedido idPedido={idPedido} />
			</Box>
		</Dialog>
	</>)
}

export default React.memo(PantallaPedidos);