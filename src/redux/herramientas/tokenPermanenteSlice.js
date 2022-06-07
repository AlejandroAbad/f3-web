import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from 'api/api';

export const generarTokenPermanente = createAsyncThunk('herramientas/tokenPermanente/generar',
	async ({ usuario, dominio }, redux) => {
		if (usuario) {
			try {
				let respuesta = await API(redux).monitor.generarTokenPermanente(usuario, dominio);
				return redux.fulfillWithValue(respuesta);
			} catch (error) {
				let mensaje = API.generarErrorFetch(error);
				return redux.rejectWithValue(mensaje);
			}
		} else {
			try {
				let respuesta = await API(redux).monitor.obtenerTokenObservador();
				return redux.fulfillWithValue(respuesta);
			} catch (error) {
				let mensaje = API.generarErrorFetch(error);
				return redux.rejectWithValue(mensaje);
			}
		}
	}
);

export const tokenPermananteSlice = createSlice({
	name: 'herramientas/tokenPermanente',
	initialState: {
		jwt: null,
		estado: 'idle',
		mensajes: null
	},
	reducers: {
		descartarEstado: (state/*, action*/) => {
			state.jwt = null;
			state.estado = 'idle';
			state.mensajes = null;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(generarTokenPermanente.pending, (state) => {
				state.jwt = null;
				state.estado = 'cargando';
				state.mensajes = null;
			})
			.addCase(generarTokenPermanente.fulfilled, (state, action) => {
				state.jwt = action.payload.jwt;
				state.estado = 'idle';
				state.mensajes = null;
			})
			.addCase(generarTokenPermanente.rejected, (state, action) => {
				state.jwt = null;
				state.estado = 'error';
				state.mensajes = action.payload;
			});
	},
});


export const { descartarEstado } = tokenPermananteSlice.actions;

export default tokenPermananteSlice.reducer;
