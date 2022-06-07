// MUI
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


// REDUX 
import { useSelector, useDispatch } from "react-redux";
import { consultarPedidos, setPagina, setVista } from "redux/consultas/pedidosSlice";

// SUBCOMPONENTES
import BotonFiltrosPedido from "./BotonFiltrosPedido";
import BotonLimiteResultados from "./BotonLimiteResultados";



export default function ControlNavegacionPedidos() {

	let dispatch = useDispatch();
	let { skip, limite, vista, resultado, estado } = useSelector(state => state.consultas.pedidos);

	const totalResultados = resultado?.totalResultados;
	const totalPaginas = parseInt((totalResultados / limite) + (totalResultados % limite === 0 ? 0 : 1)) || 1;
	const paginaActual = parseInt((skip / limite) + 1) || 1;
	const primerResultadoMostrado = skip + 1;
	const ultimoResultadoMostrado = Math.min(skip + limite, totalResultados);

	const fnCambiarVista = (e) => dispatch(setVista(e.target.value))
	
	const fnCambiarPagina = (_, pagina) => {
		dispatch(setPagina(pagina));
		if (estado !== 'cargando') dispatch(consultarPedidos())
	}	


	return (<Paper elevation={10} sx={{ mt: 0, p: 2, position: 'sticky', top: '60px', zIndex: 100 }}>
		<Grid container direction="row" justifyContent="space-between" alignItems="center" >
			<Box sx={{ width: '33%', display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "top" }}>
				<BotonFiltrosPedido />
				<BotonLimiteResultados />
			</Box>

			<Box sx={{ width: '33%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
				{(totalPaginas > 1) ?
					<>
						<Pagination sx={{ p: 0, m: 0 }} count={totalPaginas} page={paginaActual} onChange={fnCambiarPagina} color="primary" />
						{totalResultados > 0 && <Typography sx={{ mt: 0.8 }} variant="caption">Mostrando pedidos del {primerResultadoMostrado} al {ultimoResultadoMostrado} de un total de {totalResultados}</Typography>}
					</>
					:
					<>
						{(totalResultados > 0) && <Typography sx={{ mt: 0.8 }} variant="caption">Encontrados {totalResultados} pedidos</Typography>}
					</>
				}
			</Box>

			<Box sx={{ width: '33%', display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
				<ToggleButtonGroup size="small" color="primary" sx={{ width: '20%', justifyContent: 'right' }} value={vista} onChange={fnCambiarVista} exclusive>
					<ToggleButton value="compacto" >Compacto</ToggleButton>,
					<ToggleButton value="extendido" >Extendido</ToggleButton>,
					<ToggleButton value="reejecucion" >Reenvío</ToggleButton>,
				</ToggleButtonGroup>
			</Box>
		</Grid>
	</Paper>)
}