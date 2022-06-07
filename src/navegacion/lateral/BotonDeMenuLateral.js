import React from 'react';

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Link } from "react-router-dom";
import { Typography } from '@mui/material';



export default function BotonDeMenuLateral({ texto, icono, link, onClick, subMenu, esTitulo, fnCerrarDrawer }) {

	const [menuAbierto, setMenuAbierto] = React.useState(false);

	const cambiaEstadoMenu = React.useCallback(() => {
		if (!subMenu) return;
		setMenuAbierto(!menuAbierto);
	}, [subMenu, menuAbierto, setMenuAbierto])

	if (esTitulo) {
		return <ListSubheader disableSticky sx={{ bgcolor: 'grey.50' }}>
			<Typography variant="overline" sx={{ pb: 0, mb: 0, color: 'grey.900' }}>
				{texto}
			</Typography>
		</ListSubheader>
	}


	let propiedades = {};

	if (link && !subMenu) {
		propiedades.component = Link;
		propiedades.to = link;
	}

	let elementoSubMenu = null;
	if (subMenu) {
		if (onClick) {
			propiedades.onClick = () => {
				cambiaEstadoMenu();
				onClick();
			}
		}
		else {
			propiedades.onClick = cambiaEstadoMenu;
		}

		elementoSubMenu = <Collapse in={menuAbierto} timeout="auto" unmountOnExit>
			<Box paddingLeft={3}>
				{subMenu.map((propiedadesSubMenu, i) => <BotonDeMenuLateral key={i} fnCerrarDrawer={fnCerrarDrawer} {...propiedadesSubMenu} />)}
			</Box>
		</Collapse>

	} else {
		if (onClick) {
			propiedades.onClick = () => {
				onClick()
				fnCerrarDrawer();
			}
		} else {
			propiedades.onClick = () => {
				fnCerrarDrawer();
			}
		}
	}

	return (
		<Box>
			<ListItem button {...propiedades} >
				<ListItemIcon key={`drawer-boton-${texto}`} sx={{ minWidth: 0, px: 1.5 }}>
					<Icon component={icono} fontSize="small" />
				</ListItemIcon>
				<ListItemText primary={texto} />
				{subMenu && (menuAbierto ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
			</ListItem>
			{elementoSubMenu}
		</Box>
	)
}
