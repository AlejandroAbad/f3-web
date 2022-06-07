import VpnKey from "@mui/icons-material/VpnKey";
import Business from "@mui/icons-material/Business";
import CallSplit from "@mui/icons-material/CallSplit";
import Input from "@mui/icons-material/Input";
import Dashboard from "@mui/icons-material/Dashboard";
import NearMe from "@mui/icons-material/NearMe";
import Speed from "@mui/icons-material/Speed";
import Storage from "@mui/icons-material/Storage";
import Security from "@mui/icons-material/Security";
import AssessmentIcon from '@mui/icons-material/Assessment';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';



const botones = [

	{ texto: "Dashboard", icono: Dashboard, link: '/' },

	{ texto: "transmisiones", esTitulo: true },
	{ texto: "Pedidos", icono: LocalGroceryStoreIcon, link: '/transmisiones/pedidos' },
	{ texto: "Devoluciones", icono: KeyboardReturnIcon, link: '/transmisiones/devoluciones' },
	{ texto: "Logística", icono: LocalShippingIcon, link: '/transmisiones/logistica' },
	{ texto: "Albaranes", icono: ReceiptLongIcon, link: '/transmisiones/consultas' },

	{ texto: "Transmisiones", icono: NearMe, link: '/transmisiones' },




	{ texto: "monitorización", esTitulo: true },
	{ texto: "Base de datos", icono: Storage, link: '/monitor/mongodb' },
	{ texto: "Instancias", icono: Speed, link: '/monitor/instancias' },
	{
		texto: "Balanceo de carga", icono: CallSplit, subMenu: [
			{ texto: "Entrada pedidos", icono: Input, link: '/balanceadores/fedicom3' },
			{ texto: "Servidores SAP", icono: Storage, link: '/balanceadores/sap' },
		]
	},


	{ texto: "Herramientas", esTitulo: true },
	{
		texto: "Simuladores", icono: NearMe, subMenu: [
			{ texto: "Pedidos", icono: LocalGroceryStoreIcon, link: '/' },
			{ texto: "Devoluciones", icono: KeyboardReturnIcon, link: '/' },
			{ texto: "Logística", icono: LocalShippingIcon, link: '/' },
			{ texto: "Albaranes", icono: ReceiptLongIcon, link: '/' },
			{ texto: "Test de stress", icono: Security, link: '/' },
		]
	},
	{
		texto: "Informes", icono: AssessmentIcon, subMenu: [
			{ texto: "Pedidos por almacén", icono: Business, link: '/' },
			{ texto: "Pedidos por servidor SAP", icono: Storage, link: '/' },
		]
	},
	{ texto: "Gestión de tokens", icono: VpnKey, link: '/herramientas/tokens' },
	// { texto: "Visor de tramas Fedicom2", icono: Translate, link: '/utilidades/visorTramasFedicom2' },


]

export default botones;