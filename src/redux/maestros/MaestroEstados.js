
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
}

export default MaestroEstados;