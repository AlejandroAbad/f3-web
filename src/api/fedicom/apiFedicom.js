
const llamadaFedicom = async (redux, abortController, metodo, url, body, cabeceras) => {

	let urlFedicom = redux.getState().api.urlFedicom;
	let jwt = redux.getState().token.jwt;
	if (!cabeceras) cabeceras = {}
	let opciones = {
		method: metodo,
		headers: { 
			...cabeceras,
			'content-type': 'application/json',
			'software-id': '9001'
		}
	}

	if (abortController) opciones.signal = abortController.signal;
	if (body) opciones.body = JSON.stringify(body);
	if (jwt) opciones.headers['authorization'] = 'Bearer ' + jwt;

	console.groupCollapsed(opciones.method.toUpperCase() + ' ' + urlFedicom + url);
	if (body) console.log(body)
	console.groupEnd()

	try {
		//return await new Promise(resolve => setTimeout(() => resolve(fetch(urlFedicom + url, opciones)), 100));
		return await fetch(urlFedicom + url, opciones);
	} catch (error) {
		throw error;
	}
}




export default llamadaFedicom;