import API, { verificaAutenticacion } from "api/api";
import llamadaMonitor from "api/monitor/apiMonitor";




export const listadoTransmisiones = async (redux, filtro, proyeccion, orden, skip, limite) => {

	let respuesta = await llamadaMonitor(redux, 'put', '/consulta/transmisiones', {
		filtro,
		proyeccion,
		orden,
		skip,
		limite
	});
	verificaAutenticacion(redux, respuesta);

	let json = await respuesta.json();
	if (API.esRespuestaErroresFedicom(json)) {
		throw json;
	}
	return json;

}

export const consultaTransmision = async (redux, idTransmision, tipoConsulta) => {

	if (tipoConsulta) tipoConsulta = '/' + tipoConsulta
	else tipoConsulta = '';

	let respuesta = await llamadaMonitor(redux, 'get', '/consulta/transmisiones/' + idTransmision + tipoConsulta);
	verificaAutenticacion(redux, respuesta);

	let json = await respuesta.json();
	if (API.esRespuestaErroresFedicom(json)) {
		throw json;
	}
	return json;
}