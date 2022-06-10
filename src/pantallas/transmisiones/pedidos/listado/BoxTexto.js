import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


export default function BoxTexto({ titulo, children }) {

	return <Typography component="div" sx={{ pt: 0, mb: 1 }}>
		<Typography component="div" variant="caption">{titulo}</Typography>
		<Box sx={{ ml: 1 }} >
			{children}
		</Box>
	</Typography>

}