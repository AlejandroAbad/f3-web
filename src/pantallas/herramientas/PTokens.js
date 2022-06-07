import React from 'react';
import useCopiaEstadoRedux from 'hooks/useCopiaEstadoRedux';

// MUI
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from '@mui/lab/LoadingButton';
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { descartarEstado, generarTokenPermanente } from "redux/herramientas/tokenPermanenteSlice";
import { convertirErrorLlamadaFedicom } from 'common/FediCommons';
import { usePantalla } from 'redux/pantalla/pantallaSlice';



function PantallaTokens() {

	let dispatch = useDispatch();
	usePantalla('Generar Token Permanente', null);
	let estadoTokenPermanente = useSelector(state => state.herramientas.tokenPermanente)
	let cargando = estadoTokenPermanente.estado === 'cargando';

	let refUsuario = React.useRef();
	let refDominio = React.useRef();
	let [erroresInput, setErroresInput] = React.useState({ usuario: false, dominio: false });

	let [tokenGenerado] = useCopiaEstadoRedux(estadoTokenPermanente.jwt, () => dispatch(descartarEstado()) )
	let [mensajes] = useCopiaEstadoRedux(estadoTokenPermanente.mensajes, () => dispatch(descartarEstado()))

	const fnGenerarTokenPermanente = React.useCallback(() => {
		let usuario = refUsuario.current.value;
		let dominio = refDominio.current.value;
		if (!usuario || !dominio) {
			let nuevosErroresInput = { usuario: Boolean(!usuario), dominio: Boolean(!dominio) };
			setErroresInput(nuevosErroresInput);
			return;
		} else {
			setErroresInput({ usuario: false, dominio: false });
		}
		dispatch(generarTokenPermanente({ usuario, dominio }))

	}, [dispatch, setErroresInput]);



	let eleResultado = null;

	if (cargando) {
		eleResultado = (
			<Paper elevation={3} sx={{ mt: 4, py: 4, px: 4, textAlign: 'center' }}>
				<CircularProgress />
				<Typography component="div" variant="h6">Solicitando token</Typography>
			</Paper>
		)
	} else if (mensajes) {
		eleResultado = (
			<Paper elevation={3} >
				<Alert severity='error' sx={{ mt: 4, py: 2, px: 4 }}>
					{convertirErrorLlamadaFedicom(mensajes)}
				</Alert>
			</Paper >
		)
	} else if (tokenGenerado) {

		eleResultado = <Paper elevation={3} sx={{ mt: 4, py: 4, px: 8 }}>
			<Typography component="h2" variant="h6" sx={{ mb: 1 }}>
				Token generado:
			</Typography>
			<Box sx={{ wordWrap: 'break-word', my: 2, fontFamily: 'monospace' }}>
				{tokenGenerado}
			</Box>
		</Paper>
	}

	return (
		<Container fixed maxWidth="lg">
			<Container maxWidth="sm">
				<Paper elevation={3} sx={{ py: 4, px: 8 }}>
					<Typography component="h2" variant="h6" sx={{ mb: 4 }}>
						Generar Token permanente
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField label="Usuario" variant="outlined" fullWidth inputRef={refUsuario} disabled={cargando} required error={erroresInput.usuario} />
						</Grid>
						<Grid item xs={12}>
							<TextField label="Dominio" variant="outlined" fullWidth inputRef={refDominio} disabled={cargando} required error={erroresInput.dominio} />
						</Grid>
						<Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
							<Button variant="contained" onClick={fnGenerarTokenPermanente} loading={cargando}>
								Generar Token
							</Button>
						</Grid>
					</Grid>
				</Paper>

			</Container>
			{eleResultado}




		</Container>
	)
}

export default React.memo(PantallaTokens);






