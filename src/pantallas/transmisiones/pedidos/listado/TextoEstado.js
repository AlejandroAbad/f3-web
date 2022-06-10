import { Avatar, Chip, CircularProgress, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import BoxTexto from "./BoxTexto";

import { selectMaestroEstados } from "redux/maestros/maestrosSlice";
import { useSelector } from "react-redux";

function TextoEstadoCompacto({ codigoEstado }) {

	let maestroEstados = useSelector(selectMaestroEstados);
	if (!codigoEstado) return null;



	if (maestroEstados.cargando) {
		return <Typography sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
			<CircularProgress size={10} color="secondary" /> {codigoEstado}
		</Typography>
	}

	if (maestroEstados.error) {
		return <Typography sx={{ fontWeight: 'bold', fontFamily: 'monospace' }} >
			<ErrorIcon sx={{ color: 'secondary.main', height: 14 }} />
			{codigoEstado}
		</Typography>
	}

	if (maestroEstados.tieneDatos()) {

		let datosEstado = maestroEstados.porId(codigoEstado);
		if (datosEstado) {

			return <Typography sx={{ fontWeight: 'bold', color: `${datosEstado.color}.main`, fontFamily: 'monospace' }} >
				{datosEstado.nombre}
			</Typography >
		}
	}

	return <Typography sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}		>
		{codigoEstado}
	</Typography>


}

export default function TextoEstado({ codigoEstado, compacto }) {

	let maestroEstados = useSelector(selectMaestroEstados);
	if (!codigoEstado) return null;

	if (compacto) return <TextoEstadoCompacto codigoEstado={codigoEstado} />

	let componenteEstado = <Chip
		size="small"
		sx={{ fontWeight: 'bold', px: 1 }}
		label={`Estado ${codigoEstado}`}
	/>

	if (maestroEstados.cargando) {
		componenteEstado = <Chip
			size="small"
			sx={{ fontWeight: 'bold', px: 1 }}
			avatar={<CircularProgress size={10} color="secondary" />}
			label={`${codigoEstado} - Cargando`}
		/>
	}

	if (maestroEstados.error) {
		componenteEstado = <Chip
			size="small"
			sx={{ fontWeight: 'bold', px: 1 }}
			avatar={<Avatar sx={{ bgcolor: 'transparent' }}><ErrorIcon sx={{ color: 'warning.main' }} /></Avatar>}
			label={`${codigoEstado}`}
		/>
	}

	if (maestroEstados.tieneDatos()) {

		let datosEstado = maestroEstados.porId(codigoEstado);
		if (datosEstado) {
			componenteEstado = <Chip
				size="small"
				color={datosEstado.color}
				sx={{ fontWeight: 'bold', px: 1 }}
				label={datosEstado.nombre}
			/>
		}
	}

	return <BoxTexto titulo="Estado:">
		{componenteEstado}
	</BoxTexto>


}