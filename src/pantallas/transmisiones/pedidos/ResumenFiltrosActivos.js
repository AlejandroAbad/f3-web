import { Chip, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import es from "date-fns/locale/es";
import format from "date-fns/format";
import { useSelector } from "react-redux";
import { selectFiltro } from "redux/consultas/pedidosSlice";


function Simbolo({ color, simbolo }) {
	return <Typography
		component="div"
		sx={{
			display: 'inline',
			fontFamily: 'consolas',
			ml: 1,
			fontWeight: 'bold',
			fontSize: '125%',
			mt: 2,
			color
		}}>
		{simbolo}
	</Typography>
}

function ChipValor({ valor, ...props }) {
	return <Chip label={valor} variant='outlined' size='small' {...props} />
}

function textoDeModo(modo, valor) {
	let color = 'inherit'
	let simbolo = '?';

	if (modo === '$in') {
		color = 'success.main'
		simbolo = (valor?.length > 1) ? '⊃' : '='
	}
	if (modo === '$nin') {
		color = 'error.main'
		simbolo = (valor?.length > 1) ? '⊅' : '≠'
	}
	return <Simbolo {...{ color, simbolo }} />
}

function valoresATexto(valor, conversor) {
	if (!conversor) conversor = (v) => v;
	let chips = null;

	if (Array.isArray(valor) && valor.length) {
		chips = valor.slice(0, 5).map((v, i) => <ChipValor key={i} valor={conversor(v)} />)
		let diferencia = valor.length - chips.length;
		if (diferencia) {
			chips.push(<ChipValor key="resto" valor={`y ${diferencia} más ...`} variant='filled' />)
		}
	} else {
		chips = <ChipValor valor={valor} />
	}
	return <Stack display="inline" direction="row" spacing={1} sx={{ ml: 1 }}>{chips}</Stack>
}


function textoDeFiltro(filtros, clave) {

	let filtro = filtros[clave];
	let modo = Object.keys(filtro)[0];
	let valor = filtro[modo];

	switch (clave) {
		case 'pedido.codigoCliente': return <>Código del cliente {textoDeModo(modo, valor)} {valoresATexto(valor)}</>
		case 'pedido.crcSap': return <>CRC {textoDeModo(modo, valor)} {valoresATexto(valor, (v) => v.toString(16))}</>
		case 'pedido.crc': return <>Número de pedido Fedicom {textoDeModo(modo, valor)} {valoresATexto(valor)}</>
		case 'pedido.pedidosAsociadosSap': return <>Número de pedido en SAP {textoDeModo(modo, valor)} {valoresATexto(valor)}</>
		case 'pedido.numeroPedidoOrigen': return <>Número de pedido origen {textoDeModo(modo, valor)} {valoresATexto(valor)}</>
		case 'estado': return <>Estado del pedido {textoDeModo(modo, valor)} {valoresATexto(valor)}</>
		case 'conexion.metadatos.ip': return <>IP de origen {textoDeModo(modo, valor)} {valoresATexto(valor)}</>
		case 'conexion.metadatos.programa': return <>Programa de farmacia {textoDeModo(modo, valor)} {valoresATexto(valor)}</>
		case 'conexion.metadatos.autenticacion.usuarioNormalizado': return <>Solicitante del pedido {textoDeModo(modo, valor)} {valoresATexto(valor)}</>
		case 'pedido.codigoAlmacenServicio': return <>Almacén de servicio {textoDeModo(modo, valor)} {valoresATexto(valor)}</>
		case 'pedido.tipoPedido': return <>Tipo del pedido {textoDeModo(modo, valor)} {valoresATexto(valor)}</>
		case 'fechaCreacion': {

			return <>Pedidos recibidos entre el <ChipValor valor={format(filtro['$gte'], 'dd-MM-yyyy HH:mm:ss', { locale: es })} /> y el <ChipValor valor={format(filtro['$lte'], 'dd-MM-yyyy HH:mm:ss', { locale: es })} /> </>
		}
		default: return <>{clave} ?? {JSON.stringify(valor)}</>
	}
}



export default function ResumenFiltrosActivos() {

	let filtros = useSelector(selectFiltro);

	let listaFiltros = null;
	let clavesDeFiltro = Object.keys(filtros);
	if (!clavesDeFiltro.length) return null;


	listaFiltros = clavesDeFiltro.map(clave => <ListItem disablePadding key={clave}>
		<ListItemText primary={textoDeFiltro(filtros, clave)} />
	</ListItem>
	)


	return <Paper square elevation={10} sx={{ m: 2, mb: 3, pt: 3, pb: 1, px: 4, alignContent: 'center' /*, position: 'sticky', top: '140px', zIndex: 600*/ }}>
		<Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}><FilterAltIcon sx={{ pt: 0.6 }} /> Filtros activos</Typography>
		<List dense sx={{ ml: 2 }}>
			{listaFiltros}
		</List>
	</Paper>

}