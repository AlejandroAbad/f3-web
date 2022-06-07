import React from 'react';

// MUI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// ICONOS
import MenuIcon from '@mui/icons-material/Menu';

// REDUX
import { useSelector } from 'react-redux';
import { selectUsuario } from 'redux/token/tokenSlice';

// SUBCOMPONENTES
import DialogoOpcionesApi from './DialogoOpcionesApi';
import MenuUsuario from './MenuUsuario';






const BarraSuperior = ({ onMenuLateralClick, ...props }) => {

	const usuario = useSelector(selectUsuario);
	const tituloPantalla = useSelector(state => state.pantalla.titulo);
	
	const [anclaje, setAnclaje] = React.useState(null);
	const fnAbrirMenuUsuario = React.useCallback((e) => setAnclaje(e.currentTarget), [setAnclaje]);
	const fnCerrarMenuUsuario = React.useCallback((e) => setAnclaje(null), [setAnclaje]);

	const [dialogoApiAbierto, setDialogoApiAbierto] = React.useState(false);
	const fnAbrirDialogoApi = React.useCallback(() => setDialogoApiAbierto(true), [setDialogoApiAbierto]);
	const fnCerrarDialogoApi = React.useCallback(() => setDialogoApiAbierto(false), [setDialogoApiAbierto]);

	return (
		<AppBar color="barraSuperior" position="fixed" {...props}  >
			<Toolbar>
				{usuario && (
					<IconButton edge="start" sx={{ mr: 4 }} color="inherit" onClick={onMenuLateralClick}>
						<MenuIcon />
					</IconButton>
				)}
				<Typography variant="h6" sx={{ flexGrow: 1, color: 'barraSuperior.contrastText' }}>
					{tituloPantalla}
				</Typography>

				<DialogoOpcionesApi
					abierto={dialogoApiAbierto}
					fnCerrarDialogoApi={fnCerrarDialogoApi}
					fnAbrirDialogoApi={fnAbrirDialogoApi} />

				{usuario &&
					<MenuUsuario
						elementoAncla={anclaje}
						abierto={Boolean(anclaje)}
						fnCerrarMenuUsuario={fnCerrarMenuUsuario}
						fnAbrirMenuUsuario={fnAbrirMenuUsuario}
					/>
				}

			</Toolbar>
		</AppBar>
	);
}




export default React.memo(BarraSuperior)