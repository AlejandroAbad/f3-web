import { useContext, useEffect, useState } from "react";
import { ControlTextoChip } from "common/componentes/ControlTextoChip";
import { ControlModoFiltro, obtenerModoDeFiltro } from "common/componentes/ControlModoFiltro";
import { AddCircleOutline, PauseCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import BoxFiltro from "./BoxFiltro";
import { Grid, Typography } from "@mui/material";
import ContextoMaestros from "contexto/contextoMaestros";


const MODOS = [
	{ id: '$in', texto: 'ES', color: 'primary', icono: <AddCircleOutline /> },
	{ id: '$nin', texto: 'NO ES', color: 'error', icono: <RemoveCircleOutline /> },
	{ id: '', texto: 'n/a', color: 'inherit', icono: <PauseCircleOutline /> }
]



const RUTA_NODO_IP = 'conexion.metadatos.ip';
const RUTA_NODO_PROGRAMA = 'conexion.metadatos.programa';



export const OrigenPedido = ({ refFiltro }) => {

	const nodoIps = refFiltro?.current?.[RUTA_NODO_IP];
	let modoFiltroActualIp = MODOS[0].id;
	let ipsSeleccionadas = [];
	if (nodoIps) {
		modoFiltroActualIp = obtenerModoDeFiltro(nodoIps, MODOS) || MODOS[0].id
		ipsSeleccionadas = ipsSeleccionadas.concat(Object.values(nodoIps)?.[0] || [])
	}
	const [seleccionIps, setSeleccionIps] = useState(ipsSeleccionadas);
	const [modoFiltroIps, setModoFiltroIps] = useState(modoFiltroActualIp);
	useEffect(() => {
		if (seleccionIps.length && modoFiltroIps) {
			refFiltro.current[RUTA_NODO_IP] = {
				[modoFiltroIps]: seleccionIps
			};
		} else {
			delete refFiltro.current[RUTA_NODO_IP];
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [seleccionIps, modoFiltroIps])


	const { maestroProgramas } = useContext(ContextoMaestros);
	const nodoPrograma = refFiltro?.current?.[RUTA_NODO_PROGRAMA];
	let modoFiltroActualPrograma = MODOS[0].id;
	let programasSelecccionados = [];
	if (nodoPrograma) {
		modoFiltroActualPrograma = obtenerModoDeFiltro(nodoPrograma, MODOS) || MODOS[0].id
		if (maestroProgramas.datos) {
			programasSelecccionados = Object.values(nodoPrograma)?.[0]?.map?.( codPrograma => {
				return maestroProgramas.datos?.find?.(p => p.id === codPrograma)?.nombre || codPrograma;
			}) || [];
		}
	}
	const [seleccionProgramas, setSeleccionProgramas] = useState(programasSelecccionados);
	const [modoFiltroProgramas, setModoFiltroProgramas] = useState(modoFiltroActualPrograma);
	useEffect(() => {
		if (seleccionProgramas.length && modoFiltroProgramas) {
			refFiltro.current[RUTA_NODO_PROGRAMA] = {
				[modoFiltroProgramas]: seleccionProgramas.map(programa => {
					if (parseInt(programa) || typeof programa === 'number') return parseInt(programa);
					return (maestroProgramas.datos?.find?.(p => p.nombre === programa))?.id
				})
			};
		} else {
			delete refFiltro.current[RUTA_NODO_PROGRAMA];
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [seleccionProgramas, modoFiltroProgramas])


	return <BoxFiltro relleno={seleccionIps?.length || seleccionProgramas.length.length} modoFiltro="$in" >

		<Typography sx={{ mb: 2 }} component="div" variant="h6">
			Origen de la transmisión
		</Typography>

		<Grid container direction="row" justifyContent="space-even" alignItems="center">
			<Grid item md={1}>
				<Typography>IP</Typography>
			</Grid>
			<Grid item md={2} sx={{ mx: 2 }}>
				<ControlModoFiltro modo={modoFiltroIps} onChange={setModoFiltroIps} listaModos={MODOS} />
			</Grid>
			<Grid item xs={12} md={8}>
				<ControlTextoChip
					regexValidacion={/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/}
					regexParticionado={/[\s\r\n\t]+/}
					valor={seleccionIps}
					onChange={setSeleccionIps}
					label="IPs de origen"
					placeholder="Introduzca direcciones IP"
				/>
			</Grid>
		</Grid>

		<Grid container direction="row" justifyContent="space-even" alignItems="center" sx={{ mt: 2 }}>
			<Grid item md={1}>
				<Typography>Programa</Typography>
			</Grid>
			<Grid item md={2} sx={{ mx: 2 }}>
				<ControlModoFiltro modo={modoFiltroProgramas} onChange={setModoFiltroProgramas} listaModos={MODOS} />
			</Grid>
			<Grid item xs={12} md={8}>
				<ControlTextoChip
					opciones={maestroProgramas.datos?.map(programa => programa.nombre)}
					valor={seleccionProgramas}
					onChange={setSeleccionProgramas}
					label="Programa de farmacia"
				/>
			</Grid>
		</Grid>

	</BoxFiltro>


}


export default OrigenPedido;