import { Chip, Collapse, IconButton, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function InfoLineaPedido({ linea, almacenOriginal }) {

	const [desplegado, setDesplegado] = useState(false);

	let tieneIncidencias = linea.incidencias?.length > 0 || false;
	let estupefaciente = linea.valeEstupefaciente || false;
	let observaciones = linea.observaciones || false;


	let cantidadSolicitada = linea.cantidad;
	let cantidadServida = (linea.cantidad - (linea.cantidadFalta || 0));
	let cantidadFalta = linea.cantidadFalta - (linea.servicioAplazado?.cantidad || 0)
	let cantidadAplazada = linea.servicioAplazado?.cantidad || 0;
	let cantidadRebotada = 0;


	let esRebote = false;
	let esAplazado = cantidadAplazada > 0;

	if (almacenOriginal && linea.codigoAlmacenServicio && linea.codigoAlmacenServicio !== almacenOriginal) {

		if (esAplazado) {
			cantidadFalta = cantidadFalta - cantidadAplazada;
		} else {
			esRebote = true;
			cantidadRebotada = cantidadServida;
			cantidadServida = 0;
		}

	} else {

	}

	let eleChips = [];
	let eleDetalles = [];

	if (tieneIncidencias) {
		eleChips.push(<Chip size="small" key="incidencias" variant="outlined" label={linea.incidencias[0].descripcion.toUpperCase()} color="warning" />)
		linea.incidencias.map((incidencia, i) => <Typography key={`incidencias-${i}`} variant="subtitle2" gutterBottom component="div">
			{incidencia.codigo} - {incidencia.descripcion}
		</Typography>).forEach(elemento => eleDetalles.push(elemento))
	}

	if (estupefaciente) {
		eleChips.push(<Chip size="small" key="estupe" variant="outlined" label="ESTUPEFACIENTE" color="success" />)
		eleDetalles.push(<Typography key="estupe" variant="subtitle2" gutterBottom component="div">
			Vale de estupefaciente: {linea.valeEstupefaciente}
		</Typography>)
	}
	if (observaciones) {
		eleChips.push(<Chip size="small" key="observaciones" variant="outlined" label="OBSERVACIONES" color="info" />)
		eleDetalles.push(<Typography key="observaciones" variant="subtitle2" gutterBottom component="div">
			Observaciones: {linea.observaciones}
		</Typography>)
	}
	if (esAplazado) {
		eleChips.push(<Chip size="small" key="aplazado" variant="outlined" label="SERVICIO APLAZADO" color="primary" />)
		eleDetalles.push(<Typography key="aplazado" variant="subtitle2" gutterBottom component="div">
			Se aplaza {cantidadAplazada} unidad{cantidadAplazada === 1 ? '' : 'es'} por {linea.codigoAlmacenServicio} para el {linea.servicioAplazado?.fechaServicio}.
		</Typography>)
	}
	if (esRebote) {
		eleChips.push(<Chip size="small" key="rebote" variant="outlined" label="REBOTE FALTAS" color="secondary" />)
		eleDetalles.push(<Typography key="rebote" variant="subtitle2" gutterBottom component="div">
			{cantidadRebotada} unidad{cantidadRebotada === 1 ? '' : 'es'} rebota{cantidadRebotada === 1 ? '' : 'n'} por {linea.codigoAlmacenServicio}.
		</Typography>)
	}
	if (linea.codigoArticuloSustituyente) {
		eleChips.push(<Chip size="small" key="sustituyente" variant="outlined" label="SUSTITUIDO" color="info" />)
		eleDetalles.push(<Typography key="sustituyente" variant="subtitle2" gutterBottom component="div">
			Se sustituye el artículo por el código {linea.codigoArticuloSustituyente}.
		</Typography>)
	}
	if (!linea.descripcionArticulo) {
		eleChips.push(<Chip size="small" key="faltasNoDisponibles" variant="outlined" label="NO SAP" color="warning" />)
		cantidadServida = 0;
	} else {
		cantidadSolicitada = 0;
	}

	let hayDetalles = eleDetalles.length > 0;

	return (
		<>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell sx={{ width: 40 }}>
					{
						hayDetalles && <IconButton size="small" onClick={() => setDesplegado(!desplegado)}						>
							{desplegado ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					}
				</TableCell>
				<TableCell sx={{ width: 460 }}>
					<Typography component="div">{linea.descripcionArticulo || <Typography sx={{ fontStyle: 'italic', color: 'text.disabled' }}>DESCRIPCIÓN NO DISPONIBLE</Typography>}</Typography>
					<Typography component="div" sx={{ fontWeight: 'bold' }}>{linea.codigoArticulo}</Typography>
				</TableCell>
				<TableCell sx={{ width: 120 }}>
					{cantidadSolicitada > 0 && <Typography component="div">{cantidadSolicitada} pedido{cantidadSolicitada === 1 ? '' : 's'}</Typography>}
					{cantidadServida > 0 && <Typography component="div">{cantidadServida} servido{cantidadServida === 1 ? '' : 's'}</Typography>}
					{cantidadFalta > 0 && <Typography component="div" sx={{ color: 'error.main' }}>{cantidadFalta} en falta</Typography>}
					{cantidadAplazada > 0 && <Typography component="div" sx={{ color: 'primary.main' }}>{cantidadAplazada} aplazado{cantidadAplazada === 1 ? '' : 's'}</Typography>}
					{cantidadRebotada > 0 && <Typography component="div" sx={{ color: 'info.main' }}>{cantidadRebotada} rebotado{cantidadRebotada === 1 ? '' : 's'}</Typography>}
				</TableCell>
				<TableCell >
					<Stack direction="row" spacing={0} flexWrap="wrap">
						{eleChips}
					</Stack>
				</TableCell>
			</TableRow>
			{hayDetalles &&
				<TableRow >
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
						<Collapse in={desplegado} timeout="auto" unmountOnExit>
							<Box sx={{ margin: 1, pl: 8 }}>
								{eleDetalles}
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			}
		</>
	);
}