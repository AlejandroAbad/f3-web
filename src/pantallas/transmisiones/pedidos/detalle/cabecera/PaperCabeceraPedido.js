import React from "react"

import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

// SUBCOMPONETNES
import InfoAlmacen from "./InfoAlmacen";
import InfoCliente from "./InfoCliente";
import InfoCrc from "./InfoCrc";
import InfoPedidosSap from "./InfoPedidosSap";
import InfoEstado from "./InfoEstado";
import InfoPedidoOrigen from "./InfoPedidoOrigen";
import InfoTipoPedido from "./InfoTipoPedido";
import InfoTotales from "./InfoTotales";



const PaperCabeceraPedido = () => {

	return <Box>
		<Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2 }}>
			<Typography variant='h5' component="h2">Datos de cabecera</Typography>
			<Grid container sx={{ mx: 2 }}>
				<Grid item xs={4}>
					<Grid container>
						<Grid item xs={12}>
							<InfoCliente />
						</Grid>
						<Grid item xs={12}>
							<InfoCrc />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={4}>
					<Grid container>
						<Grid item xs={12}>
							<InfoAlmacen />
						</Grid>
						<Grid item xs={12}>
							<InfoPedidosSap />
						</Grid>
						<Grid item xs={12}>
							<InfoTipoPedido />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={4}>
					<Grid container>
						<Grid item xs={12}>
							<InfoEstado />
						</Grid>
						<Grid item xs={12}>
							<InfoPedidoOrigen />
						</Grid>
						<Grid item xs={12}>
							<InfoTotales />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	</Box>
}

export default React.memo(PaperCabeceraPedido);