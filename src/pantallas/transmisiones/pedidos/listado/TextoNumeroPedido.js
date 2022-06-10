import { Typography } from "@mui/material";
import Link from '@mui/material/Link';
import { generatePath } from "react-router";
import BoxTexto from "./BoxTexto";



export default function TextoNumeroPedido({ crc, onMostrarDetalle, numeroPedidoOrigen, compacto }) {

	if (compacto) {
		if (crc) {
			return <Link
				variant="body1"
				sx={{ fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
				href={generatePath('/#/transmisiones/pedidos/:idPedido', { idPedido: crc })}
				onClick={() => onMostrarDetalle(crc)}
			>
				<Typography component="span" sx={{ fontFamily: 'monospace' }}>{crc.substr(0, 8).toUpperCase()}</Typography>
			</Link>
		}
		else if (numeroPedidoOrigen) {
			return <Typography component="span" sx={{ fontFamily: 'monospace' }}>{numeroPedidoOrigen.substr(0, 10)}</Typography>
		}
		return <Typography component="span" sx={{ fontFamily: 'monospace', color: 'secondary.main' }}>-</Typography>
	}

	return <>
		{crc && <BoxTexto titulo="Crc:">
			<Link
				variant="body1"
				sx={{ fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
				href={generatePath('/#/transmisiones/pedidos/:idPedido', { idPedido: crc })}
				onClick={() => onMostrarDetalle(crc)}
			>
				{crc?.toUpperCase()}
			</Link>
		</BoxTexto>}
		{numeroPedidoOrigen && <BoxTexto titulo="Pedido Origen:">
			<Typography component="div" variant="body1" sx={{ fontWeight: 'bold', color: 'text.secondary' }} >{numeroPedidoOrigen.substr(0, 10)}</Typography>
		</BoxTexto>}
	</>



}