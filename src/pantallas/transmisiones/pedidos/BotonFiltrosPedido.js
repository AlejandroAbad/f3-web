import React from 'react';
import clone from 'lodash';

// MUI
import { Container, Typography, IconButton, Button, Dialog, AppBar, Toolbar, Slide } from '@mui/material';

// MUI-ICONS
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

// SUBCOMPONENTES
import FormularioFiltroPedidosEstandard from './formulario/FormularioFiltroPedidosEstandard';
import { useSelector } from 'react-redux';
import { selectFiltro } from 'redux/consultas/pedidosSlice';




const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});


export default function BotonFiltrosPedido() {

	const [dialogoAbierto, setDialogoAbierto] = React.useState(false);
	let filtro = useSelector(selectFiltro);

	const refFiltro = React.useRef(null);

	React.useEffect( () => {
		refFiltro.current = clone(filtro);
	}, [filtro])
	

	const abrirDialogo = () => {
		setDialogoAbierto(true);
	};

	const descartarCambiosYCerrarDialogo = () => {
		setDialogoAbierto(false);
	};

	const aplicarCambiosYCerrarDialogo = () => {
		setDialogoAbierto(false);
	}

	const resetearFormulario = () => {

	}

	return (<>
		<Button variant="outlined" onClick={abrirDialogo} startIcon={<FilterAltIcon />}>
			Filtros
		</Button>

		<Dialog fullScreen open={dialogoAbierto} onClose={descartarCambiosYCerrarDialogo} TransitionComponent={Transition} >
			<AppBar sx={{ position: 'relative' }}>
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

			<Container maxWidth="xl" sx={{ mt: 0, pl: 1, pr: 8, py: 4 }}>
				<FormularioFiltroPedidosEstandard refFiltro={refFiltro} />
			</Container>
		</Dialog>
	</>

	);
}
