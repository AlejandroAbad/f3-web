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

const RUTA_NODO = 'conexion.metadatos.autenticacion.usuarioNormalizado';


const normalizaNombreUsuario = (usuario, dominio) => {
	if (!usuario) return null;
	if (typeof usuario === 'number') return usuario;

	// Caso Hefame 00000000@hefame
	if (/^[0-9]{8}@hefame$/.test(usuario)) return parseInt(usuario.substr(3, 5));
	// Caso BorginoFarma BF0000000000
	if (/^BF[0-9]{10}}$/.test(usuario)) return parseInt(usuario.slice(-5));
	// Caso Transfer TR00000000, TG00000000, TP00000000
	if (/^T(R|G|P)[0-9]{8}$/.test(usuario)) return parseInt(usuario.slice(-8));
	// Es un entero
	if (/^[0-9]+$/.test(usuario)) {
		// Si es 602xxxxx, asumimos que es laboratorio
		if (usuario.startsWith('602')) return parseInt(usuario);
		return parseInt(usuario.slice(-5));
	}
	return usuario.toUpperCase?.() || usuario;
}

const OPCIONES_FIJAS = ['EMPLEADO', 'F+ONLINE', 'PORTAL_HEFAME'];

export const CodigoSolicitante = ({ refFiltro }) => {

	const nodo = refFiltro?.current?.[RUTA_NODO];

	let modoFiltroActual = MODOS[0].id;
	let solicitantesSeleccionados = [];

	if (nodo) {
		modoFiltroActual = obtenerModoDeFiltro(nodo, MODOS) || MODOS[0].id
		solicitantesSeleccionados = solicitantesSeleccionados.concat(Object.values(nodo)?.[0] || [])
	}


	const [solicitantes, _setSolicitantes] = useState(solicitantesSeleccionados);
	const [modoFiltro, _setModoFiltro] = useState(modoFiltroActual);

	useEffect(() => {
		if (solicitantes.length && modoFiltro) {
			refFiltro.current[RUTA_NODO] = {
				[modoFiltro]: solicitantes.map(solicitante => normalizaNombreUsuario(solicitante))
			};
		} else {
			delete refFiltro.current[RUTA_NODO];
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solicitantes, modoFiltro])


	return <BoxFiltro relleno={solicitantes?.length} modoFiltro={modoFiltro} >
		<Typography sx={{ mb: 2 }} component="div" variant="h6">
			Solicitante
			<ControlModoFiltro modo={modoFiltro} onChange={_setModoFiltro} listaModos={MODOS} />
		</Typography>

		<ControlTextoChip
			regexParticionado={/[\s\r\n\t,-.]+/}
			valor={solicitantes}
			onChange={_setSolicitantes}
			label="Solicitante"
			opciones={OPCIONES_FIJAS}
		/>
		<Typography variant="caption" sx={{ color: 'text.secondary' }}>¿Quién solicita el pedido? Un código de laboratorio, F+Online, un 101xxxxx@hefame, un BF02904xxxxx ... </Typography>

	</BoxFiltro>

}


export default CodigoSolicitante;