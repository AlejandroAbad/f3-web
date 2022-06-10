import React from "react"


// MUI
import { Box, Typography, Paper } from "@mui/material"
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ClearIcon from '@mui/icons-material/Clear';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import SendIcon from '@mui/icons-material/Send';


import { format } from "date-fns";
import { es } from 'date-fns/locale'
import { useSelector } from "react-redux";
import { selectMaestroEstados } from "redux/maestros/maestrosSlice";
import { selectPedido } from "redux/consultas/pedidosSlice";


const determinarInfoNodo = (nodo, infoEstado) => {
	if (nodo.es.rechazo) return {
		color: infoEstado.color,
		primario: null,
		secundario: infoEstado.nombre,
		icono: <ClearIcon />
	}
	if (nodo.es.duplicado) return {
		color: infoEstado.color,
		primario: null,
		secundario: infoEstado.nombre,
		icono: <CopyAllIcon />
	}

	let info = {
		color: infoEstado.color,
		primario: 'Recibido pedido',
		secundario: infoEstado.nombre,
		icono: < SendIcon />
	}

	if (nodo.es.interna) {
		info.primario = 'Reenvío a SAP'
		info.icono = <LoopIcon />
		if (nodo.esPedidoDuplicadoSap) {
			info.icono = <CopyAllIcon />
			info.secundario = 'REPETIDO EN SAP'
		}
	}

	if (nodo.es.vigente && nodo.estado === 9900) {
		info.icono = <CheckIcon />
	}

	return info;

}

const NodoTimeline = ({ nodo }) => {

	let codigoEstado = nodo.estado;
	let maestroEstados  = useSelector(selectMaestroEstados);
	let infoEstado = maestroEstados.porId(codigoEstado);
	let fechaCreacionNodo = new Date(nodo.fechaCreacion);
	let valores = determinarInfoNodo(nodo, infoEstado);

	let iconoPrevio = null;

	if (nodo.es.vigente) {
		iconoPrevio = <Typography variant="body1" component="span" sx={{ color: 'common.black', mr: 1 }}>★</Typography>
	} else if (nodo.es.informado) {
		iconoPrevio = <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', color: 'error.main', mr: 1 }}>☄</Typography>
	}

	return <TimelineItem >
		<TimelineOppositeContent sx={{ my: 'auto', mx: 0, pl: 0 }} align="right" variant="body2" color="text.secondary" >
			{iconoPrevio}
			<Typography variant="body1" component="span">{format(fechaCreacionNodo, 'HH:mm:ss')}</Typography>
			<Typography variant="body2" component="span" >.{format(fechaCreacionNodo, 'SSS')}</Typography>
		</TimelineOppositeContent>

		<TimelineSeparator>
			<TimelineConnector />
			<TimelineDot sx={{ bgcolor: valores.color + '.main' }}>
				{valores.icono}
			</TimelineDot>
			<TimelineConnector />
		</TimelineSeparator>

		<TimelineContent sx={{ m: 'auto' }}>
			{valores.primario && <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
				{valores.primario}
			</Typography>}
			{valores.secundario && <Typography variant="body2">
				{valores.secundario}
			</Typography>}
		</TimelineContent>

	</TimelineItem>


}


const FechaTimeline = ({ fechaEntrada }) => {


	return <TimelineItem sx={{ minHeight: '40px' }} >

		<TimelineOppositeContent sx={{ m: 'auto' }} />

		<TimelineSeparator sx={{ m: 'auto', minWidth: '200px' }}>
			<Paper variant="outlined" sx={{ px: 2 }}>
				<Typography variant="h6" component="span" >
					{format(fechaEntrada, 'dd MMM yyyy', { locale: es })}
				</Typography>
			</Paper>
		</TimelineSeparator>

		<TimelineContent sx={{ m: 'auto' }} />

	</TimelineItem>


}


const PaperHistorialNodos = () => {

	let pedido  = useSelector(selectPedido);
	
	return <Box>
		<Paper elevation={10} sx={{ py: 1 }}>
			<Timeline>
				<FechaTimeline fechaEntrada={pedido.fechaEntrada} />
				{pedido.nodos.map(nodo => <NodoTimeline nodo={nodo} key={nodo.id} />)}
			</Timeline>
		</Paper>
	</Box>

}


export default React.memo(PaperHistorialNodos)