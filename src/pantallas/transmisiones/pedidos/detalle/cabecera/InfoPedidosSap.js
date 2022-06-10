import React from "react";

// MUI
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

// MUI-ICONS
import GroupWorkIcon from "@mui/icons-material/GroupWork";

// REDUX
import { useSelector } from "react-redux";
import { selectPedido } from "redux/consultas/pedidosSlice";

// SUBCOMPONENTES
import BoxInfo from "../BoxInfo";


const InfoPedidosSap = () => {

	let pedido = useSelector(selectPedido);
	let { numerosPedidoSap, pedidoAgrupadoSap } = pedido;


	if (!numerosPedidoSap?.length) return <BoxInfo titulo={`Pedido SAP:`} >
		<Typography variant='body1' color="error" sx={{ fontWeight: 'bold', fontSize: 18 }}>
			SIN NÚMERO DE PEDIDO
		</Typography>
	</BoxInfo>;


	return <BoxInfo titulo={`Pedido${numerosPedidoSap.length > 1 ? 's' : ''} SAP:`} >
		<Stack
			divider={<Typography variant='button' sx={{ mr: 0.5, fontSize: 18 }}>,</Typography>}
			direction="row"
			justifyContent="flex-start"
			alignItems="flex-end"
			flexWrap="wrap"
			spacing={0}
		>
			{numerosPedidoSap.map(nPed => {
				let esAgrupado = (numerosPedidoSap.length > 1 && nPed === pedidoAgrupadoSap);
				return <Typography variant='button' key={nPed} color={esAgrupado ? 'primary' : ''} sx={{ fontSize: 18 }}>
					{esAgrupado && <GroupWorkIcon sx={{ mr: 0.1, fontSize: 18 }} title="Agrupado" />}
					{nPed}
				</Typography>
			})}
		</Stack>
	</ BoxInfo>
}


export default React.memo(InfoPedidosSap)