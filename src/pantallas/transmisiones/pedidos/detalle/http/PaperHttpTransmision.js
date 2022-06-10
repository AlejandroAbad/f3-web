import React from "react"

import { Grid, Paper, Typography } from "@mui/material";

import BoxTransmisionHttp from "./BoxTransmisionHttp";

import { useDispatch, useSelector } from "react-redux";
import { consultaTransmision } from "redux/consultas/transmisionesSlice";




const PaperHttpTransmision = ({ idTransmision }) => {

	let dispatch = useDispatch();
	let datosTransmision = useSelector(state => state.consultas.transmisiones.transmisionActual)


	React.useEffect(() => {
		if (idTransmision)
			dispatch(consultaTransmision({idTransmision}))
	}, [idTransmision, dispatch])


	let cargando = datosTransmision.estado === 'cargando';
	let error = datosTransmision.estado === 'error';
	
	if (cargando) return "Obteniendo datos de la transmisión"
	if (error) return "Error obteniendo datos de la transmisión"
	if (!datosTransmision.resultado) return "No hay datos de la conexión"

	let paperCliente = <Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2 }} >
		<Typography variant='h5' component="h2" sx={{ mb: 2 }}>Comunicación HTTP</Typography>
		<BoxTransmisionHttp {...{ ...datosTransmision.resultado.conexion }} />
	</Paper>

	let paperSap = null;
	if (datosTransmision.resultado.sap) {
		paperSap = <Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2 }} >
			<Typography variant='h5' component="h2" sx={{ mb: 2 }}>Comunicación SAP</Typography>
			<BoxTransmisionHttp {...{ ...datosTransmision.resultado.sap }} />
		</Paper>
	}

	return <Grid container spacing={2} >
		<Grid item xs={12}>{paperCliente}</Grid>
		<Grid item xs={12}>{paperSap}</Grid>
	</Grid>
}



export default React.memo(PaperHttpTransmision);