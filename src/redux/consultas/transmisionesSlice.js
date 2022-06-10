import { EJSON } from "bson";
import { endOfDay, startOfDay } from 'date-fns';

import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import API from 'api/api';


export const listarTransmisiones = createAsyncThunk('consultas/transmisiones/listarTransmisiones',
	async (_, redux) => {

		let { filtro, proyeccion, orden, skip, limite } = redux.getState().consultas.transmisiones;

		try {
			let respuesta = await API(redux).monitor.listadoTransmisiones(filtro, proyeccion, orden, skip, limite);
			return redux.fulfillWithValue(respuesta);
		} catch (error) {
			let mensaje = API.generarErrorFetch(error);
			return redux.rejectWithValue(mensaje);
		}
	}
);

export const consultaTransmision = createAsyncThunk('consultas/transmisiones/consultaTransmision',
	async ({ idTransmision }, redux) => {
		try {
			let respuesta = await API(redux).monitor.consultaTransmision(idTransmision);
			return redux.fulfillWithValue(respuesta);
		} catch (error) {
			let mensaje = API.generarErrorFetch(error);
			return redux.rejectWithValue(mensaje);
		}
	}
);


export const consultaLogTransmision = createAsyncThunk('consultas/transmisiones/consultaLogTransmision',
	async ({ idTransmision }, redux) => {
		try {
			let respuesta = await API(redux).monitor.consultaTransmision(idTransmision, 'logs');
			return redux.fulfillWithValue(respuesta);
		} catch (error) {
			let mensaje = API.generarErrorFetch(error);
			return redux.rejectWithValue(mensaje);
		}
	}
);




export const consultaTransmisionesSlice = createSlice({
	name: 'consultas/transmisiones',
	initialState: {
		filtro: EJSON.serialize({ fechaCreacion: { '$gte': startOfDay(new Date()), '$lte': endOfDay(new Date()) } }),
		proyeccion: { sap: 0, 'conexion.solicitud': 0, 'conexion.respuesta': 0 },
		orden: { fechaCreacion: -1 },
		skip: 0,
		limite: 10,
		resultado: null,
		estado: 'inicial',
		mensajes: null,
		transmisionActual: {
			resultado: null,
			estado: 'inicial',
			mensajes: null
		},
		logTransmisionActual: {
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
			.addCase(listarTransmisiones.pending, (state) => {
				state.estado = 'cargando';
				state.mensajes = null;
			})
			.addCase(listarTransmisiones.fulfilled, (state, action) => {
				state.resultado = action.payload;
				state.estado = 'completado';
				state.mensajes = null;
			})
			.addCase(listarTransmisiones.rejected, (state, action) => {
				state.estado = 'error';
				state.mensajes = action.payload;
			})
			.addCase(consultaTransmision.pending, (state) => {
				state.transmisionActual.estado = 'cargando';
				state.transmisionActual.mensajes = null;
			})
			.addCase(consultaTransmision.fulfilled, (state, action) => {
				state.transmisionActual.resultado = action.payload;
				state.transmisionActual.estado = 'completado';
				state.transmisionActual.mensajes = null;
			})
			.addCase(consultaTransmision.rejected, (state, action) => {
				state.transmisionActual.estado = 'error';
				state.transmisionActual.mensajes = action.payload;
			})
			.addCase(consultaLogTransmision.pending, (state) => {
				state.logTransmisionActual.estado = 'cargando';
				state.logTransmisionActual.mensajes = null;
			})
			.addCase(consultaLogTransmision.fulfilled, (state, action) => {
				state.logTransmisionActual.resultado = action.payload;
				state.logTransmisionActual.estado = 'completado';
				state.logTransmisionActual.mensajes = null;
			})
			.addCase(consultaLogTransmision.rejected, (state, action) => {
				state.logTransmisionActual.estado = 'error';
				state.logTransmisionActual.mensajes = action.payload;
			});
	},
});


const _selectFiltro = (state) => state.consultas.pedidos.filtro;
export const selectFiltroTransmisiones = createSelector([_selectFiltro], (filtro) => {
	if (filtro) return EJSON.deserialize(filtro);
	return null;
})


export const { setLimite, setPagina, setFiltro } = consultaTransmisionesSlice.actions;
export default consultaTransmisionesSlice.reducer;
