import llamadaFedicom from "./apiFedicom";


export const crearPedido = async (redux, abortController, usuario, dominio, pedido) => {

	console.log('SI O QUE', usuario, dominio, pedido)
	let cabeceras = {
		'x-simulacion-dominio': dominio,
		'x-simulacion-usuario': usuario,
	}

	let respuesta = await llamadaFedicom(redux, abortController, 'post', '/pedidos', pedido, cabeceras);

	let json = await respuesta.json();
	return json;
}
