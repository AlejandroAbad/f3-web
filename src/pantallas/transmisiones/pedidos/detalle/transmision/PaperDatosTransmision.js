// MUI
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// REDUX
import { useSelector } from "react-redux";
import { selectPedido } from "redux/consultas/pedidosSlice";

// SUBCOMPONENTES
import InfoAutenticacion from "./InfoAutenticacion";
import InfoBalanceador from "./InfoBalanceador";
import InfoIp from "./InfoIp";
import InfoProgramaFarmacia from "./InfoPrograma";
import InfoSSL from "./InfoSSL";


const PaperDatosTransmision = () => {

	let pedido = useSelector(selectPedido);
	let metadatosConexion = pedido.datosConexion;

	return <Paper elevation={10} sx={{ px: 4, pt: 4, pb: 2 }}>
		<Typography variant='h5' component="h2">Datos de la transmisión</Typography>
		<InfoIp ip={metadatosConexion.ip} />
		<InfoAutenticacion autenticacion={metadatosConexion.autenticacion} />
		<InfoProgramaFarmacia idPrograma={metadatosConexion.programa} />
		<InfoSSL ssl={metadatosConexion.ssl} />
		<InfoBalanceador balanceador={metadatosConexion.balanceador} concentrador={metadatosConexion.concentrador} />
	</Paper>

}

export default PaperDatosTransmision;