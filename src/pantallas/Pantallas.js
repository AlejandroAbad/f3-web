import PantallaLogin from './PLogin';
import PantallaPrincipal from './PPrincipal';
import PantallaTokens from './herramientas/PTokens';
import PantallaPedidos from './transmisiones/PPedidos';
import PantallaDevoluciones from './transmisiones/PDevoluciones';
import PantallaSimulacionPedidos from './herramientas/simuladores/pedido/PSimulacionPedido';


const Pantallas = {
	Login: PantallaLogin,
	Principal: PantallaPrincipal,
	Transmisiones: {
		Pedidos: PantallaPedidos,
		Devoluciones: PantallaDevoluciones
	},
	Herramientas: {
		Tokens: PantallaTokens,
		Simuladores: {
			Pedidos: PantallaSimulacionPedidos
		}

	}
}

export default Pantallas;