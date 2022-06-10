import React from "react";
import { Typography } from "@mui/material";
import BoxTexto from "./BoxTexto";
import { useSelector } from "react-redux";
import { selectMaestroLaboratorios } from "redux/maestros/maestrosSlice";



export default function TextoCliente({ cliente, usuario, dominio, solicitante, compacto }) {


	let maestroLaboratorios = useSelector(selectMaestroLaboratorios)
	let nombreUsuario = usuario;





	if (compacto) {
		if (cliente)
			return <Typography component="span" sx={{ fontFamily: 'monospace' }}>{cliente}</Typography>
		else
			return <Typography component="span" sx={{ fontFamily: 'monospace', color: 'secondary.main' }}>-</Typography>
	}

	let infoCliente = null;
	let infoAutenticacion = null;
	let infoSolicitante = null;
	let usuarioCorto = null;

	if (nombreUsuario) {

		if (nombreUsuario.startsWith("BF")) {
			usuarioCorto = parseInt(nombreUsuario.substr(nombreUsuario.length - 5))
		}
		else if (nombreUsuario.endsWith("@hefame")) {
			usuarioCorto = parseInt(nombreUsuario.substr(3, 5));
		}
		else if (nombreUsuario.search(/^T[RGP]/) !== -1) {
			nombreUsuario = maestroLaboratorios.porId(parseInt(usuario.substr(2))).nombre;
			usuarioCorto = nombreUsuario;
		}
		else {
			usuarioCorto = nombreUsuario;
		}

		let color = (cliente >= 0 && dominio === 'FEDICOM') ? 'error.main' : 'text.secondary';
		let separador = (cliente >= 0 && dominio === 'FEDICOM') ? '≠' : '«';
		let variante = (cliente >= 0) ? 'subtitle2' : 'subtitle1';
		let negrita = (cliente >= 0) ? 'normal' : 'bold';

		infoAutenticacion = <Typography component="span">
			{cliente >= 0 && <Typography component="span" variant={variante} sx={{ mx: 0.5, color }} >{separador}</Typography>}
			<Typography component="span" variant={variante} sx={{ color, fontWeight: negrita }} >{nombreUsuario}</Typography>
		</Typography>
	}

	if (solicitante && solicitante.usuario && solicitante.dominio) {
		infoSolicitante = <Typography component="div" variant="caption" sx={{ mt: -0.8, pt: 0 }}>› Simulado por {solicitante.usuario}</Typography>
	}

	if (cliente >= 0) {
		infoCliente = <BoxTexto titulo="Cliente:">
			<Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>{cliente ?? 0}</Typography>
			{usuarioCorto !== cliente && infoAutenticacion}
			{infoSolicitante}
		</BoxTexto>
	} else if (infoAutenticacion) {
		infoCliente = <BoxTexto titulo="Usuario:">
			{infoAutenticacion}
			{infoSolicitante}
		</BoxTexto>
	}


	return infoCliente



}