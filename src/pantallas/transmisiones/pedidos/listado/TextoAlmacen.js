import { CircularProgress, Stack, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import BoxTexto from "./BoxTexto";
import { useSelector } from "react-redux";
import { selectMaestroAlmacenes } from "redux/maestros/maestrosSlice";





export default function TextoAlmacen({ codigoAlmacenServicio, almacenesDeRebote, esCodigoAlmacenDesconocido, esCodigoAlmacenSaneado, compacto }) {

	let maestroAlmacenes = useSelector(selectMaestroAlmacenes);

	let componenteNombreAlmacen = <>{codigoAlmacenServicio}</>;

	if (!codigoAlmacenServicio) return null;

	if (compacto) {
		return <Typography component="span" sx={{ fontFamily: 'monospace' }}>
			{codigoAlmacenServicio}
		</Typography>
	} 

	if (maestroAlmacenes.cargando) {
		componenteNombreAlmacen = <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1 }}>
			<CircularProgress size={10} color="secondary" sx={{ mr: 1 }} />
			{codigoAlmacenServicio}
		</Typography>
	}

	if (maestroAlmacenes.error) {
		componenteNombreAlmacen = <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
			{codigoAlmacenServicio} <ErrorIcon sx={{ fontSize: 12, color: 'warning.main' }} />
		</Typography>
	}

	if (maestroAlmacenes.tieneDatos()) {

		let datosAlmacen = maestroAlmacenes.porId(codigoAlmacenServicio)
		if (datosAlmacen) {
			componenteNombreAlmacen = <>
				<Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>{datosAlmacen.nombre ?? 'Desconocido'}</Typography>
				<Typography component="span" variant="caption" sx={{ ml: 0.5 }}>({datosAlmacen.id ?? codigoAlmacenServicio})</Typography>
			</>
		}
	}



	let eleAlmacenesRebote = null;
	if (Array.isArray(almacenesDeRebote) && almacenesDeRebote?.length > 0) {

		eleAlmacenesRebote = (<Typography component="div" variant="body2" >
			Rebote por: <Stack divider={<>,</>} direction="row" spacing={0.5} sx={{ display: 'inline', ml: 0.3 }}>
				{almacenesDeRebote.map(almacenRebote => <Typography key={almacenRebote} variant="caption" component="span">{almacenRebote}</Typography>)}
			</Stack>
		</Typography >)
	}

	return <BoxTexto titulo="Almacén:">
		<Typography component="div" variant="body1" sx={{ fontWeight: 'bold' }}>
			{componenteNombreAlmacen}
		</Typography>
		{eleAlmacenesRebote}
	</BoxTexto>


}