
const llamadaMonitor = async (redux, abortController, metodo, url, body) => {

	let urlMonitor = redux.getState().api.urlMonitor;
	let jwt = redux.getState().token.jwt;
	let opciones = {
		method: metodo,
		headers: {
			'content-type': 'application/json',
			'software-id': '9001'
		}
	}

	if (abortController) opciones.signal = abortController.signal;
	if (body) opciones.body = JSON.stringify(body);
	if (jwt) opciones.headers['authorization'] = 'Bearer ' + jwt;

	console.groupCollapsed(opciones.method.toUpperCase() + ' ' + urlMonitor + url);
	if (body) console.log(body)
	console.groupEnd()

	try {
		//return await new Promise(resolve => setTimeout(() => resolve(fetch(urlMonitor + url, opciones)), 5000));
		return await fetch(urlMonitor + url, opciones);
	} catch (error) {
		throw error;
	}
}

export default llamadaMonitor;


