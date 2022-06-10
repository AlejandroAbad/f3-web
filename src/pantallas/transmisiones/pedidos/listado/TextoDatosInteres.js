import { Chip, Stack } from "@mui/material";
import BoxTexto from "./BoxTexto";
import React from "react";

import AcUnitIcon from '@mui/icons-material/AcUnit';
import { blue, green, red, yellow } from "@mui/material/colors";


const Elemento = ({ compacto, icono, texto, color }) => {

	if (compacto) {
		return React.createElement(
			icono,
			{
				size: 18,
				style: { marginTop: '4px' },
				color: color,
				title: texto
			},
			null
		);
	} else {
		return <Chip size="small" variant="outlined" label={texto} />
	}

}


const generaElemento = (tipo, compacto) => {

	switch (tipo) {
		case 'noEnviaFaltas': return <Elemento key={tipo} compacto={compacto} texto={"NO FALTAS"} icono={AcUnitIcon} color={red[500]} />
		case 'retransmisionCliente': return <Elemento key={tipo} compacto={compacto} texto={"REINTENTO"} icono={AcUnitIcon} color={blue[500]} />
		case 'reboteFaltas': return <Elemento key={tipo} compacto={compacto} texto={"REBOTE FALTAS"} icono={AcUnitIcon} color={blue[500]} />
		// case 'errorComprobacionDuplicado': return <Chip {...propiedadesChip(compacto)} key={tipo} label="ERR" color={red[500]} />
		case 'porRazonDesconocida': return <Elemento key={tipo} compacto={compacto} texto={"RAZON DESCONOCIDA"} icono={AcUnitIcon} color={red[500]} />
		case 'servicioDemorado': return <Elemento key={tipo} compacto={compacto} texto={"DEMORADO"} icono={AcUnitIcon} color={blue[500]} />
		case 'estupefaciente': return <Elemento key={tipo} compacto={compacto} texto={"ESTUPES"} icono={AcUnitIcon} color={green[500]} />
		case 'clienteBloqueadoSap': return <Elemento key={tipo} compacto={compacto} texto={"CLIENTE BLOQUEADO"} icono={AcUnitIcon} color={yellow[500]} />
		case 'esPedidoDuplicadoSap': return <Elemento key={tipo} compacto={compacto} texto={"DUPLICADO SAP"} icono={AcUnitIcon} color={yellow[500]} />
		case 'esTransfer': return <Elemento key={tipo} compacto={compacto} texto={"TRANSFER"} icono={AcUnitIcon} color={green[500]} />
		case 'esReejecucion': return <Elemento key={tipo} compacto={compacto} texto={"REEJECUCION"} icono={AcUnitIcon} color={blue[500]} />
		default: return null;
	}



}


export default function TextoDatosInteres({ datos, compacto }) {

	if (!datos) return null;

	let esUnClon = (datos.opcionesDeReejecucion?.clonado);
	let faltaTotal = (datos.totales?.cantidad && (datos.totales?.cantidad - datos.totales?.cantidadIncidencias) === 0);

	let componentes = Object.keys(datos).map(c => generaElemento(c, compacto)).filter(c => c !== null);

	if (faltaTotal)
		componentes.push(<Elemento key="faltaTotal" compacto={compacto} texto={"FALTA TOTAL"} icono={AcUnitIcon} color="secondary"/>);
	if (esUnClon)
		componentes.push(<Elemento key="esClon" compacto={compacto} texto={"CLONADO"} icono={AcUnitIcon} color="secondary"/>);



	if (componentes.length === 0) return null;

	if (compacto) {
		return <Stack
			direction="row"
			justifyContent="flex-start"
			alignItems="flex-end"
			flexWrap="wrap"
			spacing={0.7}>
			{componentes}
		</Stack>
	}
	return <BoxTexto titulo="Notas de interés:">
		<Stack
			direction="row"
			justifyContent="flex-start"
			alignItems="flex-end"
			flexWrap="wrap"
			spacing={0.7}>
			{componentes}
		</Stack>
	</BoxTexto >



}