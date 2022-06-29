import { combineReducers, configureStore } from '@reduxjs/toolkit';

import apiReducer from 'redux/api/apiSlice';
import tokenReducer from 'redux/token/tokenSlice';
import tokenPermananteReducer from 'redux/herramientas/tokenPermanenteSlice';
import pantallaReducer from 'redux/pantalla/pantallaSlice';
import consultaPedidosReducer from 'redux/consultas/pedidosSlice'
import maestrosReducer from 'redux/maestros/maestrosSlice';
import consultaTransmisionesReducer from 'redux/consultas/transmisionesSlice';
import simuladorPedidosReducer from 'redux/herramientas/simuladorPedidosSlice';

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
		pantalla: pantallaReducer,
		herramientas: combineReducers({
			tokenPermanente: tokenPermananteReducer,
			simuladorPedidos: simuladorPedidosReducer
		}),
		consultas: combineReducers({
			pedidos: consultaPedidosReducer,
			transmisiones: consultaTransmisionesReducer
		}),
		maestros: maestrosReducer
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