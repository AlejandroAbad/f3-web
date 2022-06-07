import React from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function useNavegacion(urlBase, ubicacionParametro) {

	const navigate = useNavigate();
	const location = useLocation();

	const idEnUrl =  location?.pathname?.split('/')?.[ubicacionParametro];
	const [idSeleccionado, _setIdSeleccionado] = React.useState(idEnUrl);

	let setIdSeleccionado = React.useCallback((id, e) => {
		e?.preventDefault?.();
		_setIdSeleccionado(id);
		
		if (id) {
			navigate(urlBase + '/' + id);
		} else {
			navigate(urlBase);
		}
		
		
	}, [navigate, _setIdSeleccionado, urlBase])

	React.useEffect(() => {
		if (location?.pathname?.startsWith(urlBase + '/')) {
				_setIdSeleccionado(idEnUrl);
			} else {
				_setIdSeleccionado(null);
			}
	}, [location, _setIdSeleccionado, urlBase, idEnUrl])

	/*
	React.useEffect(() => {
		let teclaPresionada = (e) => {
			if (e.keyCode === 114) { // F3 presionado
				if (location?.pathname.startsWith(urlBase + '/')) {
					let id = location.pathname.split('/').reverse()[0];
					if (id) {
						setIdSeleccionado(e, null);
					}
				}
			}
		}
		document.addEventListener("keydown", teclaPresionada, false);
		return () => {
			document.removeEventListener("keydown", teclaPresionada, false);
		}
	}, [location, setIdSeleccionado, urlBase])
	*/
	return [idSeleccionado, setIdSeleccionado]


}