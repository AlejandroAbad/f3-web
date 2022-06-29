class ControladorPeticiones {
	#controladores = [];

	generarControlador() {
		let id;
		let existe;
		do {
			let tmpId = parseInt(Math.random() * 10000000)
			existe = this.#controladores.find(e => e.id === tmpId);
			id = tmpId;
		} while (existe)

		let controlador = new AbortController();

		this.#controladores.push({ id, controlador })
		return [id, controlador]
	}

	abortarTodo(motivo) {
		this.#controladores.forEach(e => e.controlador.abort(motivo))
	}

	descartar(id) {
		this.#controladores = this.#controladores.filter(e => e.id !== id);
	}

	haSidoAbortado(id) {
		let elemento = this.#controladores.find(e => e.id === id);
		if (elemento.controlador.signal.aborted) {
			return elemento.controlador.signal.reason;
		}
		return false;

	}

}

export default ControladorPeticiones;