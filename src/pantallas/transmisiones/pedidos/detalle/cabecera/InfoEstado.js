import React from "react";

// MUI
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";

// REDUX
import { useSelector } from "react-redux";
import { selectPedido } from "redux/consultas/pedidosSlice";
import { selectMaestroEstados } from "redux/maestros/maestrosSlice";

// SUBCOMPONENTES
import BoxInfo from "../BoxInfo";


const InfoEstado = () => {

	let pedido = useSelector(selectPedido);
	let maestroEstados = useSelector(selectMaestroEstados);
	let codigoEstado = pedido.estado;

	if (!codigoEstado) return null;

	let eleEstado = <Chip
		sx={{ fontWeight: 'bold', px: 1 }}
		label={`ESTADO ${codigoEstado}`}
	/>

	if (maestroEstados.cargando) {
		eleEstado = <Chip
			sx={{ fontWeight: 'bold', px: 1 }}
			avatar={<CircularProgress size={14} color="secondary" />}
			label={`ESTADO ${codigoEstado}`}
		/>
	}

	if (maestroEstados.tieneDatos()) {
		let datosEstado = maestroEstados.porId(codigoEstado);
		if (datosEstado) {
			eleEstado = <Chip
				color={datosEstado.color}
				sx={{ fontWeight: 'bold', px: 1 }}
				label={datosEstado.nombre}
			/>
		}
	}

	return <BoxInfo titulo="Estado:">
		{eleEstado}
	</BoxInfo>

}

export default React.memo(InfoEstado);