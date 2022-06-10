import React from "react";
import ReactJson from "react-json-view";
import { format } from "date-fns";

// MUI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import  Box  from "@mui/material/Box";


const FORMATO = {
	TRC: { color: 'text.disabled' },
	DBG: { color: 'text.secondary' },
	INF: { color: 'text.primary' },
	WRN: { color: 'warning.main' },
	ERR: { color: 'error.main' },
	DIE: { color: 'error.main' },
	EVT: { color: 'primary.main' },
	DMP: { color: 'error.main' }
}


const LineaLogTransmision = ({ lineaLog }) => {

	let fecha = new Date(lineaLog.fecha);
	let color = FORMATO[lineaLog.nivel].color;

	if (isNaN(fecha)) fecha = new Date();

	return <Grid container sx={{ py: 0.7, borderBottom: '1px solid', borderBottomColor: 'grey.300', fontFamily: 'monospace' }}>
		<Grid item xs={1} sx={{ ml: 1 }}>
			<Box>
				<Typography variant="body1" component="span">{format(fecha, 'HH:mm:ss')}</Typography>
				<Typography variant="body2" component="span" >.{format(fecha, 'SSS')}</Typography>
			</Box>
		</Grid>

		<Grid item xs="auto" sx={{ ml: 4, color }}>
			{lineaLog.datos?.map((dato, i) => {
				if (Array.isArray(dato) || (typeof dato === "object" || typeof dato === 'function')) {
					dato = <ReactJson
						collapsed={2}
						src={dato}
						name={false}
						displayObjectSize={false}
						displayDataTypes={false}
						quotesOnKeys={false}
						enableClipboard={false}
						iconStyle="square"
					/>
				}
				return <Box key={i}>{dato}</Box>
			})}
		</Grid>
	</Grid>
}



export default React.memo(LineaLogTransmision);