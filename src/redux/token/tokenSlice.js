import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import API from 'api/api';
import Usuario from './Usuario';

export const solicitarToken = createAsyncThunk('token/solicitarToken',
	async ({ usuario, password, dominio }, redux) => {

		try {
			let respuesta = await API(redux).fedicom.authenticate(usuario, password, dominio);
			return redux.fulfillWithValue(respuesta);
		} catch (error) {
			let mensaje = API.generarErrorFetch(error);
			return redux.rejectWithValue(mensaje);
		}

	}
);

export const solicitarTokenObservador = createAsyncThunk('token/solicitarToken',
	async (_, redux) => {
		try {
			let respuesta = await API(redux).monitor.obtenerTokenObservador();
			return redux.fulfillWithValue(respuesta);
		} catch (error) {
			let mensaje = API.generarErrorFetch(error);
			return redux.rejectWithValue(mensaje);
		}
	}
);

export const tokenSlice = createSlice({
	name: 'token',
	initialState: {
		jwt: null,
		usuario: null,
		estado: 'inicial',
		mensajes: null
	},
	reducers: {
		logout: (state, action) => {
			let mensajeLogout = action.payload;
			state.jwt = null;
			state.usuario = null;
			state.estado = 'logout';
			state.mensajes = [{ codigo: 'LOGOUT', descripcion: mensajeLogout || 'Se ha cerrado la sesión' }];
		},
		ackMensajes: (state) => {
			state.mensajes = null;
		}
	},

	extraReducers: (builder) => {
		builder
			.addCase(solicitarToken.pending, (state) => {
				state.jwt = null;
				state.usuario = null;
				state.estado = 'cargando';
				state.mensajes = null;
			})
			.addCase(solicitarToken.fulfilled, (state, action) => {
				state.jwt = action.payload.jwt;
				state.usuario = action.payload.usuario;
				state.estado = 'completado';
				state.mensajes = null;
			})
			.addCase(solicitarToken.rejected, (state, action) => {
				state.jwt = null;
				state.usuario = null;
				state.estado = 'error';
				state.mensajes = action.payload;
			});
	},
});


const _selectUsuario = (state) => state.token.usuario;
export const selectUsuario = createSelector([_selectUsuario], (usuario) => {
	if (usuario) return new Usuario(usuario)
	return null;
})

export const { logout, ackMensajes } = tokenSlice.actions;

export default tokenSlice.reducer;
