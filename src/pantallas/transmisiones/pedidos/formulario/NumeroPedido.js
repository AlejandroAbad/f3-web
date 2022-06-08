import React from "react";
import { ObjectId } from "bson";

// MUI
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Typography from "@mui/material/Typography"

// MUI-ICONS
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

// SUBCOMPONENTES
import BoxFiltro from "./BoxFiltro";
import { ControlTextoChip } from "common/componentes/ControlTextoChip";
import ControlModoFiltro, { obtenerModoDeFiltro } from "common/componentes/ControlModoFiltro";


const MODOS = [
	{ id: '$in', texto: 'Incluye', color: 'primary', icono: <AddCircleOutlineIcon /> },
	{ id: '$nin', texto: 'NO incluye', color: 'error', icono: <RemoveCircleOutlineIcon /> },
	{ id: '', texto: 'Filtro desactivado', color: 'inherit', icono: <PauseCircleOutlineIcon /> }
]

const TIPOS = {
	crc: { label: "CRC", regexValidacion: /^[0-9a-f]{8}$/i, nodo: 'pedido.crcSap' },
	numeroPedido: { label: "Pedido Fedicom", regexValidacion: /^[0-9a-f]{24}$/i, nodo: 'pedido.crc' },
	numeroPedidoSap: { label: "Pedido SAP", regexValidacion: /^[0-9]{10}$/i, nodo: 'pedido.pedidosAsociadosSap' },
	numeroPedidoOrigen: { label: "Pedido Origen", regexValidacion: /^.+$/, regexParticionado: /[\s\r\n\t]+/, nodo: 'pedido.numeroPedidoOrigen' }
}


const sanearNumero = (numero, tipoNumero) => {
	switch (tipoNumero) {
		case 'numeroPedidoSap':
			return parseInt(numero);
		case 'crc':
			return parseInt(numero, 16);
		case 'numeroPedido':
			return new ObjectId(numero);
		case 'numeroPedidoOrigen':
			return numero.toString();
		default:
			return numero;
	}
}

const invertirSanearNumero = (numero, tipoNumero) => {

	switch (tipoNumero) {
		case 'crc':
			return numero.toString(16).toUpperCase();
		case 'numeroPedido':
			return numero.toHexString().toUpperCase();
		case 'numeroPedidoOrigen':
			return numero;
		case 'numeroPedidoSap':
			return numero.toString();
		default:
			return numero?.toUpperCase?.() || numero;
	}
}


export const NumeroPedido = ({ refFiltro }) => {


	let modoFiltroActual = MODOS[0].id;
	let tipoNumeroSeleccionado = 'crc';
	let numerosSeleccionados = [];

	for (let tipo in TIPOS) {
		let nodo = TIPOS[tipo].nodo;

		if (refFiltro.current[nodo]) {
			nodo = refFiltro.current[nodo];
			tipoNumeroSeleccionado = tipo;
			modoFiltroActual = obtenerModoDeFiltro(nodo, MODOS) || MODOS[0].id
			numerosSeleccionados = nodo[modoFiltroActual]?.map?.(numero => invertirSanearNumero(numero, tipo))
		}
	}


	const [seleccionActual, setSeleccionActual] = React.useState(numerosSeleccionados);
	const [tipoNumeroPedido, setTipoNumeroPedido] = React.useState(tipoNumeroSeleccionado);
	const [modoFiltro, setModoFiltro] = React.useState(modoFiltroActual);
	React.useEffect(() => {

		for (let tipoNumero in TIPOS) {
			delete refFiltro.current[TIPOS[tipoNumero].nodo]
		}

		let datosTipoNumero = TIPOS[tipoNumeroPedido];
		if (seleccionActual.length && modoFiltro) {
			refFiltro.current[datosTipoNumero.nodo] = {
				[modoFiltro]: seleccionActual.map(numero => {
					if (datosTipoNumero.regexValidacion.test(numero)) {
						return sanearNumero(numero, tipoNumeroPedido)
					}
					return false;
				}).filter(numero => numero !== false)
			};
		}
	}, [seleccionActual, modoFiltro, tipoNumeroPedido, refFiltro])


	return <BoxFiltro relleno={seleccionActual?.length} modoFiltro={modoFiltro} >

		<Typography sx={{ mb: 2 }} component="div" variant="h6">
			Número de pedido
			<ControlModoFiltro modo={modoFiltro} onChange={setModoFiltro} listaModos={MODOS} />
		</Typography>

		<Grid container spacing={1}>
			<Grid item xs={12} sm={6} md={3} lg={2} xl={4}>
				<FormControl variant="outlined" fullWidth >
					<InputLabel>Tipo de código</InputLabel>
					<Select label="Tipo de código" value={tipoNumeroPedido} onChange={e => setTipoNumeroPedido(e.target.value)} >
						{
							Object.keys(TIPOS).map(k => {
								return <MenuItem value={k} key={k}>{TIPOS[k].label}</MenuItem>
							})
						}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} md={9} lg={10} xl={12}>
				<ControlTextoChip
					regexValidacion={TIPOS[tipoNumeroPedido].regexValidacion}
					regexParticionado={TIPOS[tipoNumeroPedido].regexParticionado || /[\s\r\n\t,-.]+/}
					eliminarDuplicados
					valor={seleccionActual}
					onChange={setSeleccionActual}
					label={TIPOS[tipoNumeroPedido].label}
					placeholder=""
				/>
			</Grid>
		</Grid>


	</BoxFiltro>


}


export default NumeroPedido;