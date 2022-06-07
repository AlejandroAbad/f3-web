
import fromUnixTime from 'date-fns/fromUnixTime'

class Usuario {

	#id;
	#dominio;
	#grupos;
	#fechaExpedicionToken;
	#fechaExpiracionToken;
	#permanente;

	constructor( datos ) {
		this.#id = datos.sub;
		this.#dominio = datos.aud;
		this.#grupos = datos.grupos?.map(grupo => grupo.trim().toLowerCase()) || [];
		this.#fechaExpedicionToken = fromUnixTime(datos.iat);
		this.#fechaExpiracionToken = fromUnixTime(datos.exp);
		this.#permanente = Boolean(datos.permanente);
	}

	get id() {
		return this.#id;
	}

	get uid() {
		return this.#dominio + '\\' + this.#id;
	}

	get nombre() {
		return this.#id;
	}

	get dominio() {
		return this.#dominio;
	}

	pertenece(grupo) {
		let grupoSaneado = grupo.trim().toLowerCase();
		return this.#grupos.includes(grupoSaneado);
	}

	esObservador() {
		return this.#permanente && this.uid === 'MONITOR\\Observador';
	}




}

export default Usuario;