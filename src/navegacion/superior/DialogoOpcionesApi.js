import React from 'react';

// MUI
import Box  from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// ICONOS
import InfoIcon from '@mui/icons-material/Info';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { setApiUrlMonitor, setApiUrlWebsocket, setApiUrlFedicom } from 'redux/api/apiSlice';


import preval from 'preval.macro';


export default function DialogoOpcionesApi({ abierto, fnAbrirDialogoApi, fnCerrarDialogoApi }) {

	const dispatch = useDispatch();
	const estadoApi = useSelector(state => state.api);

	const refUrlMonitor = React.useRef(estadoApi.urlMonitor);
	const refUrlWebsocket = React.useRef(estadoApi.urlWebsocket);
	const refUrlFedicom = React.useRef(estadoApi.urlFedicom);

	const fnGuardar = React.useCallback(() => {
		dispatch(setApiUrlMonitor(refUrlMonitor.current.value));
		dispatch(setApiUrlWebsocket(refUrlWebsocket.current.value));
		dispatch(setApiUrlFedicom(refUrlFedicom.current.value));
		fnCerrarDialogoApi();
	}, [dispatch, fnCerrarDialogoApi])


	return <>
		<IconButton onClick={fnAbrirDialogoApi} color="inherit" >
			<InfoIcon />
		</IconButton>
		<Dialog open={abierto} onClose={fnCerrarDialogoApi} fullWidth>
			<DialogTitle>Fedicom 3</DialogTitle>
			<DialogContent>
				<Box>
					<Typography variant="caption" component="div">
						Versión del interfaz web: <strong>v2.0.1</strong>
					</Typography>
					<Typography variant="caption" component="div">
						Fecha de compilación: <strong>{preval`module.exports = new Date().toLocaleString('es-ES');`}</strong>
					</Typography>
				</Box>

				<Typography variant="h6" component="div" sx={{ mt: 4 }}>
					Opciones del API
				</Typography>

				<TextField
					inputRef={refUrlMonitor}
					autoFocus
					margin="dense"
					label="URL base del API de monitorización"
					type="url"
					fullWidth
					variant="standard"
					defaultValue={estadoApi.urlMonitor}
				/>

				<TextField
					inputRef={refUrlWebsocket}
					autoFocus
					margin="dense"
					label="URL base del WebSocket"
					type="url"
					fullWidth
					variant="standard"
					defaultValue={estadoApi.urlWebsocket}
				/>

				<TextField
					inputRef={refUrlFedicom}
					autoFocus
					margin="dense"
					label="URL base del concentrador"
					type="url"
					fullWidth
					variant="standard"
					defaultValue={estadoApi.urlFedicom}
				/>

			</DialogContent>
			<DialogActions>
				<Button onClick={fnCerrarDialogoApi}>Cancelar</Button>
				<Button onClick={fnGuardar}>Guardar</Button>
			</DialogActions>
		</Dialog>
	</>
}