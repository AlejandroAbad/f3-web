import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


export const pantallaSlice = createSlice({
	name: 'api',
	initialState: {
		titulo: 'Fedicom 3',
		tema: 'default'
	},
	reducers: {
		setPantalla: (state, action) => {
			state.titulo = action.payload.titulo
			state.tema = action.payload.tema
		}
	}
});

export function usePantalla(titulo, tema) {
	let dispatch = useDispatch();
	let pantalla = useSelector(state => state.pantalla);

	React.useEffect(() => {
		if (pantalla.titulo !== titulo) {
			console.log(pantalla.titulo, titulo)
			dispatch(setPantalla({ titulo, tema }))
		}
	})
	return pantalla;
}

export const { setPantalla } = pantallaSlice.actions;
export default pantallaSlice.reducer;
