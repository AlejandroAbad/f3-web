import Paper from "@mui/material/Paper"


export default function BoxFiltro({ modoFiltro, relleno, ...props }) {

	const estiloPaper = {
		m: 0,
		mb: 2,
		p: 4,
		pt: 3,
		bgcolor: modoFiltro ? '' : 'grey.100',
		border: '1px solid',
		borderColor: 'grey.100',
	}

	if (relleno > 0) {
		switch (modoFiltro) {
			case '$nin': estiloPaper.borderColor = 'error.main'; break;
			case '$in': estiloPaper.borderColor = 'primary.main'; break;
			default: break;
		}
	}

	return <Paper elevation={modoFiltro ? 5 : 1} sx={estiloPaper} >
		{props.children}
	</Paper>
}

