import { Stack, Typography } from "@mui/material";

import BoxTexto from "./BoxTexto";



export default function TextoNumeroPedidoSap({ numerosPedidoSap, pedidoAgrupadoSap }) {

	if (!numerosPedidoSap || !numerosPedidoSap.length) return null;

	return <BoxTexto titulo={`Pedido${numerosPedidoSap.length > 1 ? 's' : ''} SAP:`} >
		<Stack
			divider={<Typography variant='button' sx={{ mr: 0.5 }}>,</Typography>}
			direction="row"
			justifyContent="flex-start"
			alignItems="flex-end"
			flexWrap="wrap"
			spacing={0}
		>
			{numerosPedidoSap.map(nPed =>
				<Typography variant='button' key={nPed} color={numerosPedidoSap.length > 1 && nPed === pedidoAgrupadoSap ? 'secondary' : ''} >
					{/*nPed === pedidoAgrupadoSap && <Typography variant='caption' sx={{ ml: 1 }}>Agrupando » </Typography>*/}
					{nPed}
				</Typography>
			)}
		</Stack>
	</ BoxTexto>



}