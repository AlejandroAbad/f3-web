import React from "react";

import { IconButton, Paper, TextField, Typography } from "@mui/material";

// MUI-ICON
import DeleteIcon from '@mui/icons-material/Delete';




export default function LineaPosicion({ numeroPosicion, refFormulario, fnEliminarLinea }) {

	let misDatos = refFormulario.current.lineas?.find(l => l.orden === numeroPosicion)

	// Estado interno de la linea
	let [cantidad, _setCantidad] = React.useState(misDatos?.cantidad || 1);
	if (misDatos?.cantidad !== cantidad) _setCantidad(misDatos.cantidad);

	let [codigoArticulo, _setCodigoArticulo] = React.useState(misDatos?.codigoArticulo)
	if (misDatos?.codigoArticulo !== codigoArticulo) _setCodigoArticulo(misDatos.codigoArticulo);

	let [valeEstupefaciente, _setValeEstupefaciente] = React.useState(misDatos?.valeEstupefaciente)
	if (misDatos?.valeEstupefaciente !== valeEstupefaciente) _setValeEstupefaciente(misDatos.valeEstupefaciente);
	//

	if (!misDatos) return <Paper>Sin datos para la línea {numeroPosicion}</Paper>;

	const setCantidad = (e) => {
		let cantidad = parseInt(e.target.value) || 1;
		misDatos.cantidad = cantidad;
		_setCantidad(cantidad)
	}

	const setCodigoArticulo = (e) => {
		misDatos.codigoArticulo = e.target.value;
		_setCodigoArticulo(e.target.value)
	}

	const setValeEstupefaciente = (e) => {
		misDatos.valeEstupefaciente = e.target.value;
		_setValeEstupefaciente(e.target.value)
	}

	return <Paper square elevation={0} sx={{ py: 1.2, px: 3, my: -0.8 }}>
		<Typography
			variant="h6"
			sx={{ lineHeight: 2, display: 'inline' }}>
			{misDatos?.orden + 1}
		</Typography>
		<TextField
			size="small"
			sx={{ ml: 3, width: '12ch' }}
			type="number"
			label="Cantidad"
			variant="outlined"
			value={cantidad}
			onChange={setCantidad}
		/>
		<TextField
			size="small"
			sx={{ ml: 2, width: '20ch' }}
			label="Código de artículo"
			variant="outlined"
			value={codigoArticulo || ''}
			onChange={setCodigoArticulo}
		/>
		<TextField
			size="small"
			sx={{ ml: 2, width: '20ch' }}
			label="Vale de estupe"
			variant="outlined"
			value={valeEstupefaciente || ''}
			onChange={setValeEstupefaciente}
		/>
		{numeroPosicion > 0 && <IconButton sx={{ ml: 1 }} onClick={fnEliminarLinea}>
			<DeleteIcon />
		</IconButton>}
	</Paper>
}