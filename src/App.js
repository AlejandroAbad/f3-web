import React from 'react';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

// MUI
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// TEMA
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import obtenerTema from 'navegacion/temas';

// REDUX
import { useSelector } from 'react-redux';
import { CargaMaestros } from 'redux/maestros/maestrosSlice';

// SUBCOMPONENTES
import Pantallas from './pantallas/Pantallas';
import BarraSuperior from 'navegacion/superior/BarraSuperior';
import DrawerLateral from 'navegacion/lateral/DrawerLateral';





function App() {

	const [drawerAbierto, setDrawerAbierto] = React.useState(false);
	const fnMostrarDrawerLateral = React.useCallback((flag) => {
		if (flag === undefined) setDrawerAbierto(!drawerAbierto);
		else setDrawerAbierto(flag ? true : false);
	}, [drawerAbierto, setDrawerAbierto]);

	const usuario = useSelector(state => state.token.usuario);
	const tema = useSelector(state => state.pantalla.tema)
	const temita = React.useMemo(() => obtenerTema(tema), [tema]);

	return (
		<ThemeProvider theme={temita}>
			<CargaMaestros />
			<Router>
				<div sx={{ display: 'flex' }}>
					<CssBaseline />
					<ToastContainer position="bottom-left"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick={false}
						rtl={false}
						pauseOnFocusLoss={false}
						draggable
						pauseOnHover
					/>

					{usuario && <DrawerLateral abierto={drawerAbierto} fnCerrar={() => fnMostrarDrawerLateral(false)} fnAbrir={() => fnMostrarDrawerLateral(true)} />}
					<BarraSuperior onMenuLateralClick={fnMostrarDrawerLateral} />

					<Box sx={{ mt: '80px' }}>
						{!usuario ? <Pantallas.Login /> :
							<Routes >
								<Route path="/" element={<Pantallas.Principal />} />
								<Route path="/transmisiones/pedidos/*" element={<Pantallas.Transmisiones.Pedidos />} />
								<Route path="/transmisiones/devoluciones" element={<Pantallas.Transmisiones.Devoluciones />} />
								<Route path="/herramientas/tokens" element={<Pantallas.Herramientas.Tokens />} />
							</Routes >
						}
					</Box>

				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;
