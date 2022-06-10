import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";

// REDUX
import { useSelector } from "react-redux";

// SUBCOMPONENTES
import TextoAlmacen from "./TextoAlmacen";
import TextoCliente from "./TextoCliente";
import TextoEstado from "./TextoEstado";
import TextoFechaCreacion from "./TextoFechaCreacion";
import TextoDatosInteres from "./TextoDatosInteres";
import TextoId from "./TextoId";
import TextoIp from "./TextoIp";
import TextoNumeroPedido from "./TextoNumeroPedido";
import TextoNumeroPedidoSap from "./TextoNumeroPedidoSap";
import TextoProgramaFarmacia from "./TextoProgramaFarmacia";
import TextoTipoPedido from "./TextoTipoPedido";
import TextoTotales from "./TextoTotales";


const LineaNavegadorPedido = ({ pedido, cabecera, onMostrarDetalle }) => {

	let vista = useSelector(state => state.consultas.pedidos.vista)

	if (cabecera) {
		switch (vista) {
			case 'compacto':
				return <LineaNavegadorPedidoCompacto.Cabecera />
			case 'extendido':
			default:
				return <LineaNavegadorPedidoExtendido.Cabecera />
		}
	}

	let propiedades = {
		id: pedido._id,
		estado: pedido.estado,
		fechaCreacion: pedido.fechaCreacion,
		pedido: pedido.pedido || {},
		conexion: pedido.conexion?.metadatos || {},
		onMostrarDetalle: onMostrarDetalle || (function () { })
	}

	switch (vista) {
		case 'compacto':
			return <LineaNavegadorPedidoCompacto {...propiedades} />
		case 'extendido':
		default:
			return <LineaNavegadorPedidoExtendido {...propiedades} />
	}

}

const LineaNavegadorPedidoExtendido = ({ pedido, conexion, fechaCreacion, estado, id, onMostrarDetalle }) => {
	let estilo = {
		py: 3,
		px: 4,
		borderBottom: 1,
		borderColor: 'grey.200'
	};

	return (
		<ListItem sx={estilo} >
			<Grid container>
				<Grid item xs={3}>
					<Grid container>
						<Grid item xs={12}>
							<TextoFechaCreacion fechaCreacion={fechaCreacion} />
						</Grid>
						<Grid item xs={12}>
							<TextoCliente
								cliente={pedido.codigoCliente}
								usuario={conexion.autenticacion?.usuario}
								dominio={conexion.autenticacion?.dominio}
								solicitante={conexion.autenticacion?.solicitante}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextoNumeroPedido
								crc={pedido.crc}
								onMostrarDetalle={onMostrarDetalle}
								numeroPedidoOrigen={pedido.numeroPedidoOrigen}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={3}>
					<Grid container>
						<Grid item xs={12}>
							<TextoEstado codigoEstado={estado} />
						</Grid>
						<Grid item xs={12}>
							<TextoTipoPedido tipoPedido={pedido.tipoPedido}
								tipoPedidoSap={pedido.tipoPedidoSap}
								motivoPedidoSap={pedido.motivoPedidoSap}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextoNumeroPedidoSap
								numerosPedidoSap={pedido.pedidosAsociadosSap}
								pedidoAgrupadoSap={pedido.pedidoAgrupadoSap}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextoDatosInteres datos={pedido} />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={3}>
					<Grid container>
						<Grid item xs={12}>
							<TextoAlmacen
								codigoAlmacenServicio={pedido.codigoAlmacenServicio}
								almacenesDeRebote={pedido.almacenesDeRebote}
								esCodigoAlmacenDesconocido={pedido.codigoAlmacenDesconocido}
								esCodigoAlmacenSaneado={pedido.codigoAlmacenSaneado}
							/>

						</Grid>
						<Grid item xs={12}>
							<TextoTotales totales={pedido.totales} />
						</Grid>

					</Grid>
				</Grid>
				<Grid item xs={3}>
					<Grid container>
						<Grid item xs={12}>
							<TextoIp ip={conexion.ip} />
						</Grid>
						<Grid item xs={12}>
							<TextoProgramaFarmacia idPrograma={conexion.programa} />
						</Grid>
						<Grid item xs={12}>
							<TextoId id={id} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</ListItem>
	)
}


const ANCHO_CELDAS = [
	190, // Fecha
	80, // Cliente
	90, // CRC
	100, // Num. Ped. Cli
	140, // Estado
	80, // Lineas
	60, // Tipo
	80, //Almacen
	160, // IP
	110 // Programa
]
const LineaNavegadorPedidoCompacto = ({ pedido, conexion, fechaCreacion, estado, onMostrarDetalle }) => {

	let estilo = {
		py: 0,
		px: 4,
		borderBottom: 1,
		borderColor: 'grey.200'

	};
	let i = 0;
	return (
		<ListItem sx={estilo} >
			<Grid container>
				<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++] }}>
					<TextoFechaCreacion compacto fechaCreacion={fechaCreacion} />
				</Grid>
				<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++] }}>
					<TextoCliente compacto cliente={pedido.codigoCliente} />
				</Grid>
				<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++] }}>
					<TextoNumeroPedido compacto crc={pedido.crc} onMostrarDetalle={onMostrarDetalle} numeroPedidoOrigen={pedido.numeroPedidoOrigen} />
				</Grid>
				<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++] }}>
					<TextoNumeroPedido compacto numeroPedidoOrigen={pedido.numeroPedidoOrigen} />
				</Grid>
				<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++], textAlign: 'center' }}>
					<TextoEstado compacto codigoEstado={estado} />
				</Grid>
				<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++], textAlign: 'center' }}>
					<TextoTotales compacto totales={pedido.totales} />
				</Grid>
				<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++], textAlign: 'center' }}>
					<TextoTipoPedido compacto tipoPedido={pedido.tipoPedido} />
				</Grid>
				<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++], textAlign: 'center' }}>
					<TextoAlmacen compacto codigoAlmacenServicio={pedido.codigoAlmacenServicio} />
				</Grid>
				<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++] }}>
					<TextoIp compacto ip={conexion.ip} />
				</Grid>
				<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++] }} >
					<TextoProgramaFarmacia compacto idPrograma={conexion.programa} />
				</Grid>
				<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++] }} >
					<TextoDatosInteres compacto datos={pedido} />
				</Grid>
			</Grid>
		</ListItem >
	)
}

/* #region  Cabeceras */
LineaNavegadorPedidoExtendido.Cabecera = () => null;
LineaNavegadorPedidoCompacto.Cabecera = () => {
	let i = 0;
	return <ListItem sx={{
		py: 1,
		px: 4,
		mb: 2,
		borderBottom: 2,
		borderColor: 'grey.200',
		fontWeight: 900
	}} >
		<Grid container>
			<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++] }}>
				Fecha entrada
			</Grid>
			<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++] }}>
				Cliente
			</Grid>
			<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++] }}>
				CRC
			</Grid>
			<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++] }}>
				N.Ped. Fcía
			</Grid>
			<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++], textAlign: 'center' }}>
				Estado
			</Grid>
			<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++], textAlign: 'center' }}>
				Líneas
			</Grid>
			<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++], textAlign: 'center' }}>
				Tipo
			</Grid>
			<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++], textAlign: 'center' }}>
				Almacén
			</Grid>
			<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++] }}>
				IP
			</Grid>
			<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++] }}>
				Programa
			</Grid>
			<Grid item sx={{ mr: 1, minWidth: ANCHO_CELDAS[i++] }}>
				Notas
			</Grid>
		</Grid>
	</ListItem>
}



export default LineaNavegadorPedido;