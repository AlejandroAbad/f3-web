import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";


export const ControlTextoChip = ({
	valor,
	onChange,
	regexValidacion,
	regexParticionado,
	caracteresDeEscape,
	eliminarDuplicados,
	label,
	placeholder,
	helperText,
	opciones = [],
	opcionesFijas = false,
	...props }) => {

	if (!caracteresDeEscape) caracteresDeEscape = [' ', 'Enter', 'Tab']
	if (!regexParticionado) regexParticionado = /[\s\r\n\t]+/

	let [open, setOpen] = React.useState(false);
	let [inputValue, setInputValue] = React.useState('');

	const enTeclaPresionada = React.useCallback(event => {
		if (!opcionesFijas && caracteresDeEscape.includes(event.key)) {
			event.preventDefault();
			event.stopPropagation();
			let valorInput = event.target?.value?.trim() || '';
			if (valorInput.length > 0) {
				let valoresNuevos = valorInput.split(regexParticionado).map(valor => valor);
				if (regexValidacion) valoresNuevos = valoresNuevos.filter(valor => regexValidacion.test(valor))
				let nuevoArray = [...valor, ...valoresNuevos]
				if (eliminarDuplicados) nuevoArray = [...new Set(nuevoArray.map(e => e?.toString()))];
				onChange(nuevoArray);
				setInputValue('');
			}
		}
	}, [valor, onChange, regexParticionado, caracteresDeEscape, opcionesFijas, regexValidacion, eliminarDuplicados]);

	const enPerdidaDeFoco = React.useCallback(event => {

		if (!opcionesFijas) {
			let valorInput = event.target?.value?.trim() || '';
			if (valorInput.length > 0) {
				let valoresNuevos = valorInput.split(regexParticionado).map(valor => valor);
				let nuevoArray = [...valor, ...valoresNuevos]
				if (eliminarDuplicados) nuevoArray = [...new Set(nuevoArray.map(e => e?.toString()))];
				onChange(nuevoArray);
				setInputValue('');
			}
		}
		setOpen(false)

	}, [valor, onChange, regexParticionado, setOpen, opcionesFijas, eliminarDuplicados]);




	return <Autocomplete
		open={open}
		onOpen={() => setOpen(true)}
		onClose={() => setOpen(false)}
		disableCloseOnSelect
		filterSelectedOptions
		inputValue={inputValue}
		onInputChange={(e, valor) => setInputValue(valor)}
		multiple
		freeSolo={!opcionesFijas}
		defaultValue={[]}
		value={valor}
		options={opciones}
		onChange={(_, nuevoValorEscrito) => {
			onChange(nuevoValorEscrito);
		}}
		renderTags={(value, getTagProps) => {
			return value?.map?.((option, index) => {

				if (opcionesFijas) {
					return <Chip
						color='primary'
						label={option}
						variant="outlined"
						onClick={(e) => setInputValue(option)}
						{...getTagProps({ index })}
					/>
				}

				let ok = regexValidacion ? regexValidacion.test(option) : true;
				return <Chip
					color={ok ? 'primary' : 'error'}
					label={option}
					variant="outlined"
					onClick={(e) => setInputValue(option)}
					{...getTagProps({ index })}

				/>
			})
		}}
		renderInput={(params) => {
			params.inputProps.onKeyDown = enTeclaPresionada;
			params.inputProps.onBlur = enPerdidaDeFoco;
			return (
				<TextField
					{...params}
					variant="outlined"
					label={label}
					placeholder={placeholder}
					fullWidth
					helperText={helperText}
				/>
			);
		}}
		{...props}
	/>


}


export default ControlTextoChip;