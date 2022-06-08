import { verificaAutenticacion } from "api/api";
import llamadaMonitor from "api/monitor/apiMonitor";




export const consultaMaestro = async (redux, tipo, id) => {

	id = id ? '/'+id : '';
	
	let respuesta = await llamadaMonitor(redux, 'get', '/maestro/' + tipo + id);
	verificaAutenticacion(redux, respuesta); 

	let json = await respuesta.json();
	return json;

}