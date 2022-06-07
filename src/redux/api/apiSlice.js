import { createSlice } from '@reduxjs/toolkit';

export const apiSlice = createSlice({
	name: 'api',
	initialState: {
		urlMonitor: 'https://fedicom3-dev.hefame.es/~',
		urlWebsocket: 'ws://fedicom3-dev.hefame.es/ws',
		urlFedicom: 'https://fedicom3-dev.hefame.es'
	},
	reducers: {
		setApiUrlMonitor: (state, action) => {
			state.urlMonitor = action.payload;
		},
		setApiUrlWebsocket: (state, action) => {
			state.urlWebsocket = action.payload;
		},
		setApiUrlFedicom: (state, action) => {
			state.urlFedicom = action.payload;
		},
	}
});



export const { setApiUrlMonitor, setApiUrlWebsocket, setApiUrlFedicom } = apiSlice.actions;
export default apiSlice.reducer;
