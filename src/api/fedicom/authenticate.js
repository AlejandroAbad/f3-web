import llamadaFedicom from "./apiFedicom";


export const authenticate = async (redux, abortController, ususario, password, dominio = 'HEFAME', debug = true) => {
	let respuesta = await llamadaFedicom(redux, abortController, 'post', '/authenticate', {
		user: ususario,
		password,
		domain: dominio,
		debug
	});

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
