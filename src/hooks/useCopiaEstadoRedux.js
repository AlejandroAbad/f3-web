import React from 'react';

export default function useCopiaEstadoRedux(estadoReferencia, fnLimpieza) {

	let [estadoLocal, setEstadoLocal] = React.useState(null);

	React.useEffect(() => {
		if (estadoReferencia) {
			setEstadoLocal(estadoReferencia)
			if (fnLimpieza) fnLimpieza();
		}
	}, [fnLimpieza, setEstadoLocal, estadoReferencia])

	return [estadoLocal, setEstadoLocal];

}