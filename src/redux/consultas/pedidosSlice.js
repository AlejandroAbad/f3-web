import { EJSON } from "bson";
import { endOfDay, startOfDay } from 'date-fns';

import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import API from 'api/api';

export const consultarPedidos = createAsyncThunk('consultas/pedidos/consultarPedidos',
	async (_, redux) => {

		let { filtro, proyeccion, orden, skip, limite } = redux.getState().consultas.pedidos;

		try {
			let respuesta = await API(redux).monitor.listadoPedidos(filtro, proyeccion, orden, skip, limite);
			return redux.fulfillWithValue(respuesta);
		} catch (error) {
			let mensaje = API.generarErrorFetch(error);
			return redux.rejectWithValue(mensaje);
		}
	}
);



export const consultaPedidosSlice = createSlice({
	name: 'consultas/pedidos',
	initialState: {
		filtro: EJSON.serialize({ fechaCreacion: { '$gte': startOfDay(new Date()), '$lte': endOfDay(new Date()) } }),
		proyeccion: { sap: 0, 'conexion.solicitud': 0, 'conexion.respuesta': 0 },
		orden: { fechaCreacion: -1 },
		skip: 0,
		limite: 10,
		vista: 'compacto',
		resultado: null,
		estado: 'inicial',
		mensajes: null
	},
	reducers: {
		setLimite: (state, action) => {
			state.limite = action.payload;
			state.skip = 0;
		},
		setVista: (state, action) => {
			state.vista = action.payload;
		},
		setPagina: (state, action) => {
			let skip = ((action.payload - 1) * state.limite);
			state.skip = skip;
		}

	},

	extraReducers: (builder) => {
		builder
			.addCase(consultarPedidos.pending, (state) => {
				state.estado = 'cargando';
				state.mensajes = null;
			})
			.addCase(consultarPedidos.fulfilled, (state, action) => {
				state.resultado = action.payload;
				state.estado = 'completado';
				state.mensajes = null;
			})
			.addCase(consultarPedidos.rejected, (state, action) => {
				state.estado = 'error';
				state.mensajes = action.payload;
			});
	},
});



const _selectFiltro = (state) => state.consultas.pedidos.filtro;
export const selectFiltro = createSelector([_selectFiltro], (filtro) => {
	if (filtro) return EJSON.deserialize(filtro);
	return null;
})


export const { setLimite, setVista, setPagina } = consultaPedidosSlice.actions;

export default consultaPedidosSlice.reducer;
