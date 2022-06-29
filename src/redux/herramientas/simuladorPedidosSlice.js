import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from 'api/api';

export const crearPedido = createAsyncThunk('herramientas/simuladorPedidos/generar',
	async (datosSimulacion, redux) => {

		let { usuario, dominio, pedido } = datosSimulacion;

		try {
			let respuesta = await API(redux).fedicom.crearPedido(usuario, dominio, pedido);
			return redux.fulfillWithValue({
				fecha: (new Date()).toString(),
				respuesta,
				consulta: datosSimulacion
			});
		} catch (error) {
			let mensaje = API.generarErrorFetch(error);
			return redux.fulfillWithValue({
				fecha: (new Date()).toString(),
				respuesta: mensaje,
				consulta: datosSimulacion
			});
		}

	}
);

export const simuladorPedidosSlice = createSlice({
	name: 'herramientas/simuladorPedidos',
	initialState: {
		envios: [],
		estado: 'idle'
	},
	reducers: {
		descartarEstado: (state/*, action*/) => {
			state.envios = [];
			state.estado = 'idle';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(crearPedido.pending, (state) => {
				state.estado = 'cargando';
			})
			.addCase(crearPedido.fulfilled, (state, action) => {
				state.estado = 'idle';
				state.envios = [action.payload, ...state.envios.slice(0, 3)];
			})
			.addCase(crearPedido.rejected, (state, action) => {
				state.estado = 'idle';
				state.envios = [action.payload, ...state.envios.slice(0, 3)];
			});
	},
});


export const { descartarEstado } = simuladorPedidosSlice.actions;

export default simuladorPedidosSlice.reducer;
