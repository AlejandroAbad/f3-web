import React from 'react';
import { useDispatch } from 'react-redux';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import API from 'api/api';
import MaestroEstados from './MaestroEstados';
import MaestroProgramas from './MaestroProgramas';
import MaestroLaboratorios from './MaestroLaboratorios';
import MaestroAlmacenes from './MaestroAlmacenes';
import MaestroTipos from './MaestroTipos';



const TIPOS_DE_MAESTROS = ['estados', 'programas', 'laboratorios', 'almacenes', 'tipos'];

export const cargarMaestros = createAsyncThunk('maestros/cargarMaestros',
	async (_, redux) => {
		let promesas = TIPOS_DE_MAESTROS.map(tipo => API(redux).monitor.consultaMaestro(tipo))
		let respuestas = await Promise.allSettled(promesas)

		
		let nuevoEstado = {};
		respuestas.forEach((resultado, i) => {
			let nombreMaestro = TIPOS_DE_MAESTROS[i];
			if (resultado.status === 'fulfilled') {
				if (API.esRespuestaErroresFedicom(resultado.value)) {
					nuevoEstado[nombreMaestro] = {
						datos: [],
						estado: 'error',
						mensajes: resultado.value
					}
				} else {
					nuevoEstado[nombreMaestro] = {
						datos: resultado.value,
						estado: 'completado',
						mensajes: null,
					}
				}
			} else {
				nuevoEstado[nombreMaestro] = {
					datos: [],
					estado: 'error',
					mensajes: API.generarErrorFetch(resultado.reason)
				}
			}
		})

		return redux.fulfillWithValue(nuevoEstado);
	}
);



export const consultaMaestrosSlice = createSlice({
	name: 'maestros',
	initialState: {
		estados: { datos: [], estado: 'incial', mensajes: null},
		programas: { datos: [], estado: 'incial', mensajes: null },
		laboratorios: { datos: [], estado: 'incial', mensajes: null },
		almacenes: { datos: [], estado: 'incial', mensajes: null },
		tipos: { datos: [], estado: 'incial', mensajes: null },
	},
	reducers: {

	},

	extraReducers: (builder) => {
		builder
			.addCase(cargarMaestros.pending, (state) => {
				TIPOS_DE_MAESTROS.forEach( tipo => {
					state[tipo].estado = 'cargando'
					state[tipo].mensajes = null
				})
			})
			.addCase(cargarMaestros.fulfilled, (state, action) => {
				TIPOS_DE_MAESTROS.forEach(tipo => {
					state[tipo] = action.payload[tipo];
				})
			})
			.addCase(cargarMaestros.rejected, (state, action) => {
				
			});
	},
});




const _selectEstados = (state) => state.maestros.estados;
export const selectMaestroEstados = createSelector([_selectEstados], (estados) => {
	return new MaestroEstados(estados);
})

const _selectProgramas = (state) => state.maestros.programas;
export const selectMaestroProgramas = createSelector([_selectProgramas], (programas) => {
	return new MaestroProgramas(programas);
})

const _selectLaboratorios = (state) => state.maestros.laboratorios;
export const selectMaestroLaboratorios = createSelector([_selectLaboratorios], (laboratorios) => {
	return new MaestroLaboratorios(laboratorios);
})


const _selectAlmacenes = (state) => state.maestros.almacenes;
export const selectMaestroAlmacenes = createSelector([_selectAlmacenes], (almacenes) => {
	return new MaestroAlmacenes(almacenes);
})


const _selectTipos = (state) => state.maestros.tipos;
export const selectMaestroTipos = createSelector([_selectTipos], (tipos) => {
	return new MaestroTipos(tipos);
})


// export const { setLimite, setVista, setPagina, setFiltro } = consultaPedidosSlice.actions;

/**
 * Componente memoizado que carga los maestros una única vez en todo el ciclo de la App
 */
export const CargaMaestros = React.memo(() => {
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(cargarMaestros())
	})
	return null;
}, () => true)


export default consultaMaestrosSlice.reducer;
