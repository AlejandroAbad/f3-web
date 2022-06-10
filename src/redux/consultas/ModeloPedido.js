
class ModeloPedido {

	nodoVigente = null;
	nodoInformado = null;
	ultimoNodoCliente = null;
	nodos = [];

	constructor(nodos) {
		this.nodos = nodos;
		this.nodoVigente = this.nodos.find(nodo => nodo.es.vigente);
		this.nodoInformado = this.nodos.find(nodo => nodo.es.informado) || this.nodoVigente;
		this.ultimoNodoCliente = this.nodos.find(n => n.es.ultimoNodoCliente);

		if (!this.ultimoNodoCliente) {
			this.ultimoNodoCliente = this.nodoVigente;
		}
	}

	get estado() {
		return this.nodoVigente?.estado;
	}

	get crc() {
		return this.nodoVigente?.crc;
	}
	get crcSap() {
		return this.crc?.substr(0, 8);
	}
	get tipoCrc() {
		return this.nodoVigente?.tipoCrc;
	}
	get numeroPedidoOrigen() {
		return this.nodoInformado?.numeroPedidoOrigen;
	}


	get numerosPedidoSap() {
		return this.nodoVigente?.pedidosAsociadosSap;
	}
	get pedidoAgrupadoSap() {
		return this.nodoVigente?.pedidoAgrupadoSap;
	}

	get fechaEntrada() {
		return new Date(this.nodos[0].fechaCreacion);
	}

	get datosConexion() {
		return {
			ip: this.ultimoNodoCliente?.ip,
			autenticacion: this.ultimoNodoCliente?.autenticacion,
			programa: this.ultimoNodoCliente?.programa,
			ssl: this.ultimoNodoCliente?.ssl,
			balanceador: this.ultimoNodoCliente.balanceador,
			concentrador: this.ultimoNodoCliente.concentrador,
		}
	}

	get codigoCliente() {
		return this.nodoVigente.codigoCliente;
	}
	get puntoEntrega() {
		return this.nodoVigente.puntoEntrega;
	}
	get clienteSap() {
		return this.nodoVigente.clienteSap;
	}

	get codigoAlmacenServicio() {
		return this.nodoVigente.codigoAlmacenServicio;
	}
	get almacenesDeRebote() {
		return this.nodoVigente.almacenesDeRebote;
	}
	get codigoAlmacenDesconocido() {
		return this.nodoVigente.codigoAlmacenDesconocido;
	}
	get codigoAlmacenSaneado() {
		return this.nodoVigente.codigoAlmacenSaneado;
	}


	get tipoPedido() {
		return this.nodoVigente.tipoPedido;
	}
	get tipoPedidoSap() {
		return this.nodoVigente.tipoPedidoSap;
	}
	get motivoPedidoSap() {
		return this.nodoVigente.motivoPedidoSap;
	}

	get totales() {
		return this.nodoVigente.totales;
	}

	get lineas() {
		if (!this.nodoVigente.transmision?.respuesta?.body?.lineas)
			return this.nodoVigente.transmision?.solicitud?.body?.lineas
		return this.nodoVigente.transmision?.respuesta?.body?.lineas;
	}

	get transmisionHttp() {
		return this.nodoInformado.transmision;
	}

	get transmisionSap() {
		return this.nodoInformado.sap;
	}

	get incidenciasCliente() {
		let body = this.ultimoNodoCliente?.transmision?.respuesta?.body;

		if (body) {
			if (Array.isArray(body)) {
				return body;
			} else {
				if (Array.isArray(body.incidencias)) {
					return body.incidencias;
				}
			}
		}
		return null;

	}


	get flags() {
		let flags = {}
		let nodo;

		/* #region  EN CUALQUIER NODO */
		this.nodos.forEach(nodo => {
			if (nodo.errorComprobacionDuplicado) flags.errorComprobacionDuplicado = true;
			if (nodo.porRazonDesconocida) flags.porRazonDesconocida = true;
			if (nodo.clienteBloqueadoSap) flags.clienteBloqueadoSap = true;
			if (nodo.esPedidoDuplicadoSap) flags.esPedidoDuplicadoSap = true;
		})
		/* #endregion */

		/* #region  SOLO EN EL PRIMER NODO */
		nodo = this.nodos[0];
		if (nodo.esReejecucion) flags.esReejecucion = true;
		if (nodo.opcionesDeReejecucion) flags.opcionesDeReejecucion = nodo.opcionesDeReejecucion;
		/* #endregion */

		/* #region  EN EL NODO INFORMADO */
		nodo = this.nodoInformado;
		if (nodo.noEnviaFaltas) flags.noEnviaFaltas = true;
		if (nodo.retransmisionCliente) flags.retransmisionCliente = true;
		if (nodo.erroresOcultados) flags.erroresOcultados = nodo.erroresOcultados;
		/* #endregion */

		/* #region  EN EL NODO VIGENTE */
		nodo = this.nodoVigente;
		if (nodo.servicioDemorado) flags.servicioDemorado = true;
		if (nodo.estupefaciente) flags.estupefaciente = true;
		if (nodo.esTransfer) flags.esTransfer = true;
		/* #endregion */

		return flags;
	}

}


export default ModeloPedido;