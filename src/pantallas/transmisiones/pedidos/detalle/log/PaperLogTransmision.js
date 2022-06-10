import React from "react"

import { Paper, Typography } from "@mui/material";


import { useDispatch, useSelector } from "react-redux";

// SUBCOMPONENTES
import LineaLogTransmision from "../log/LineaLogTransmision";
import { consultaLogTransmision } from "redux/consultas/transmisionesSlice";



const PaperLogTransmision = ({ idTransmision }) => {

	let dispatch = useDispatch();
	let logTransmision = useSelector(state => state.consultas.transmisiones.logTransmisionActual)


	React.useEffect(() => {
		if (idTransmision)
			dispatch(consultaLogTransmision({ idTransmision }))
	}, [idTransmision, dispatch])


	let cargando = logTransmision.estado === 'cargando';
	let error = logTransmision.estado === 'error';


	if (cargando) return "Obteniendo logs de la transmisión"
	if (error) return "Error obteniendo logs de la transmisión"
	if (!logTransmision.resultado?.length > 0) return "No hay logs"

	let primeraFecha = new Date(logTransmision.resultado[0].fecha);

	if (isNaN(primeraFecha)) primeraFecha = new Date();

	return <Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2 }} >
		<Typography variant='h5' component="h2" sx={{ mb: 2 }}>Log de transmisión</Typography>
		{logTransmision.resultado.map((lineaLog, i) => <LineaLogTransmision key={i} lineaLog={lineaLog} />)}
	</Paper>
}



export default React.memo(PaperLogTransmision);