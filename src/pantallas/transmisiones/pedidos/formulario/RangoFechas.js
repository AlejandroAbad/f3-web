import { useState } from "react";
import { Grid, Paper, TextField, Typography } from "@mui/material"


import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";
import LocalizationProvider from '@mui/lab/LocalizationProvider';


import { endOfDay, startOfDay } from "date-fns";
import es from 'date-fns/locale/es';


/*
const generarRangos = () => {

	let date1 = startOfDay(new Date());
	let date2 = endOfDay(new Date());


	return [
		{
			label: 'Hoy',
			startDate: date1,
			endDate: date2,
		},
		{
			label: 'Ayer',
			startDate: addDays(date1, -1),
			endDate: addDays(date2, -1),
		},
		{
			label: 'Esta semana',
			startDate: startOfWeek(date1),
			endDate: endOfWeek(date2),
		},
		{
			label: 'Últimos 7 días',
			startDate: addWeeks(date1, -1),
			endDate: date2,
		},
		{
			label: 'Semana pasada',
			startDate: startOfWeek(addWeeks(date1, -1)),
			endDate: endOfWeek(addWeeks(date2, -1)),
		},
		{
			label: 'Este mes',
			startDate: startOfMonth(date1),
			endDate: endOfMonth(date2),
		},
		{
			label: 'Últimos 30 días',
			startDate: addMonths(date1, -1),
			endDate: date2,
		},
		{
			label: 'Mes pasado',
			startDate: startOfMonth(addMonths(date1, -1)),
			endDate: endOfMonth(addMonths(date2, -1)),
		},
	];

}
*/


export const RangoFechas = ({ refFiltro }) => {

	const fechaInicio = refFiltro.current.fechaCreacion?.['$gte'] || new Date();
	const fechaFin = refFiltro.current.fechaCreacion?.['$lte'] || new Date();
	const [fechas, _setFechas] = useState([fechaInicio, fechaFin]);

	const cambiaFechas = (fechasNuevas) => {
		refFiltro.current.fechaCreacion = {
			'$gte': startOfDay(fechasNuevas[0]),
			'$lte': endOfDay(fechasNuevas[1])
		}
		_setFechas(fechasNuevas);
	}

	return <Paper elevation={5} sx={{ p: 4, pt: 2, m: 0, mb: 2 }} >

		<Typography sx={{ mb: 2 }} component="div" variant="h6">
			Filtrar entre fechas
		</Typography>

		<LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
			<DesktopDateRangePicker
				inputFormat="dd MMMM yyyy"
				disableMaskedInput
				reduceAnimations
				allowSameDateSelection
				disableHighlightToday
				showTodayButton
				disableFuture
				startText="Desde"
				endText="Hasta"
				value={fechas}
				onChange={cambiaFechas}
				renderInput={(startProps, endProps) => (
					<Grid container spacing={4}>
						<Grid item xs={12} sm={6}>
							<TextField readOnly fullWidth {...startProps} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField readOnly fullWidth {...endProps} />
						</Grid>
					</Grid>
				)}
			/>
		</LocalizationProvider>


	</Paper>


}


export default RangoFechas;