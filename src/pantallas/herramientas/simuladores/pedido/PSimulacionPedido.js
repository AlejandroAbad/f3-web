// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";

// REDUX<ñ
import { usePantalla } from "redux/pantalla/pantallaSlice";

// SUBCOMPONENTES
import PanelEnvio from "./selectores/PanelEnvio";
import SelectorDatosCabecera from "./selectores/SelectorDatosCabecera";
import SelectorLineas from "./selectores/SelectorLineas";
import SelectorTipoSolicitante from "./selectores/SelectorTipoSolicitante";




export default function PantallaSimulacionPedidos() {

	usePantalla('Simulación de pedidos', null);
	let refFormulario = React.useRef({
		dominio: "FEDICOM",
		usuario: "10104999@hefame",
		codigoCliente: "4999",
		lineas: [{ orden: 0, cantidad: 1 }]
	});

	return (
		<Container fixed maxWidth="xl">

			<Grid container spacing={2}>
				<Grid item xs={8}>
					<SelectorTipoSolicitante refFormulario={refFormulario} />
					<SelectorDatosCabecera refFormulario={refFormulario} />
					<SelectorLineas refFormulario={refFormulario} />
				</Grid>
				<Grid item xs={4}>
					<PanelEnvio refFormulario={refFormulario} />
				</Grid>

			</Grid>


		</Container >
	)


}