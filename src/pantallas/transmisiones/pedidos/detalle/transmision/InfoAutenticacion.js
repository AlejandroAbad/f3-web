import React from "react";

// MUI
import Typography from "@mui/material/Typography";

// REDUX
import { selectMaestroLaboratorios } from "redux/maestros/maestrosSlice";
import { useSelector } from "react-redux";

// SUBCOMPONENTES
import BoxInfo from "../BoxInfo";




const InfoAutenticacion = ({ autenticacion }) => {


	let { usuario, /*dominio,*/ solicitante } = autenticacion || {};
	let maestroLaboratorios = useSelector(selectMaestroLaboratorios);

	let nombreLaboratorio = null;
	if (usuario.search(/^T[RGP]/) !== -1) {
		nombreLaboratorio = maestroLaboratorios.porId(parseInt(usuario.substr(2)));
	}

	let infoSolicitante = null;
	if (solicitante?.usuario) {
		infoSolicitante = <Typography component="div" variant="subtitle1" sx={{ pt: 0, pl: 2, fontSize: '12px' }}>› Simulado por {solicitante.usuario}</Typography>
	}

	let componenteUsuario = null;
	let tituloCaja = null;
	if (nombreLaboratorio) {
		tituloCaja = "Laboratorio:";
		componenteUsuario = <>
			<Typography sx={{ fontWeight: 'bold' }} variant='body1' component="div">
				{nombreLaboratorio}
			</Typography>
			<Typography variant='body2' component="div">
				{usuario}
			</Typography>
		</>

	} else {
		tituloCaja = "Usuario autenticado:";
		componenteUsuario = <Typography variant='body1' component="div">
			{usuario}
		</Typography>
	}

	return <BoxInfo titulo={tituloCaja}>
		{componenteUsuario}
		{infoSolicitante}

	</BoxInfo>
}

export default React.memo(InfoAutenticacion);
