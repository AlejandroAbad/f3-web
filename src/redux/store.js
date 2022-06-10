import { combineReducers, configureStore } from '@reduxjs/toolkit';

import apiReducer from 'redux/api/apiSlice';
import tokenReducer from 'redux/token/tokenSlice';
import tokenPermananteReducer from 'redux/herramientas/tokenPermanenteSlice';
import pantallaSlice from 'redux/pantalla/pantallaSlice';
import consultaPedidosReducer from 'redux/consultas/pedidosSlice'
import maestrosSlice from 'redux/maestros/maestrosSlice';
import consultaTransmisionesSlice from 'redux/consultas/transmisionesSlice';

const loadState = () => {
	try {
		const estadoSerializado = localStorage.getItem('state');
		if (estadoSerializado === null) return undefined;
		let json = JSON.parse(estadoSerializado);
		delete json.token.mensajes;
		return json;
	} catch (e) {
		console.log(e);
		return undefined;
	}
}

const saveState = (state) => {
	try {
		const estadoSerializado = JSON.stringify(state);
		localStorage.setItem('state', estadoSerializado);
	} catch (e) {
		console.log(e);
	}
}


export const store = configureStore({
	reducer: {
		api: apiReducer,
		token: tokenReducer,
		pantalla: pantallaSlice,
		herramientas: combineReducers({
			tokenPermanente: tokenPermananteReducer
		}),
		consultas: combineReducers({
			pedidos: consultaPedidosReducer,
			transmisiones: consultaTransmisionesSlice
		}),
		maestros: maestrosSlice
	},
	preloadedState: loadState()
});


store.subscribe(() => {
	let state = store.getState();
	saveState({
		api: state.api,
		token: state.token
	})
})