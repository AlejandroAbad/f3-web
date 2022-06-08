
const generarValorDesconocido = (id) => {
	return {
		id,
		nombre: `Almacén (${id})`,
	}
}

class MaestroAlmacenes {

	#datos = [];
	#estado = 'inicial';

	constructor(maestro) {
		this.#datos = maestro.datos;
		this.#estado = maestro.estado;
	}

	porId(id) {
		let valor = this.#datos.find(e => e.id === id)
		if (valor) return valor;
		return generarValorDesconocido(id)
	}
}

export default MaestroAlmacenes;