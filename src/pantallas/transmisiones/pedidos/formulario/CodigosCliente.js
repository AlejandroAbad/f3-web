import { useEffect, useState } from "react";
import { Typography } from "@mui/material"
import { ControlTextoChip } from "common/componentes/ControlTextoChip";
import { ControlModoFiltro, obtenerModoDeFiltro } from "common/componentes/ControlModoFiltro";
import { AddCircleOutline, PauseCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import BoxFiltro from "./BoxFiltro";




const MODOS = [
	{ id: '$in', texto: 'Incluye', color: 'primary', icono: <AddCircleOutline /> },
	{ id: '$nin', texto: 'NO incluye', color: 'error', icono: <RemoveCircleOutline /> },
	{ id: '', texto: 'Filtro desactivado', color: 'inherit', icono: <PauseCircleOutline /> }
]


export const CodigoCliente = ({ refFiltro }) => {

	const nodoCodigoCliente = refFiltro?.current?.['pedido.codigoCliente'];
	const nodoPuntoEntrega = refFiltro?.current?.['pedido.puntoEntrega'];
	let modoFiltroActual = MODOS[0].id;
	let clientesSeleccionados = [];
	if (nodoCodigoCliente) {
		modoFiltroActual = obtenerModoDeFiltro(nodoCodigoCliente) || MODOS[0].id
		clientesSeleccionados = clientesSeleccionados.concat(Object.values(nodoCodigoCliente)?.[0] || [])
	}
	if (nodoPuntoEntrega) {
		modoFiltroActual = obtenerModoDeFiltro(nodoPuntoEntrega) || MODOS[0].id
		clientesSeleccionados = clientesSeleccionados.concat(Object.values(nodoPuntoEntrega)?.[0] || [])
	}


	const [clientes, _setClientes] = useState(clientesSeleccionados);
	const [modoFiltro, _setModoFiltro] = useState(modoFiltroActual);

	const cambiaModoFiltro = (nuevoModo) => {
		_setModoFiltro(nuevoModo)
	}

	const cambiaCliente = (nuevosClientes) => {
		_setClientes(nuevosClientes);
	}

	useEffect(() => {
		if (clientes.length && modoFiltro) {

			refFiltro.current['pedido.codigoCliente'] = { [modoFiltro]: [] };
			refFiltro.current['pedido.puntoEntrega'] = { [modoFiltro]: [] };
			clientes.forEach(cliente => {

				if (/^PT[0-9]{10}/.test(cliente)) { // Punto de entrega
					refFiltro.current['pedido.puntoEntrega'][modoFiltro].push(cliente);
				} else { // Cliente "integer"
					let clienteNumerico = parseInt(cliente?.substr?.(-5) || cliente);
					if (clienteNumerico)
						refFiltro.current['pedido.codigoCliente'][modoFiltro].push(clienteNumerico);
				}
			})

			if (refFiltro.current['pedido.codigoCliente'][modoFiltro].length === 0) delete refFiltro.current['pedido.codigoCliente'];
			if (refFiltro.current['pedido.puntoEntrega'][modoFiltro].length === 0) delete refFiltro.current['pedido.puntoEntrega'];

		} else {
			delete refFiltro.current['pedido.codigoCliente'];
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clientes, modoFiltro])


	return <BoxFiltro relleno={clientes?.length} modoFiltro={modoFiltro} >

		<Typography sx={{ mb: 2 }} component="div" variant="h6">
			Código de cliente
			<ControlModoFiltro modo={modoFiltro} onChange={cambiaModoFiltro} listaModos={MODOS} />
		</Typography>

		<ControlTextoChip
			regexValidacion={/^[0-9]{1,10}$|^PT[0-9]{10}$/i}
			regexParticionado={/[\s\r\n\t,-.]+/}
			valor={clientes}
			onChange={cambiaCliente}
			label="Códigos de cliente"
		/>

	</BoxFiltro>

}


export default CodigoCliente;