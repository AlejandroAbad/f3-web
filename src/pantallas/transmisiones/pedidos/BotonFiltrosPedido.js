import React from 'react';

// UTILIDADES
import { EJSON } from 'bson';
import _ from 'lodash';

// MUI
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';

// MUI-ICONS
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { consultarPedidos, selectFiltro, setFiltro } from 'redux/consultas/pedidosSlice';

// SUBCOMPONENTES
import FormularioFiltroPedidosEstandard from './formulario/FormularioFiltroPedidosEstandard';




const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});


export default function BotonFiltrosPedido() {

	const dispatch = useDispatch();
	const [dialogoAbierto, setDialogoAbierto] = React.useState(false);
	let filtro = useSelector(selectFiltro);

	const refFiltro = React.useRef(null);

	const abrirDialogo = () => {
		refFiltro.current = _.cloneDeep(filtro);
		setDialogoAbierto(true);
	};

	const descartarCambiosYCerrarDialogo = () => {
		refFiltro.current = _.cloneDeep(filtro);
		setDialogoAbierto(false);
	};

	const aplicarCambiosYCerrarDialogo = () => {
		dispatch(setFiltro(EJSON.serialize(refFiltro.current)));
		dispatch(consultarPedidos());
		setDialogoAbierto(false);
	}

	const resetearFormulario = () => {
		refFiltro.current = _.cloneDeep(filtro);
	}

	return (<>
		<Button variant="outlined" onClick={abrirDialogo} startIcon={<FilterAltIcon />}>
			Filtros
		</Button>

		<Dialog fullScreen open={dialogoAbierto} onClose={descartarCambiosYCerrarDialogo} TransitionComponent={Transition} >
			<AppBar sx={{ position: 'fixed' }}>
				<Toolbar>
					<IconButton edge="start" color="inherit" onClick={descartarCambiosYCerrarDialogo}>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						Filtros de pedido
					</Typography>
					<Button sx={{ mr: 3 }} color="inherit" onClick={resetearFormulario}>
						Resetear
					</Button>
					<Button autoFocus variant="outlined" color="inherit" onClick={aplicarCambiosYCerrarDialogo}>
						Aplicar
					</Button>
				</Toolbar>
			</AppBar>

			<Container maxWidth="xl" sx={{ mt: 6, pl: 1, pr: 8, py: 4 }}>
				<FormularioFiltroPedidosEstandard refFiltro={refFiltro} />
			</Container>
		</Dialog>
	</>

	);
}
