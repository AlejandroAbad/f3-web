
const generarValorDesconocido = (id) => {
	return {
		id,
		ambito: null,
		nombre: `DESCONOCIDO (${id})`,
		descripcion: `Estado desconocido (${id})`,
		color: "info",
		grupo: "DENEGADOS",
	}
}

class MaestroEstados {

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

	porAmbito(ambito) {
		return this.#datos.filter(estado => {
			return !estado.ambito || estado.ambito === ambito
		});
	}

	get cargando() {
		return this.#estado === 'cargando'
	}

	get error() {
		return this.#estado === 'error'
	}
}

export default MaestroEstados;