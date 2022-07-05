import React from "react";
import { Box, Checkbox, InputAdornment, Paper, TextField, Typography } from "@mui/material";


export default function SelectorDatosCabecera({ refFormulario }) {

	// Solo guardo estado del codigo cliente, porque el resto de campos por defecto los
	// dejaremos aparecer en blanco.
	let codigoClientePorDefecto = refFormulario.current.codigoCliente;
	const [codigoCliente, _setCodigoCliente] = React.useState(codigoClientePorDefecto);



	const [npoAleatorio, _setNpoAleatorio] = React.useState(true);
	const refNumeroPedidoOrigen = React.useRef();
	const setNpoAleatorio = (aleatorio) => {
		_setNpoAleatorio(aleatorio);
		if (aleatorio) {
			refNumeroPedidoOrigen.current.oldValue = refNumeroPedidoOrigen.current.value;
			refNumeroPedidoOrigen.current.value = '(Aleatorio)';
			setNumeroPedidoOrigen(false);
		} else {
			refNumeroPedidoOrigen.current.value = refNumeroPedidoOrigen.current.oldValue || '';
			setNumeroPedidoOrigen(refNumeroPedidoOrigen.current.value);
		}
	}
	React.useEffect(() => setNpoAleatorio(true), []);

	const setCodigoCliente = (cliente) => {
		refFormulario.current.codigoCliente = cliente;
		_setCodigoCliente(cliente);
	}

	const setNumeroPedidoOrigen = (numeroPedidoOrigen) => {
		refFormulario.current.numeroPedidoOrigen = numeroPedidoOrigen;
	}

	const setTipoPedido = (tipoPedido) => {
		refFormulario.current.tipoPedido = tipoPedido;
	}

	const setAlmacen = (almacen) => {
		refFormulario.current.codigoAlmacenServicio = almacen;
	}







	return <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
		<Typography variant='h6' component="h2" sx={{ mb: 2 }}>Cabecera del pedido</Typography>
		<Box>
			<TextField
				sx={{ width: '20ch' }}
				label="Código del cliente"
				variant="outlined"
				value={codigoCliente}
				onChange={e => setCodigoCliente(e.target.value)}
			/>

			<TextField
				sx={{ ml: 2 }}
				label="Número de pedido en origen"
				variant="outlined"
				onChange={e => setNumeroPedidoOrigen(e.target.value)}
				inputRef={refNumeroPedidoOrigen}
				disabled={npoAleatorio}
				InputProps={{
					sx: { fontStyle: npoAleatorio ? 'italic' : '' },
					startAdornment: <InputAdornment position="start" sx={{ ml: -1 }}>
						<Checkbox checked={npoAleatorio} onChange={e => setNpoAleatorio(e.target.checked)} />
					</InputAdornment>
				}}
			/>

			<TextField
				sx={{ ml: 2, width: '16ch', alignContent: "center" }}
				label="Tipo de pedido"
				variant="outlined"
				onChange={e => setTipoPedido(e.target.value)}
			/>

			<TextField
				sx={{ ml: 2, width: '16ch', alignContent: "center" }}
				label="Almacén"
				variant="outlined"
				onChange={e => setAlmacen(e.target.value)}
			/>

		</Box>

	</Paper>
}