
const generarValorDesconocido = (id) => {
	return {
		id,
		nombre: `Desconocido (${id})`
	}
}

class MaestroProgramas {

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

	porNombre(nombre) {
		let valor = this.#datos.find(e => e.nombre === nombre)
		if (valor) return valor;
		return generarValorDesconocido(0)
	}

	/**
	 * Retorna un array con los nombres de los programas
	 */
	getNombres() {
		return this.#datos.map(v => v.nombre)
	}

	tieneDatos() {
		return this.#datos.length > 0;
	}
}

export default MaestroProgramas;