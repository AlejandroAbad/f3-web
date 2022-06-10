import React from "react";

// MIO
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

// MUI-ICON
import ErrorIcon from '@mui/icons-material/Error';

// REDUX
import { selectMaestroProgramas } from "redux/maestros/maestrosSlice";
import { useSelector } from "react-redux";

// SUBCOMPONENTES
import BoxInfo from "../BoxInfo";



const InfoProgramaFarmacia = ({ idPrograma }) => {

	let maestroProgramas = useSelector(selectMaestroProgramas);

	let componentePrograma = <>{idPrograma}</>;

	if (!idPrograma) {
		componentePrograma = <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1, color: 'warning.main' }}>
			No especificado
		</Typography>
	} else {

		if (maestroProgramas.cargando) {
			componentePrograma = <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1 }}>
				<CircularProgress size={10} color="secondary" sx={{ mr: 1 }} />
				{idPrograma}
			</Typography>
		}

		if (maestroProgramas.error) {
			componentePrograma = <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
				{idPrograma} <ErrorIcon sx={{ fontSize: 12, color: 'warning.main' }} />
			</Typography>
		}

		if (maestroProgramas.tieneDatos()) {
			let datosPrograma = maestroProgramas.porId(idPrograma);
			componentePrograma = <>
				<Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>{datosPrograma.nombre ?? 'Desconocido'}</Typography>
				<Typography component="span" variant="caption" sx={{ ml: 0.5 }}>({datosPrograma.id ?? idPrograma})</Typography>
			</>
		}
	}
	return <BoxInfo titulo="Programa de farmacia:">
		{componentePrograma}
	</BoxInfo>


}

export default React.memo(InfoProgramaFarmacia);