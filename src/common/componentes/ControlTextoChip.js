import { useCallback, useState } from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";


export const ControlTextoChip = ({
	valor,
	onChange,
	regexValidacion,
	regexParticionado,
	caracteresDeEscape,
	label,
	placeholder,
	helperText,
	opciones = [],
	opcionesFijas = false,
	...props }) => {

	if (!caracteresDeEscape) caracteresDeEscape = [' ', 'Enter', 'Tab']
	if (!regexParticionado) regexParticionado = /[\s\r\n\t]+/

	let [open, setOpen] = useState(false);

	const enTeclaPresionada = useCallback(event => {
		if (!opcionesFijas && caracteresDeEscape.includes(event.key)) {
			event.preventDefault();
			event.stopPropagation();
			let valorInput = event.target?.value?.trim() || '';
			if (valorInput.length > 0) {
				let valoresNuevos = valorInput.split(regexParticionado).map(valor => valor);
				if (regexValidacion) valoresNuevos = valoresNuevos.filter(valor => regexValidacion.test(valor) )
				
				onChange([...valor, ...valoresNuevos]);
			}
		}
	}, [valor, onChange, regexParticionado, caracteresDeEscape, opcionesFijas, regexValidacion]);

	const enPerdidaDeFoco = useCallback(event => {

		if (!opcionesFijas) {
			let valorInput = event.target?.value?.trim() || '';
			if (valorInput.length > 0) {
				let valoresNuevos = valorInput.split(regexParticionado).map(valor => valor);
				onChange([...valor, ...valoresNuevos]);
			}
		}
		setOpen(false)

	}, [valor, onChange, regexParticionado, setOpen, opcionesFijas]);




	return <Autocomplete
		open={open}
		onOpen={() => setOpen(true)}
		onClose={() => setOpen(false)}
		disableCloseOnSelect
		filterSelectedOptions
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
						{...getTagProps({ index })}
					/>
				}

				let ok = regexValidacion ? regexValidacion.test(option) : true;
				return <Chip
					color={ok ? 'primary' : 'error'}
					label={option}
					variant="outlined"
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