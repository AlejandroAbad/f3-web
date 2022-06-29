import { verificaAutenticacion } from "api/api";
import llamadaMonitor from "api/monitor/apiMonitor";



export const obtenerTokenObservador = async (redux, abortController) => {
	let respuesta = await llamadaMonitor(redux, abortController, 'get', '/token');
	let json = await respuesta.json();
	if (json.auth_token) {
		return {
			jwt: json.auth_token,
			usuario: json.datos
		};
	} else {
		throw json;
	}
}

export const generarTokenPermanente = async (redux, abortController, usuario, dominio) => {

	let respuesta = await llamadaMonitor(redux, abortController, 'post', '/token', {
		usuario,
		dominio
	});
	verificaAutenticacion(redux, respuesta);

	let json = await respuesta.json();
	if (json.auth_token) {
		return {
			jwt: json.auth_token,
			usuario: json.datos
		};
	} else {
		throw json;
	}

}