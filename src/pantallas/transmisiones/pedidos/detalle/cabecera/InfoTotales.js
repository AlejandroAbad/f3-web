import React from "react";

// MUI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


// REDUX
import { useSelector } from "react-redux";
import { selectPedido } from "redux/consultas/pedidosSlice";

// SUBCOMPONENTES
import BoxInfo from "../BoxInfo";

const InfoTotales = () => {

	let pedido = useSelector(selectPedido);
	let totales = pedido.totales || {}

	return <BoxInfo titulo="Totales:">
		<Box>
			<Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>Unidades:</Typography>
			<Typography variant="subtitle2" component="span" color={totales.cantidad === totales.cantidadIncidencias ? 'error' : 'success'}>{totales.cantidad - totales.cantidadIncidencias} servida{totales.cantidad - totales.cantidadIncidencias === 1 ? '' : 's'}</Typography>
			{totales.cantidadIncidencias > 0 && <Typography variant="subtitle2" component="span" color={totales.cantidadIncidencias ? 'error' : 'success'}> + {totales.cantidadIncidencias} en falta</Typography>}
		</Box>

		<Box>
			<Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>Líneas:</Typography>
			<Typography variant="subtitle2" component="span" color={totales.lineas === totales.lineasIncidencias ? 'error' : 'success'}>{totales.lineas - totales.lineasIncidencias} servida{totales.lineas - totales.lineasIncidencias === 1 ? '' : 's'}</Typography>
			{totales.lineasIncidencias > 0 && <Typography variant="subtitle2" component="span" color={totales.lineasIncidencias ? 'error' : 'success'}> + {totales.lineasIncidencias} en falta</Typography>}
		</Box>

		{totales.cantidadEstupe > 0 && <Box>
			<Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>Estupes:</Typography>
			<Typography variant="subtitle2" component="span" >{totales.cantidadEstupe} unidad{totales.cantidadEstupe === 1 ? '' : 'es'} en {totales.lineasEstupe} línea{totales.lineasEstupe === 1 ? '' : 's'}</Typography>
		</Box>}


	</BoxInfo >
}


export default React.memo(InfoTotales);