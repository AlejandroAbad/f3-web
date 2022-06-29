import React from "react";
import { FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";


const DOMINIOS = [
	{ id: "FEDICOM", texto: "Pedido de farmacia", usuarioFijo: false, placeholder: "Usuario", helper: "Usuario de la YVCLIENTES_FEDI (p.e. 10104999@hefame)" },
	{ id: "transfer_laboratorio", texto: "Transfer de laboratorio", usuarioFijo: false, placeholder: "Código de laboratorio", helper: "Usuario de la YVLABORATOR_FEDI (p.e. TR60200561)" },
	{ id: "PORTAL_HEFAME", texto: "Portal Web hefame", usuarioFijo: "PORTAL_HEFAME" },
	{ id: "FMAS", texto: "Portal F+Online", usuarioFijo: "FMAS" },
	{ id: "empleado", texto: "Vale de empleado", usuarioFijo: "empleado" },
]

export default function SelectorTipoSolicitante({ refFormulario }) {

	let dominioPorDefecto = DOMINIOS.find(d => d.id === refFormulario.current.dominio);
	let usuarioPorDefecto = refFormulario.current.usuario;
	const [dominio, _setDominio] = React.useState(dominioPorDefecto);
	const [usuario, _setUsuario] = React.useState(usuarioPorDefecto);

	const setDominio = (idDominio) => {
		let nuevoDominio = DOMINIOS.find(d => d.id === idDominio);
		
		refFormulario.current.dominio = nuevoDominio.id;
		if (nuevoDominio.usuarioFijo) refFormulario.current.usuario = nuevoDominio.usuarioFijo;
		else refFormulario.current.usuario = usuario;
		_setDominio(nuevoDominio);
	}

	const setUsuario = (usuario) => {
		refFormulario.current.usuario = usuario;
		_setUsuario(usuario);
	}






	return <Paper elevation={3} sx={{ p: 3 }}>
		<Typography variant='h6' component="h2" sx={{ mb: 2 }}>Solicitante del pedido</Typography>
		<FormControl sx={{ width: '30ch' }}>
			<InputLabel>Tipo de solicitante</InputLabel>
			<Select label="Tipo de solicitante" value={dominio?.id} onChange={e => setDominio(e.target.value)}>
				{DOMINIOS.map((d, i) => <MenuItem key={i} value={d.id}>{d.texto}</MenuItem>)}
			</Select>
		</FormControl>
		{!dominio.usuarioFijo && (
			<TextField
				sx={{ ml: 2, width: '50ch' }}
				label={dominio.placeholder}
				variant="outlined"
				helperText={dominio.helper}
				value={usuario}
				onChange={e => setUsuario(e.target.value)}
			/>
		)}
	</Paper>
}