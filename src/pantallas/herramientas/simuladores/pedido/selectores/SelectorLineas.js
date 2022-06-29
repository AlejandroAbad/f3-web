import React from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";


// SUBCOMPONENTES
import LineaPosicion from "./LineaPosicion";
import AddIcon from '@mui/icons-material/Add';

export default function SelectorLineas({ refFormulario }) {

	const [numeroLineas, setNumeroLineas] = React.useState(refFormulario.current.lineas?.length || 1);

	const agregarLinea = () => {
		refFormulario.current.lineas.push({ orden: refFormulario.current.lineas.length, cantidad: 1 })
		setNumeroLineas(refFormulario.current.lineas.length);
	}

	const eliminarLinea = (i) => {
		refFormulario.current.lineas = refFormulario.current.lineas.filter(l => l.orden !== i);
		refFormulario.current.lineas.forEach((l, i) => l.orden = i);
		setNumeroLineas(refFormulario.current.lineas.length);
	}

	let eleLineas = [];
	for (let i = 0; i < numeroLineas; i++) {
		eleLineas.push(<LineaPosicion key={i} numeroPosicion={i} refFormulario={refFormulario} fnEliminarLinea={() => eliminarLinea(i)} />)
	}

	return <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
		<Typography variant='h6' component="h2" sx={{ mb: 2 }}>Líneas del pedido</Typography>

		<Button
			variant="outlined"
			startIcon={<AddIcon />}
			sx={{ ml: 2, mb: 1, py: 1 }}
			onClick={agregarLinea}
		>
			Añadir línea
		</Button>

		<Stack>
			{eleLineas}
		</Stack>

	</Paper>
}