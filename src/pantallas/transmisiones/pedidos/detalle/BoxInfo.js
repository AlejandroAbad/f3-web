import { Typography } from "@mui/material";
import { Box } from "@mui/system";


export default function BoxInfo({ titulo, children }) {

	return <Typography component="div" sx={{ pt: 0, my: 1 }}>
		<Typography component="div" variant="caption" sx={{fontSize: '13px'}}>{titulo}</Typography>
		<Box sx={{ ml: 1 }} >
			{children}
		</Box>
	</Typography>

}