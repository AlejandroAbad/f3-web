
const generarValorDesconocido = (id) => {
	return {
		id,
		nombre: `LAB DESCONOCIDO (${id})`,
	}
}

class MaestroLaboratorios {

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

	tieneDatos() {
		return this.#datos.length > 0;
	}

	get cargando() {
		return this.#estado === 'cargando'
	}

	get error() {
		return this.#estado === 'error'
	}
}

export default MaestroLaboratorios;