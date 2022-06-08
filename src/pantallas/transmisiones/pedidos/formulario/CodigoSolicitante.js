import React from "react";

// MUI
import Typography from "@mui/material/Typography"
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import PauseCircleOutline from "@mui/icons-material/PauseCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

// SUBCOMPONENTES
import BoxFiltro from "./BoxFiltro";
import ControlModoFiltro, { obtenerModoDeFiltro } from "common/componentes/ControlModoFiltro";
import { ControlTextoChip } from "common/componentes/ControlTextoChip";


const MODOS = [
	{ id: '$in', texto: 'Incluye', color: 'primary', icono: <AddCircleOutline /> },
	{ id: '$nin', texto: 'NO incluye', color: 'error', icono: <RemoveCircleOutline /> },
	{ id: '', texto: 'Filtro desactivado', color: 'inherit', icono: <PauseCircleOutline /> }
]

const RUTA_NODO = 'conexion.metadatos.autenticacion.usuarioNormalizado';

/**
 * Para que esta función haga correctamente su trabajo, debe hacer el mismo trabajo
 * que la función Token.normalizaNombreUsuario(usuario, domino) del concentrador.
 */
const normalizaNombreSolicitante = (usuario, dominio) => {
	if (!usuario) return null;
	if (typeof usuario === 'number') return usuario;

	// Caso Hefame 12345678@hefame -> 45678
	if (/^[0-9]{8}@hefame$/.test(usuario)) return parseInt(usuario.substr(3, 5));
	// Caso BorginoFarma BF0123456789 -> 56789
	if (/^BF[0-9]{10}}$/.test(usuario)) return parseInt(usuario.slice(-5));
	// Caso Transfer TR12345678, TG12345678, TP12345678 -> 12345678
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


	const [solicitantes, _setSolicitantes] = React.useState(solicitantesSeleccionados);
	const [modoFiltro, _setModoFiltro] = React.useState(modoFiltroActual);

	React.useEffect(() => {
		if (solicitantes.length && modoFiltro) {
			refFiltro.current[RUTA_NODO] = {
				[modoFiltro]: solicitantes.map(solicitante => normalizaNombreSolicitante(solicitante))
			};
		} else {
			delete refFiltro.current[RUTA_NODO];
		}
		
	}, [solicitantes, modoFiltro, refFiltro])


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