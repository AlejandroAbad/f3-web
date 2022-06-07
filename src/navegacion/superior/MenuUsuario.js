import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';

// ICONOS
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// REDUX
import { useDispatch } from 'react-redux';
import { logout } from 'redux/token/tokenSlice';



export default function MenuUsuario({ elementoAncla, abierto, fnCerrarMenuUsuario, fnAbrirMenuUsuario }) {

	const dispatch = useDispatch();
	
	const fnRealizarLogout = () => {
		dispatch(logout());
		fnCerrarMenuUsuario();
	}
	return <div>
		<IconButton onClick={fnAbrirMenuUsuario} color="inherit" >
			<AccountCircleIcon />
		</IconButton>
		<Menu anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
			transformOrigin={{ vertical: 'top', horizontal: 'right', }}
			keepMounted
			open={abierto}
			anchorEl={elementoAncla}
			onClose={fnCerrarMenuUsuario}
		>
			<MenuItem component={Link} to='/usuario' onClick={fnCerrarMenuUsuario} >
				<ListItemIcon>
					<AccountBoxRoundedIcon fontSize="small" />
				</ListItemIcon>
				Información de usuario
			</MenuItem>
			<MenuItem onClick={fnRealizarLogout}>
				<ListItemIcon>
					<ExitToAppRoundedIcon fontSize="small" />
				</ListItemIcon>
				Cerrar sesión
			</MenuItem>

		</Menu>

	</div>
}
