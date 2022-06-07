import { createTheme } from '@mui/material/styles';

export const TEMAS = {
	default: createTheme({
		type: 'dark',
		palette: {
			barraSuperior: {
				main: '#3f51b5',
				contrastText: '#fafafa'
			},
			primary: {
				main: '#3f51b5'
			},
			secondary: {
				main: '#b14974'
			}
		}
	}),
	pedidos: createTheme({
		palette: {
			barraSuperior: {
				main: '#006F3E',
				contrastText: '#fafafa'
			},
			primary: {
				main: '#3f51b5'
			},
			secondary: {
				main: '#b14974'
			}
		}
	}),
	transmisiones: createTheme({
		palette: {
			barraSuperior: {
				main: '#ffab00',
			},
			primary: {
				main: '#3f51b5'
			},
			secondary: {
				main: '#b14974'
			}
		}
	})
	,
}


export default function obtenerTema(nombreTema) {
	if (TEMAS[nombreTema]) return TEMAS[nombreTema];
	return TEMAS.default;

}