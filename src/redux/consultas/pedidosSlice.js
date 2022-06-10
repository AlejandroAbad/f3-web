import { EJSON } from "bson";
import { endOfDay, startOfDay } from 'date-fns';

import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import API from 'api/api';
import ModeloPedido from "./ModeloPedido";

export const listarPedidos = createAsyncThunk('consultas/pedidos/listarPedidos',
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

export const consultaPedido = createAsyncThunk('consultas/pedidos/consultaPedido',
	async ({ idPedido }, redux) => {
		try {
			let respuesta = await API(redux).monitor.consultaPedido(idPedido);
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
		mensajes: null,
		pedidoActual: {
			resultado: null,
			estado: 'inicial',
			mensajes: null
		}
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
		},
		setFiltro: (state, action) => {
			state.skip = 0;
			state.filtro = action.payload;
		}
	},

	extraReducers: (builder) => {
		builder
			.addCase(listarPedidos.pending, (state) => {
				state.estado = 'cargando';
				state.mensajes = null;
			})
			.addCase(listarPedidos.fulfilled, (state, action) => {
				state.resultado = action.payload;
				state.estado = 'completado';
				state.mensajes = null;
			})
			.addCase(listarPedidos.rejected, (state, action) => {
				state.estado = 'error';
				state.mensajes = action.payload;
			})

			.addCase(consultaPedido.pending, (state) => {
				state.pedidoActual.estado = 'cargando';
				state.pedidoActual.mensajes = null;
			})
			.addCase(consultaPedido.fulfilled, (state, action) => {
				state.pedidoActual.resultado = action.payload;
				state.pedidoActual.estado = 'completado';
				state.pedidoActual.mensajes = null;
			})
			.addCase(consultaPedido.rejected, (state, action) => {
				state.pedidoActual.estado = 'error';
				state.pedidoActual.mensajes = action.payload;
			});
	},
});



const _selectFiltro = (state) => state.consultas.pedidos.filtro;
export const selectFiltro = createSelector([_selectFiltro], (filtro) => {
	if (filtro) return EJSON.deserialize(filtro);
	return null;
})

const _selectPedido = (state) => state.consultas.pedidos.pedidoActual.resultado;
export const selectPedido = createSelector([_selectPedido], (pedido) => {
	if (pedido) return new ModeloPedido(pedido);
	return null;
})

export const { setLimite, setVista, setPagina, setFiltro } = consultaPedidosSlice.actions;

export default consultaPedidosSlice.reducer;
