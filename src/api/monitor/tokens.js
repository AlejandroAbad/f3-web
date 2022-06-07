import { verificaAutenticacion } from "api/api";
import llamadaMonitor from "api/monitor/apiMonitor";



export const obtenerTokenObservador = async (redux) => {
	let respuesta = await llamadaMonitor(redux, 'get', '/token');
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

export const generarTokenPermanente = async (redux, usuario, dominio) => {

	let respuesta = await llamadaMonitor(redux, 'post', '/token', {
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