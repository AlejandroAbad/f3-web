import React from "react";
import { Chip, Grid, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import ReactJson from "react-json-view";
import { cloneDeep } from "lodash";

const ESTADOS_HTTP = {
	'200': 'OK',
	'201': 'Contenido creado',
	'202': 'Aceptado',
	'203': 'Información no autoritativa',
	'204': 'Sin contenido',
	'205': 'Reset Content',
	'206': 'Contenido parcial',
	'300': 'Múltiples opciones',
	'301': 'Movido permanentemente',
	'302': 'Encontrado',
	'303': 'Ver otros ...',
	'304': 'Sin modificaciones',
	'305': 'Usa proxy',
	'306': 'Unused',
	'307': 'Temporary Redirect',
	'400': 'Petición incorrecta',
	'401': 'No autenticado',
	'402': '¡Paga!',
	'403': 'No autorizado',
	'404': 'No encontrado',
	'405': 'Método no permitido',
	'406': 'No aceptable',
	'407': 'Autenticacion en el proxy requerida',
	'408': 'Espera agotada',
	'409': 'Conflicto',
	'410': 'Se fué',
	'411': 'Longitud requerida',
	'412': 'Precondicion requerida',
	'413': 'Request Entry Too Large',
	'414': 'Request-URI Too Long',
	'415': 'Unsupported Media Type',
	'416': 'Requested Range Not Satisfiable',
	'417': 'Expectation Failed',
	'418': '¡Soy una tetera!',
	'429': 'Too Many Requests',
	'500': 'Error interno del servidor',
	'501': 'No implementado',
	'502': 'Error en el Proxy',
	'503': 'Servicio no disponible',
	'504': 'Espera agotada en el Proxy',
	'505': 'Versión de HTTP no soportada',
};

const Metadatos = ({ metadatos }) => {
	if (!metadatos) return null;
	let { servidor, tiempoRespuesta } = metadatos;
	if (!servidor && !tiempoRespuesta) return null;

	let tiempoRespuestaMilis = Math.floor(tiempoRespuesta / 1000);
	let tiempoRespuestaMicros = tiempoRespuesta % 1000

	return <Grid item xs={12} >
		<Stack direction="row" spacing={2} sx={{ my: 0, py: 0 }}>
			{servidor && <ListItem >
				<ListItemText
					primary={<Typography variant='caption' component="div">Servidor SAP</Typography>}
					secondary={<Typography sx={{ ml: 2, fontWeight: 'bold' }} variant="body1">{servidor}</Typography>}
				/>
			</ListItem>}
			{tiempoRespuesta && <ListItem >
				<ListItemText
					primary={<Typography variant='caption' component="div">Tiempo de respuesta</Typography>}
					secondary={<Typography sx={{ ml: 2, fontWeight: 'bold' }} variant="body1">
						{tiempoRespuestaMilis}.
						<Typography component="span" sx={{ color: 'text.secondary', fontSize: '75%' }} variant="body1">{tiempoRespuestaMicros}</Typography> ms
					</Typography>}
				/>
			</ListItem>}
		</Stack>
	</Grid>

}




const VisorJson = (props) => {
	return <ReactJson
		collapsed={1}
		indentWidth={2}
		collapseStringsAfterLength={30}
		groupArraysAfterLength={25}
		enableClipboard={true}
		displayObjectSize={false}
		displayDataTypes={false}
		sortKeys={true}
		quotesOnKeys={false}
		validationMessage={<pre>{props.src}</pre>}
		{...props}
	/>
}

const UrlBase = ({ url }) => {
	if (url.startsWith('/')) url = 'http://dummy' + url;
	url = new URL(url);

	let eleParametros = null;
	let numeroParametros = Array.from(url.searchParams).length;
	if (numeroParametros) {
		eleParametros = <Typography component="span" sx={{ ml: 0.7, color: 'secondary.main', fontStyle: 'italic', fontWeight: 'bold' }}>
			? &lt;{numeroParametros} parámetro{numeroParametros === 1 ? '' : 's'}&gt;
		</Typography>
	}
	return <Typography component="span">{url.pathname}{eleParametros}</Typography>

	// + (searchParams ? '?' + searchParams : '')
	// + (url.hash ? url.hash : '')
}

const ParametrosUrl = ({ url }) => {
	if (url.startsWith('/')) url = 'http://dummy' + url;
	url = new URL(url);

	const parametros = {};

	for (let entry of url.searchParams.entries()) {
		if (!parametros[entry[0]]) {
			parametros[entry[0]] = entry[1];
		} else if (!Array.isArray(parametros[entry[0]])) {
			parametros[entry[0]] = [parametros[entry[0]], entry[1]]
		} else {
			parametros[entry[0]].push(entry[1])
		}
	}

	return <ListItem >
		<VisorJson src={parametros} name="parametros" collapsed={0} />
	</ListItem>
}



const Solicitud = ({ solicitud }) => {
	if (!solicitud) return null;

	// TODO: method es obsoleto
	let { /*fechaEnvio,*/ metodo, method, url, headers, body } = solicitud;
	if (method) metodo = method;

	// Eliminamos información sensible
	let copiaDeHeaders = cloneDeep(headers);
	if (body?.password) body.password = '********';
	if (copiaDeHeaders?.['X-Key']) copiaDeHeaders['X-Key'] = '********';


	return <Grid item xs={6} >
		<List>
			<ListItem >
				<ListItemText
					primary={<>
						<Chip label={metodo} sx={{ mr: 1 }} />
						<UrlBase url={url} />
					</>}
				/>
			</ListItem>
			<ParametrosUrl url={url} />
			<ListItem >
				<VisorJson src={copiaDeHeaders} name="cabeceras" collapsed />
			</ListItem>
			{body && <ListItem >
				<VisorJson src={body} name="cuerpo" />
			</ListItem>}
		</List>
	</Grid >
}


const Respuesta = ({ respuesta }) => {
	if (!respuesta) return null;

	// TODO: codigo es obsoleto
	let { codigo, estado, headers, body, error } = respuesta;
	if (codigo) estado = codigo;

	return <Grid item xs={6} >
		<List>
			<ListItem >
				<ListItemText
					primary={<>
						<Chip label={estado} sx={{ mr: 1 }} />
						<Typography component="span">{ESTADOS_HTTP[estado + '']}</Typography>
					</>}
				/>
			</ListItem>
			<ListItem >
				<VisorJson src={headers} name="cabeceras" collapsed />
			</ListItem>
			{(error || body) && <ListItem >
				<VisorJson src={error || body} name="respuesta" />
			</ListItem>}

		</List>
	</Grid >
}


const BoxTransmisionHttp = ({ solicitud, respuesta, metadatos }) => {


	return <Grid container>

		<Metadatos metadatos={metadatos} />
		<Solicitud solicitud={solicitud} />
		<Respuesta respuesta={respuesta} />

	</Grid>

}


export default React.memo(BoxTransmisionHttp);