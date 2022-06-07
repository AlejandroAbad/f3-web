
const llamadaMonitor = async (redux, metodo, url, body) => {

	let urlMonitor = redux.getState().api.urlMonitor;
	let jwt = redux.getState().token.jwt;
	let opciones = {
		method: metodo,
		headers: { 'content-type': 'application/json' }
	}

	if (body) opciones.body = JSON.stringify(body);
	if (jwt) opciones.headers['authorization'] = 'Bearer ' + jwt;

	console.groupCollapsed(opciones.method.toUpperCase() + ' ' + urlMonitor + url);
	if (body) console.log(body)
	console.groupEnd()

	try {
		//return await new Promise(resolve => setTimeout(() => resolve(fetch(urlMonitor + url, opciones)), 500));
		return await fetch(urlMonitor + url, opciones);
	} catch (error) {
		throw error;
	}
}

export default llamadaMonitor;


