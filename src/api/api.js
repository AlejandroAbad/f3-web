// REDUX
import { logout } from 'redux/token/tokenSlice';

import { authenticate } from 'api/fedicom/authenticate';
import { generarTokenPermanente, obtenerTokenObservador } from 'api/monitor/tokens';
import { listadoPedidos, consultaPedido } from './monitor/listadoPedidos';
import { consultaMaestro } from './monitor/consultaMaestros';
import { listadoTransmisiones, consultaTransmision } from './monitor/listadoTransmisiones';


const API = function (redux) {
	return {
		fedicom: {
			authenticate: (usuario, password, dominio = 'HEFAME', debug = true) => authenticate(redux, usuario, password, dominio, debug)
		},
		monitor: {
			obtenerTokenObservador: () => obtenerTokenObservador(redux),
			generarTokenPermanente: (usuario, dominio) => generarTokenPermanente(redux, usuario, dominio),
			listadoPedidos: (filtro, proyeccion, orden, skip, limite) => listadoPedidos(redux, filtro, proyeccion, orden, skip, limite),
			consultaPedido: (idPedido) => consultaPedido(redux, idPedido),
			listadoTransmisiones: (filtro, proyeccion, orden, skip, limite) => listadoTransmisiones(redux, filtro, proyeccion, orden, skip, limite),
			consultaTransmision: (idTransmision, tipoConsulta) => consultaTransmision(redux, idTransmision, tipoConsulta),
			consultaMaestro: (tipo, id) => consultaMaestro(redux, tipo, id)
		},
	}
}



const ERROR_NO_TOKEN = [
	{
		codigo: 'AUTH-001',
		descripcion: 'Necesaria autenticación'
	}
]


export const verificaAutenticacion = (redux, respuesta) => {
	if (!respuesta || respuesta.status === 401) {
		redux.dispatch(logout('La sesión no es válida.'));
		throw ERROR_NO_TOKEN;
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