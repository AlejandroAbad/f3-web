import { verificaAutenticacion } from "api/api";
import llamadaMonitor from "api/monitor/apiMonitor";




export const listadoPedidos = async (redux, filtro, proyeccion, orden, skip, limite) => {

	let respuesta = await llamadaMonitor(redux, 'put', '/consulta/pedidos', {
		filtro,
		proyeccion,
		orden,
		skip,
		limite
	});
	verificaAutenticacion(redux, respuesta);

	let json = await respuesta.json();
	return json;

}