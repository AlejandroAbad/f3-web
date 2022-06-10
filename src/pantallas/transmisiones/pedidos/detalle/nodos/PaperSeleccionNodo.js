import React from "react";

// MUI
import { Chip, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Paper, Typography } from "@mui/material";

// MUI-ICONS
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// REDUX
import { useSelector } from "react-redux";
import { selectPedido } from "redux/consultas/pedidosSlice";
import { selectMaestroEstados } from "redux/maestros/maestrosSlice";



const PaperSeleccionNodo = ({ idNodoSeleccionado, setIdNodoSeleccionado }) => {

	let pedido = useSelector(selectPedido);
	let maestroEstados  = useSelector(selectMaestroEstados);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	if (!idNodoSeleccionado) return;


	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, idNodo) => {
		setIdNodoSeleccionado(idNodo);
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	let opcionesMenu = pedido.nodos.map((nodo, i) => {

		let infoEstado = maestroEstados.porId(nodo.estado) || { color: 'primary', nombre: nodo.estado };
		let iconoPrevio = null;
		if (nodo.es.vigente) {
			iconoPrevio = <Typography component="span" sx={{ mr: 1 }}>★</Typography>
		} else if (nodo.es.informado) {
			iconoPrevio = <Typography component="span" sx={{ mr: 1 }}>☄</Typography>
		}

		return <MenuItem key={nodo.id} selected={nodo.id === idNodoSeleccionado} onClick={(event) => handleMenuItemClick(event, nodo.id)} sx={{ px: 4, py: 2 }} >
			<Typography variant="caption">{nodo.id.toUpperCase()}</Typography>
			<Chip sx={{ mx: 2, px: 1 }} size="small" color={infoEstado.color} label={<>{iconoPrevio}{infoEstado.nombre}</>} />
			<Typography variant="body2">{nodo.fechaCreacion}</Typography>
		</MenuItem>
	});

	let nodoSeleccionado = pedido.nodos.find(n => n.id === idNodoSeleccionado);
	let infoEstado = maestroEstados.porId(nodoSeleccionado.estado) || { color: 'primary', nombre: nodoSeleccionado.estado };
	let iconoPrevio = null;
	if (nodoSeleccionado.es.vigente) {
		iconoPrevio = <Typography component="span" sx={{ mr: 1 }}>★</Typography>
	} else if (nodoSeleccionado.es.informado) {
		iconoPrevio = <Typography component="span" sx={{ mr: 1 }}>☄</Typography>
	}

	let hayMultiplesOpciones = opcionesMenu.length > 1;

	return <Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2 }} >

		<Typography variant='h5' component="h2" sx={{ mb: 0 }} >
			{hayMultiplesOpciones ? 'Seleccione transmisión' : 'Transmisión'}
		</Typography>

		<List component={Paper} elevation={hayMultiplesOpciones ? 10 : 0} sx={{ m: 0, my: 2, p: 0 }} >
			<ListItem button={hayMultiplesOpciones} onClick={hayMultiplesOpciones ? handleClickListItem : null} >
				<ListItemText
					primary={<Typography variant='h6' component="div">{nodoSeleccionado.id.toUpperCase()}</Typography>}
					secondary={<Typography variant="body2">{nodoSeleccionado.fechaCreacion}</Typography>}
				/>
				<ListItemAvatar>
					<Chip sx={{ px: 1 }} color={infoEstado.color} label={<>{iconoPrevio}{infoEstado.nombre}</>} />
				</ListItemAvatar>
				{hayMultiplesOpciones && <ListItemAvatar>
					<ExpandMoreIcon sx={{ mx: 4, mt: 1 }} />
				</ListItemAvatar>}
			</ListItem>

		</List>
		{hayMultiplesOpciones &&
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{ style: { maxHeight: 48 * 4.5 } }}	>
				{opcionesMenu}
			</Menu>
		}


	</Paper>

}



export default React.memo(PaperSeleccionNodo);