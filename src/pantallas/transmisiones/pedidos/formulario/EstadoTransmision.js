import { useCallback, useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material"
import ControlModoFiltro, { obtenerModoDeFiltro } from "common/componentes/ControlModoFiltro";
import { AddCircleOutline, PauseCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import BoxFiltro from "./BoxFiltro";
import { selectMaestroEstados } from "redux/maestros/maestrosSlice";
import { useSelector } from "react-redux";


const MODOS = [
	{ id: '$in', texto: 'ES ALGUNO DE ', color: 'primary', icono: <AddCircleOutline /> },
	{ id: '$nin', texto: 'NO ES NINGUNO DE', color: 'error', icono: <RemoveCircleOutline /> },
	{ id: '', texto: 'FILTRO DESACTIVADO', color: 'inherit', icono: <PauseCircleOutline /> }
]

const RUTA_NODO = 'estado';

const BotonEstado = ({ estados, seleccionActual, setSeleccionActual, color, children }) => {

	const estaSeleccionado = useCallback(() => {
		let aparecenTodos = true;
		estados.forEach(estado => {
			aparecenTodos &= seleccionActual.includes(estado);
		})
		return aparecenTodos;
	}, [estados, seleccionActual])

	let [seleccionado, setSeleccionado] = useState(estaSeleccionado());

	const cambiarSeleccion = () => {
		if (seleccionado) {
			setSeleccionActual(v => {
				return v.filter(estado => !estados.includes(estado))
			})
		} else {
			setSeleccionActual(v => {
				return [...v, ...estados]
			})

		}
		setSeleccionado(!seleccionado);
	}

	let estilo = {}
	if (!seleccionado) {
		estilo = { bgcolor: color }
	}

	return <Button sx={estilo} variant={seleccionado ? "contained" : "outlined"} color={seleccionado ? color : undefined} onClick={cambiarSeleccion}	>
		{children}
	</Button >
}

export const EstadoTransmision = ({ refFiltro }) => {

	const maestroEstados = useSelector(selectMaestroEstados);
	let estadosRelevantes = maestroEstados.porAmbito('PEDIDO')


	const nodo = refFiltro?.current?.[RUTA_NODO];

	let modoFiltroActual = MODOS[0].id;
	let estadosSeleccionados = [];
	if (nodo) {
		modoFiltroActual = obtenerModoDeFiltro(nodo, MODOS) || MODOS[0].id
		estadosSeleccionados = Object.values(nodo)?.[0] || [];
		if (estadosSeleccionados.length === 0) {
			estadosRelevantes.forEach(estado => {
				estadosSeleccionados.push(estado);
			})
		}
	}

	const [seleccionActual, setSeleccionActual] = useState(estadosSeleccionados);
	const [modoFiltro, setModoFiltro] = useState(modoFiltroActual);
	useEffect(() => {
		if (seleccionActual.length && modoFiltro) {
			refFiltro.current[RUTA_NODO] = {
				[modoFiltro]: seleccionActual
			};
		} else {
			delete refFiltro.current[RUTA_NODO];
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [seleccionActual, modoFiltro])


	let gruposEstados = {};
	let botonesEstado = [];
	estadosRelevantes.forEach(estado => {
		if (!gruposEstados[estado.grupo]) gruposEstados[estado.grupo] = [];
		gruposEstados[estado.grupo].push(estado);
	})

	let propiedadesBotones = { seleccionActual, setSeleccionActual };
	for (let grupo in gruposEstados) {
		let color = gruposEstados[grupo][0].color;
		let codigosDeEstado = gruposEstados[grupo].map(e => e.id);
		botonesEstado.push(<BotonEstado key={grupo} estados={codigosDeEstado} {...propiedadesBotones} color={color}>{grupo}</BotonEstado>)
	}

	return <BoxFiltro relleno={seleccionActual?.length} modoFiltro={modoFiltro} >
		<Typography sx={{ mb: 2 }} component="div" variant="h6">
			Estado del pedido
			<ControlModoFiltro modo={modoFiltro} onChange={setModoFiltro} listaModos={MODOS} />
		</Typography>
		<Stack direction="row" justifyContent="space-around" alignItems="center" spacing={1}>
			{botonesEstado}
		</Stack>
	</BoxFiltro>

}

export default EstadoTransmision;