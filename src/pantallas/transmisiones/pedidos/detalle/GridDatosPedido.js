import React from "react"

// MUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from "@mui/material/CircularProgress";

// REDUX
import { useSelector } from "react-redux";
import { selectPedido } from "redux/consultas/pedidosSlice";

// SUBCOMPONENTES
import PaperCabeceraPedido from "./cabecera/PaperCabeceraPedido";
import PaperFlagsPedido from "./flags/PaperFlagsPedido";
import PaperIncidenciasPedido from "./indicencias/PaperIncidenciasPedido";
import PaperLineasPedido from "./lineas/PaperLineasPedido";
import PaperDatosTransmision from "./transmision/PaperDatosTransmision";
import PaperSeleccionNodo from "./nodos/PaperSeleccionNodo";
import PaperHistorialNodos from "./nodos/PaperHistorialNodos";
import PaperHttpTransmision from "./http/PaperHttpTransmision";
import PaperLogTransmision from "./log/PaperLogTransmision";




const GridDatosPedido = () => {

	const pedido = useSelector(selectPedido);
	const [idNodoSeleccionado, setIdNodoSeleccionado] = React.useState(0);

	React.useEffect(() => {
		if (pedido)
			setIdNodoSeleccionado(pedido.nodos.find(n => n.es.vigente)?.id);
	}, [pedido]);


	if (!pedido) {
		return <Paper elevation={3} sx={{ mt: 4, py: 4, px: 4, textAlign: 'center' }}>
			<CircularProgress />
			<Typography component="div" variant="h6">Buscando pedidos</Typography>
		</Paper>
	}


	return (<>
		<Grid container spacing={2} sx={{ mb: 5 }}>
			<Grid item xs={8} xl={9}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<PaperCabeceraPedido />
					</Grid>
					<Grid item xs={12}>
						<PaperFlagsPedido />
						<PaperIncidenciasPedido />
					</Grid>
					<Grid item xs={12}>
						<PaperLineasPedido />
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={4} xl={3} >
				<Grid container spacing={2}>
					<Grid item xs={12} >
						<PaperDatosTransmision />
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={12} sx={{ mt: 4 }}>
				<Typography variant="h4" component="h6" gutterBottom>Datos de transmisión</Typography>
			</Grid>

			<Grid item xs={8}>
				<PaperSeleccionNodo {...{ idNodoSeleccionado, setIdNodoSeleccionado }} />
			</Grid>

			<Grid item xs={4} >
				<PaperHistorialNodos />
			</Grid>

			<Grid item xs={12}>
				<PaperHttpTransmision idTransmision={idNodoSeleccionado} />
			</Grid>
			<Grid item xs={12}>
				<PaperLogTransmision idTransmision={idNodoSeleccionado} />
			</Grid>
		</Grid>
	</>
	)



}


export default React.memo(GridDatosPedido)