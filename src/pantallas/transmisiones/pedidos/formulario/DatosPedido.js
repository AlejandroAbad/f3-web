import {  useContext, useEffect, useState } from "react";
import { ControlTextoChip } from "common/componentes/ControlTextoChip";
import ControlModoFiltro, { obtenerModoDeFiltro } from "common/componentes/ControlModoFiltro";
import { AddCircleOutline, PauseCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import BoxFiltro from "./BoxFiltro";
import { Grid, Typography } from "@mui/material";
import { selectMaestroAlmacenes } from "redux/maestros/maestrosSlice";
import { useSelector } from "react-redux";


const MODOS = [
	{ id: '$in', texto: 'ES', color: 'primary', icono: <AddCircleOutline /> },
	{ id: '$nin', texto: 'NO ES', color: 'error', icono: <RemoveCircleOutline /> },
	{ id: '', texto: 'n/a', color: 'inherit', icono: <PauseCircleOutline /> }
]

/*
const FLAGS = [
	{ name: 'transfer', label: 'Transfers', textos: ['Mostrar solo pedidos transfer', 'No mostrar pedidos transfer', ''] },
	{ name: 'estupe', label: 'Estupefacientes', textos: ['Mostrar solo pedidos con estupefacientes', 'No mostrar pedidos con estupefacientes', ''] },
	{ name: 'nofaltas', label: 'Incidencias', textos: ['Mostrar solo pedidos en los que no se le devolvieron faltas a la farmacia', 'Mostrar solo pedidos en los que se le devolvieron faltas a la farmacia', ''] },
	{ name: 'cliBloq', label: 'Bloqueo pedidos', textos: ['Mostrar solo pedidos rechazados por bloqueo de pedidos', 'Mostrar solo pedidos que NO han sido rechazados por bloqueo de pedidos', ''] },
]
*/
/*
const FormControlLabelFlag = ({ flag }) => {

	let classes = useStyles();
	let [estado, setEstado] = useState(2);
	let cambiaEstado = useCallback(() => {
		setEstado((estado + 1) % 3);
	}, [setEstado, estado]);

	let color = 'initial';
	switch (estado) {
		case 0: color = 'primary'; break;
		case 1: color = 'secondary'; break;
		default: color = 'initial'; break;
	}


	let label = <>
		<Typography variant="button" color={color}>{flag.label}</Typography >
		<Typography variant="caption" className={classes.captionFlag}>{flag.textos[estado]}</Typography >
	</>

	return <FormControlLabel
		control={<Checkbox
			checked={estado !== 2}
			indeterminate={estado === 1}
			onChange={cambiaEstado}
			name={flag.name}
			color={color}
		/>}
		label={label}
	/>
}
*/

const RUTA_NODO_ALMACEN = 'pedido.codigoAlmacenServicio';
const RUTA_NODO_TIPO = 'pedido.tipoPedido';

export const DatosPedido = ({ refFiltro }) => {

	const maestroAlmacenes = useSelector(selectMaestroAlmacenes);
console.log(maestroAlmacenes);

	const nodoAlmacenes = refFiltro?.current?.[RUTA_NODO_ALMACEN];
	let modoFiltroActualAlmacenes = MODOS[0].id;
	let almacenesSeleccionados = [];
	if (nodoAlmacenes) {
		modoFiltroActualAlmacenes = obtenerModoDeFiltro(nodoAlmacenes, MODOS) || MODOS[0].id
		if (maestroAlmacenes.tieneDatos()) {
			almacenesSeleccionados = Object.values(nodoAlmacenes)?.[0]?.map?.(codAlmacen => {
				return maestroAlmacenes.porId(codAlmacen)?.nombre || codAlmacen;
			}) || [];
		}
	}
	const [seleccionAlmacen, setSeleccionAlmacen] = useState(almacenesSeleccionados);
	const [modoFiltroAlmacen, setModoFiltroAlmacen] = useState(modoFiltroActualAlmacenes);
	useEffect(() => {
		if (seleccionAlmacen.length && modoFiltroAlmacen) {
			refFiltro.current[RUTA_NODO_ALMACEN] = {
				[modoFiltroAlmacen]: seleccionAlmacen.map(almacen => {
					if (/^RG[0-9]$/i.test(almacen)) return almacen;
					return (maestroAlmacenes.porNombre(almacen))?.id
				})
			};
		} else {
			delete refFiltro.current[RUTA_NODO_ALMACEN];
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [seleccionAlmacen, modoFiltroAlmacen])



	const nodoTipos = refFiltro?.current?.[RUTA_NODO_TIPO];
	let modoFiltroActualTipo = MODOS[0].id;
	let tiposSeleccionadas = [];
	if (nodoTipos) {
		modoFiltroActualTipo = obtenerModoDeFiltro(nodoTipos, MODOS) || MODOS[0].id
		tiposSeleccionadas = tiposSeleccionadas.concat(Object.values(nodoTipos)?.[0] || [])
	}
	const [seleccionTipo, setSeleccionTipo] = useState(tiposSeleccionadas);
	const [modoFiltroTipo, setModoFiltroTipo] = useState(modoFiltroActualTipo);
	useEffect(() => {
		if (seleccionTipo.length && modoFiltroTipo) {
			refFiltro.current[RUTA_NODO_TIPO] = {
				[modoFiltroTipo]: seleccionTipo.map( tipo => parseInt(tipo))
			};
		} else {
			delete refFiltro.current[RUTA_NODO_TIPO];
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [seleccionTipo, modoFiltroTipo])


	return <BoxFiltro relleno={seleccionAlmacen?.length || seleccionTipo.length} modoFiltro="$in" >

		<Typography sx={{ mb: 2 }} component="div" variant="h6">
			Datos del pedido
		</Typography>

		<Grid container direction="row" justifyContent="space-even" alignItems="center">
			<Grid item md={2}>
				<Typography>Almacén</Typography>
			</Grid>
			<Grid item md={2} sx={{ mx: 2 }}>
				<ControlModoFiltro modo={modoFiltroAlmacen} onChange={setModoFiltroAlmacen} listaModos={MODOS} />
			</Grid>
			<Grid item xs={12} md={7}>
				<ControlTextoChip
					opcionesFijas
					opciones={maestroAlmacenes.getNombres()}
					valor={seleccionAlmacen}
					onChange={setSeleccionAlmacen}
					label="Almacén"
				/>
			</Grid>
		</Grid>

		<Grid container direction="row" justifyContent="space-even" alignItems="center" sx={{ mt: 2 }}>
			<Grid item md={2}>
				<Typography>Tipo pedido</Typography>
			</Grid>
			<Grid item md={2} sx={{ mx: 2 }}>
				<ControlModoFiltro modo={modoFiltroTipo} onChange={setModoFiltroTipo} listaModos={MODOS} />
			</Grid>
			<Grid item xs={12} md={7}>
				<ControlTextoChip
					regexValidacion={/^[0-9]+$/}
					regexParticionado={/[\s\r\n\t]+/}
					valor={seleccionTipo}
					onChange={setSeleccionTipo}
					label="Tipo de pedido"
				/>
			</Grid>
		</Grid>

		{/*
		<Typography variant="body2" display="block" >
			Características del pedido
		</Typography>

		
		<FormControl component="fieldset" className={classes.formControl}>
			<FormGroup>
				{FLAGS.map((flag, i) => <FormControlLabelFlag key={i} flag={flag} />)}
			</FormGroup>
		</FormControl>
		*/}

	</BoxFiltro>

}


export default DatosPedido;