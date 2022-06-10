import { CircularProgress, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import BoxTexto from "./BoxTexto";
import { selectMaestroProgramas } from "redux/maestros/maestrosSlice";
import { useSelector } from "react-redux";

function TextoProgramaFarmaciaCompacto({ idPrograma }) {

	let maestroProgramas = useSelector(selectMaestroProgramas);

	if (!idPrograma) return null;

	if (maestroProgramas.cargando) {
		return <Typography component="span" sx={{ fontFamily: 'monospace' }}>
			<CircularProgress size={10} color="secondary" sx={{ mr: 1 }} />
			{idPrograma}
		</Typography>

	}

	if (maestroProgramas.error) {
		return <Typography component="span" sx={{ fontFamily: 'monospace' }}>
			<ErrorIcon sx={{ fontSize: 12, color: 'secondary.main' }} /> {idPrograma}
		</Typography>
	}

	if (maestroProgramas.datos) {
		let datosPrograma = maestroProgramas.porId(idPrograma);
		if (datosPrograma) {
			return <Typography component="span" sx={{ fontFamily: 'monospace' }}>
				{datosPrograma?.nombre?.substr(0,12) ?? idPrograma}
			</Typography>
		}
	}

	return <Typography component="span" sx={{ fontFamily: 'monospace' }}>
		{idPrograma}
	</Typography>


}

export default function TextoProgramaFarmacia({ idPrograma, compacto }) {

	let maestroProgramas = useSelector(selectMaestroProgramas);
	let componentePrograma = <Typography component="span" variant="caption" sx={{ ml: 0.5 }}>({idPrograma})</Typography>;

	if (!idPrograma) return null;
	if (compacto) {
		return <TextoProgramaFarmaciaCompacto idPrograma={idPrograma} />
	}

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
		if (datosPrograma) {
			componentePrograma = <>
				<Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>{datosPrograma.nombre ?? 'Desconocido'}</Typography>
				<Typography component="span" variant="caption" sx={{ ml: 0.5 }}>({datosPrograma.id ?? idPrograma})</Typography>
			</>
		}
	}

	return <BoxTexto titulo="Programa:">
		{componentePrograma}
	</BoxTexto>


}