// REDUX
import { logout } from 'redux/token/tokenSlice';

import { authenticate } from 'api/fedicom/authenticate';
import { generarTokenPermanente, obtenerTokenObservador } from 'api/monitor/tokens';
import { listadoPedidos, consultaPedido } from './monitor/listadoPedidos';
import { consultaMaestro } from './monitor/consultaMaestros';
import { listadoTransmisiones, consultaTransmision } from './monitor/listadoTransmisiones';
import { crearPedido } from './fedicom/pedidos';


const API = function (R, A) {
	return {
		fedicom: {
			authenticate: (usuario, password, dominio = 'HEFAME', debug = true) => authenticate(R, A, usuario, password, dominio, debug),
			crearPedido: (usuario, dominio, pedido) => crearPedido(R, A, usuario, dominio, pedido)
		},
		monitor: {
			obtenerTokenObservador: () => obtenerTokenObservador(R, A),
			generarTokenPermanente: (usuario, dominio) => generarTokenPermanente(R, A, usuario, dominio),
			listadoPedidos: (filtro, proyeccion, orden, skip, limite) => listadoPedidos(R, A, filtro, proyeccion, orden, skip, limite),
			consultaPedido: (idPedido) => consultaPedido(R, A, idPedido),
			listadoTransmisiones: (filtro, proyeccion, orden, skip, limite) => listadoTransmisiones(R, A, filtro, proyeccion, orden, skip, limite),
			consultaTransmision: (idTransmision, tipoConsulta) => consultaTransmision(R, A, idTransmision, tipoConsulta),
			consultaMaestro: (tipo, id) => consultaMaestro(R, A, tipo, id)
		},
	}
}



export const ERROR_NO_HAY_TOKEN = [
	{
		codigo: 'AUTH-001',
		descripcion: 'Necesaria autenticación'
	}
]

export const PETICION_CANCELADA = [
	{
		codigo: 'CANCEL-001',
		descripcion: 'Consulta cancelada por petición del usuario'
	}
]

export const verificaAutenticacion = (redux, respuesta) => {
	if (!respuesta || respuesta.status === 401) {
		redux.dispatch(logout('La sesión no es válida.'));
		throw ERROR_NO_HAY_TOKEN;
	}
}

API.generarErrorFetch = (error) => {
	if (Array.isArray(error))
		return error;
	else if (error.message)
		return [{ codigo: 'NET-001', descripcion: `No se pudo alcanzar el servidor: ${error.message}` }]
	else
		return [{ codigo: 'NET-002', descripcion: `No se pudo alcanzar el servidor: ${error}` }]
}

API.esRespuestaErroresFedicom = (respuesta) => {
	return Boolean(respuesta?.length > 0 && respuesta[0].codigo && respuesta[0].descripcion)
}



export default API;