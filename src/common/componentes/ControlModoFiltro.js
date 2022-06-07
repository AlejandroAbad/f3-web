import { memo, useCallback } from "react";
import { Button } from "@mui/material";


const ControlModoFiltro = ({ listaModos, modo, onChange }) => {
	
	const avanzaModo = useCallback(() => {
		let indiceActual = listaModos.findIndex(m => m.id === modo);
		indiceActual = (indiceActual + 1) % listaModos.length;
		onChange(listaModos[indiceActual].id);
	}, [listaModos, modo, onChange])


	if (listaModos.length === 0) {
		console.error('La lista de modos no puede estar vacía!!');
		return null;
	}

	let modoSeleccionado = listaModos.find( m => m.id === modo);

	return <Button
		size="small"
		disableElevation
		color={modoSeleccionado.color}
		sx={{ ml: 2, mb: 0.1 }}
		startIcon={modoSeleccionado.icono}
		onClick={avanzaModo}
	>
		{modoSeleccionado.texto}
	</Button>

}

const obtenerModoDeFiltro = (filtro, listaModos) => {

	if (!filtro) return null;
	let claveModo = Object.keys(filtro)?.[0];
	let modo = listaModos?.find(modo => modo.id === claveModo);
	if (modo) return modo.id;
	return null;
	
}

const ControlModoFiltroMemorizado = memo(ControlModoFiltro);
export { obtenerModoDeFiltro, ControlModoFiltroMemorizado as ControlModoFiltro };
export default ControlModoFiltroMemorizado;