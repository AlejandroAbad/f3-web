
const generarValorDesconocido = (id) => {
	return {
		id,
		nombre: `TIPO (${id})`,
		descripcion: `Tipo desconocido (${id})`,
	}
}

class MaestroTipos {

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
	get cargando() {
		return this.#estado === 'cargando'
	}

	get error() {
		return this.#estado === 'error'
	}
}

export default MaestroTipos;