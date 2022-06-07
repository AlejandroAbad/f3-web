import Grid from "@mui/material/Grid";


import CodigoCliente from "./CodigosCliente";
import CodigoSolicitante from "./CodigoSolicitante";
// import DatosPedido from "./DatosPedido";
// import EstadoTransmision from "./EstadoTransmision";
import NumeroPedido from "./NumeroPedido";
// import OrigenPedido from "./OrigenPedido";
import RangoFechas from "./RangoFechas";


export default function FormularioFiltroPedidosEstandard({ refFiltro }) {



	return <Grid container spacing={2} alignItems="flex-start">
		<Grid item xs={12} xl={6}>
			<Grid container>
				<Grid item xs={12}>
					<RangoFechas refFiltro={refFiltro} />
				</Grid>
				<Grid item xs={12}>
					<CodigoCliente refFiltro={refFiltro} />
				</Grid>
				<Grid item xs={12}>
					<NumeroPedido refFiltro={refFiltro} />
				</Grid>
				{/*<Grid item xs={12}>
					<EstadoTransmision refFiltro={refFiltro} />
				</Grid>	*/}
			</Grid>
		</Grid>

		<Grid item xs={12} xl={6}>
			<Grid container>
				{/*<Grid item xs={12}>

					<OrigenPedido refFiltro={refFiltro} />
				</Grid>	*/}
				<Grid item xs={12}>
					<CodigoSolicitante refFiltro={refFiltro} />
				</Grid>
				{/*
				<Grid item xs={12}>
					<DatosPedido refFiltro={refFiltro} />
				</Grid>
				*/}
			</Grid>
		</Grid>
	</Grid>

}