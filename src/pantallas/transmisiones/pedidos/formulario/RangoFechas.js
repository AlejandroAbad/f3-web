import './RangoFechas.css';

import React from "react";

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


import { es } from 'react-date-range/dist/locale';
import { addDays, addMonths, addWeeks, endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek } from "date-fns";

import { DateRangePicker } from 'react-date-range';



const generarRangos = () => {

	let date1 = startOfDay(new Date());
	let date2 = endOfDay(new Date());

	return [
		{
			label: 'Hoy',
			range: () => ({
				startDate: date1,
				endDate: date2
			}),
			isSelected: () => false
		},
		{
			label: 'Ayer',
			range: () => ({
				startDate: addDays(date1, -1),
				endDate: addDays(date2, -1)
			}),
			isSelected: () => false
		},
		{
			label: 'Esta semana',
			range: () => ({
				startDate: startOfWeek(date1),
				endDate: endOfWeek(date2)
			}),
			isSelected: () => false
		},
		{
			label: 'Últimos 7 días',
			range: () => ({
				startDate: addWeeks(date1, -1),
				endDate: date2
			}),
			isSelected: () => false
		},
		{
			label: 'Semana pasada',
			range: () => ({
				startDate: startOfWeek(addWeeks(date1, -1)),
				endDate: endOfWeek(addWeeks(date2, -1))
			}),
			isSelected: () => false
		},
		{
			label: 'Este mes',
			range: () => ({
				startDate: startOfMonth(date1),
				endDate: endOfMonth(date2)
			}),
			isSelected: () => false
		},
		{
			label: 'Últimos 30 días',
			range: () => ({
				startDate: addMonths(date1, -1),
				endDate: date2
			}),
			isSelected: () => false
		},
		{
			label: 'Mes pasado',
			range: () => ({
				startDate: startOfMonth(addMonths(date1, -1)),
				endDate: endOfMonth(addMonths(date2, -1))
			}),
			isSelected: () => false
		},
	];

}



export const RangoFechas = ({ refFiltro }) => {

	const fechaInicio = refFiltro.current.fechaCreacion?.['$gte'] || startOfDay(new Date());
	const fechaFin = refFiltro.current.fechaCreacion?.['$lte'] || endOfDay(new Date());

	const [state, setState] = React.useState([
		{
			startDate: fechaInicio,
			endDate: fechaFin,
			key: 'selection'
		}
	]);

	const cambiaFechas = (fechasNuevas) => {

		let inicio = startOfDay(fechasNuevas.selection.startDate);
		let fin = endOfDay(fechasNuevas.selection.endDate);
		refFiltro.current.fechaCreacion = {
			'$gte': inicio,
			'$lte': fin
		}
		setState([fechasNuevas.selection])
	}

	return <Paper elevation={5} sx={{ p: 4, pt: 2, m: 0, mb: 2 }} >

		<Typography sx={{ mb: 2 }} component="div" variant="h6">
			Filtrar entre fechas
		</Typography>

		<DateRangePicker
			maxDate={endOfDay(new Date())}
			weekStartsOn={1}
			dateDisplayFormat={'dd MMMM yyyy'}
			rangeColors={['#3f51b5']}
			locale={es}
			onChange={cambiaFechas}
			showSelectionPreview={true}
			moveRangeOnFirstSelection={false}
			months={1}
			ranges={state}
			direction="horizontal"
			staticRanges={generarRangos()}
			footerContent={<></>}
			inputRanges={[]}
		/>

	</Paper>


}


export default RangoFechas;