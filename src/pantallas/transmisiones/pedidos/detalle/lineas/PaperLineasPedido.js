import React from "react"

// MUI
import { Alert, Button, Checkbox, ClickAwayListener, FormControlLabel, FormGroup, Grid,  MenuList, Pagination, Paper, Popper, Table, TableBody,  Typography } from "@mui/material";
import Box from "@mui/material/Box";

// MUI-ICONS
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


// REDUX
import { selectPedido } from "redux/consultas/pedidosSlice";
import { useSelector } from "react-redux";

// SUBCOMPONENTES
import InfoLineaPedido from "./InfoLineaPedido";
import BotonLimiteResultados from "../../BotonLimiteResultados";



const MenuNavegacionLineas = ({ cambiaEstadoMenu, menuFiltroAbierto, refMenuFiltro, cierraMenu, filtros, cambiaFiltro, resultadosPorPagina, setResultadosPorPagina, totalPaginas, paginaActual, setPaginaActual }) => {

	return <Paper square elevation={0} sx={{ p: 0, pb: 1, my: 1 }}>
		<Grid container direction="row" justifyContent="space-between" alignItems="flex-start" >
			<Box sx={{ width: '33%', display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "top" }}>
				<Button endIcon={<ArrowDropDownIcon />} variant="link" size="small" onClick={cambiaEstadoMenu}>
					FILTROS
				</Button>
				<Popper open={menuFiltroAbierto} anchorEl={refMenuFiltro} placement="bottom-start" disablePortal>
					<Paper elevation={4}>
						<ClickAwayListener onClickAway={cierraMenu} >
							<MenuList>
								<FormGroup sx={{ ml: 3 }}>
									<FormControlLabel
										control={
											<Checkbox checked={filtros['fFaltas'] === 1} indeterminate={filtros['fFaltas'] === 2}
												onChange={() => cambiaFiltro('fFaltas')}
												name="fFaltas"
												color={filtros['fFaltas'] === 2 ? 'error' : 'primary'} />
										}
										label="Incidencias"
									/>
									<FormControlLabel
										control={
											<Checkbox checked={filtros['fEstupe'] === 1} indeterminate={filtros['fEstupe'] === 2}
												onChange={() => cambiaFiltro('fEstupe')}
												name="fEstupe"
												color={filtros['fEstupe'] === 2 ? 'error' : 'primary'} />
										}
										label="Estupefacientes"
									/>
									<FormControlLabel
										control={
											<Checkbox checked={filtros['fRebote'] === 1} indeterminate={filtros['fRebote'] === 2}
												onChange={() => cambiaFiltro('fRebote')}
												name="fRebote"
												color={filtros['fRebote'] === 2 ? 'error' : 'primary'} />
										}
										label="Aplazados/Rebotados"
									/>
								</FormGroup>
							</MenuList>
						</ClickAwayListener>
					</Paper>
				</Popper>

				<BotonLimiteResultados limite={resultadosPorPagina} cambiaLimite={setResultadosPorPagina} />
			</Box>


			{totalPaginas > 1 &&
				<Box sx={{ width: '33%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
					<Pagination sx={{ p: 0, m: 0 }} count={totalPaginas} page={paginaActual} onChange={(_, pagina) => setPaginaActual(pagina)} color="primary" />
				</Box>
			}

		</Grid>
	</Paper>

}

const PaperLineasPedido = () => {

	const pedido = useSelector(selectPedido);
	const [menuFiltroAbierto, setMenuFiltroAbierto] = React.useState(false);
	const [refMenuFiltro, setRefMenuFiltro] = React.useState(null);
	const [filtros, setFiltros] = React.useState({ fFaltas: 0, fEstupe: 0, fRebote: 0 });
	const [resultadosPorPagina, setResultadosPorPagina] = React.useState(5);
	const [paginaActual, setPaginaActual] = React.useState(1);

	let lineas = pedido.lineas;

	// Caso en el que no existen lineas en el pedido!
	if (!lineas?.length) {
		return <Paper elevation={10} sx={{ p: 1, pt: 3, pb: 2 }}>
			<Typography sx={{ px: 2 }} variant='h5' component="h2">Posiciones</Typography>
			<Alert variant="error">
				El pedido no tiene posiciones.
			</Alert>
		</Paper>
	}

	const cambiaFiltro = (tipo) => {
		setFiltros(filtroActual => {
			return {
				...filtroActual,
				[tipo]: (filtroActual[tipo] + 1) % 3
			}
		});
		setPaginaActual(1)
	};
	const cambiaEstadoMenu = (event) => {
		setRefMenuFiltro(event.currentTarget);
		setMenuFiltroAbierto((estado) => !estado);
	};
	const cierraMenu = (event) => {
		if (refMenuFiltro && refMenuFiltro.contains(event.target)) return;
		setMenuFiltroAbierto(false);
	};

	let lineasFiltradas = lineas.filter(l => {
		let tieneFaltas = (l.incidencias && l.incidencias.length > 0);

		if (filtros.fFaltas === 1 && !tieneFaltas) return false;
		if (filtros.fFaltas === 2 && tieneFaltas) return false;

		if (filtros.fEstupe === 1 && !l.valeEstupefaciente) return false;
		else if (filtros.fEstupe === 2 && l.valeEstupefaciente) return false;

		let tieneRebote = (l.codigoAlmacenServicio !== pedido.codigoAlmacenServicio)
		if (filtros.fRebote === 1 && !tieneRebote) return false;
		else if (filtros.fRebote === 2 && tieneRebote) return false;

		return true;

	});

	const totalPaginas = parseInt((lineasFiltradas.length / resultadosPorPagina) + (lineasFiltradas.length % resultadosPorPagina === 0 ? 0 : 1)) || 1;
	const primerResultadoMostrado = ((paginaActual - 1) * resultadosPorPagina) + 1;
	const ultimoResultadoMostrado = Math.min(paginaActual * resultadosPorPagina, lineasFiltradas.length);

	lineasFiltradas = lineasFiltradas.slice(primerResultadoMostrado - 1, ultimoResultadoMostrado);





	return <Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2 }}>
		<Typography variant='h5' component="h2">Posiciones</Typography>

		{lineas.length > 10 &&
			<MenuNavegacionLineas {...{ cambiaEstadoMenu, menuFiltroAbierto, refMenuFiltro, cierraMenu, filtros, cambiaFiltro, resultadosPorPagina, setResultadosPorPagina, totalPaginas, paginaActual, setPaginaActual }} />
		}

		{((filtros.fEstupe + filtros.fFaltas + filtros.fRebote) > 0) &&

			<Paper square elevation={3} sx={{ px: 4, py: 2, mb: 1 }} >

				{filtros.fFaltas === 1 && <Typography>• Mostrando filas que tienen incidencias.</Typography>}
				{filtros.fFaltas === 2 && <Typography>• Excluyendo filas que tengan incidencias.</Typography>}

				{filtros.fEstupe === 1 && <Typography>• Mostrando filas con estupefacientes.</Typography>}
				{filtros.fEstupe === 2 && <Typography>• Excluyendo filas con estupefacientes.</Typography>}

				{filtros.fRebote === 1 && <Typography>• Mostrando  filas con rebote de faltas o con servicio aplazado.</Typography>}
				{filtros.fRebote === 2 && <Typography>• Excluyendo filas con rebote de faltas o con servicio aplazado.</Typography>}

			</Paper>
		}

		{lineasFiltradas.length > 0 ?
			<Table>
				<TableBody>
					{lineasFiltradas.map((linea, i) => (
						<InfoLineaPedido key={i} linea={linea} almacenOriginal={pedido.codigoAlmacenServicio} />
					))}
				</TableBody>
			</Table>
			:
			<Alert variant="info">
				Ninguna línea cumple el filtro seleccionado.
			</Alert>
		}

	</Paper>

}

export default React.memo(PaperLineasPedido);