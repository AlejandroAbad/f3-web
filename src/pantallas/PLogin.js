import React from 'react';
import FediCommons from 'common/FediCommons';

// MUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';

// MUI - ICON
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { ackMensajes, solicitarToken, solicitarTokenObservador } from 'redux/token/tokenSlice';
import { usePantalla } from 'redux/pantalla/pantallaSlice';



const LoginTextField = function ({ ...props }) {
	return <TextField
		variant="outlined"
		margin="normal"
		required
		fullWidth
		autoFocus
		{...props} />
}



export default function PantallaLogin() {

	usePantalla('Fedicom 3 - Login', null);

	const dispatch = useDispatch();

	const token = useSelector(state => state.token);
	const cargando = token.estado === 'cargando';
	const esError = token.estado === 'error';

	const refUsuario = React.useRef();
	const refPasword = React.useRef();


	let botonAckMensajes = <IconButton color="inherit" size="small" onClick={() => { dispatch(ackMensajes()); }}>
		<CloseIcon fontSize="inherit" />
	</IconButton >

	let alertaError = <Collapse in={token.mensajes ? true : false} sx={{ textAlign: "left" }}>
		<Alert severity={esError ? 'error' : 'info'} action={botonAckMensajes}>
			{FediCommons.convertirErrorLlamadaFedicom(token.mensajes, true)}
		</Alert>
	</Collapse>

	return (
		<Container maxWidth="xs">
			<Box sx={{ textAlign: 'center', pt: 4 }}>
				<Avatar sx={{ mb: 1, mx: 'auto' }} >
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Identifíquese
				</Typography>

				<LoginTextField id="usuario" label="Usuario" name="usuario" autoComplete="user" inputRef={refUsuario} disabled={cargando} error={esError} />
				<LoginTextField name="password" label="Contraseña" type="password" id="password" autoComplete="current-password" inputRef={refPasword} disabled={cargando} error={esError} />

				{alertaError}

				<Button sx={{ mt: 2 }} type="submit" fullWidth variant="contained" disabled={cargando} loading={cargando} onClick={() => {
					dispatch(solicitarToken({
						usuario: refUsuario.current.value,
						password: refPasword.current.value,
						dominio: 'HEFAME'
					}))
				}}>
					{cargando ? 'Cargando' : 'Acceder'}
				</Button>

				<Button sx={{ mt: 1 }} type="submit" fullWidth variant="outlined" disabled={cargando} loading={cargando} onClick={() => {
					dispatch(solicitarTokenObservador())
				}}>
					Acceso de monitorización
				</Button>

			</Box>
		</Container>
	);
}