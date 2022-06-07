
const llamadaFedicom = async (redux, metodo, url, body) => {

	let urlFedicom = redux.getState().api.urlFedicom;
	let jwt = redux.getState().token.jwt;
	let opciones = {
		method: metodo,
		headers: { 'content-type': 'application/json' }
	}

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