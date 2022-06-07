import PantallaLogin from './PLogin';
import PantallaPrincipal from './PPrincipal';
import PantallaTokens from './herramientas/PTokens';
import PantallaPedidos from './transmisiones/PPedidos';
import PantallaDevoluciones from './transmisiones/PDevoluciones';


const Pantallas = {
	Login: PantallaLogin,
	Principal: PantallaPrincipal,
	Transmisiones: {
		Pedidos: PantallaPedidos,
		Devoluciones: PantallaDevoluciones
	},
	Herramientas: {
		Tokens: PantallaTokens
	}
}

export default Pantallas;