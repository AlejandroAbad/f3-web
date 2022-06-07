import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { memo } from "react";


const TituloPantalla = ({ titulo, children }) => {


	return <Box sx={{
		width: '100%',
		borderBottom: 'solid 1px #dddddd',
		paddingBottom: 2,
		marginBottom: 4,
		letterSpacing: 0,
		fontWeight: 'bold'
	}}>
		<Typography variant="h5" component="h1"  >
			{titulo || children}
		</Typography>
	</Box>

}


export default memo(TituloPantalla);