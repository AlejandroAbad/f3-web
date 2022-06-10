import React from "react";

// MUI
import { Avatar, Chip, Typography } from "@mui/material";

// MUI-ICONS
import NoEncryptionIcon from "@mui/icons-material/NoEncryption";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

// SUBCOMPONENTES
import BoxInfo from "../BoxInfo";

const InfoSSL = ({ ssl }) => {

	let { protocoloSSL, suiteSSL } = ssl || {};

	if (protocoloSSL === 'no-aplica') {
		return null;
	}

	if (!protocoloSSL) {
		return <BoxInfo titulo="Seguridad:">
			<Chip size="small" avatar={<NoEncryptionIcon />} label="Sin protección" color="error" variant="outlined" />
		</BoxInfo>

	}

	let color = 'success';
	if (!['TLSv1.2', 'TLSv1.3'].includes(protocoloSSL)) {
		color = 'warning'
	}


	return <BoxInfo titulo="Seguridad:">
		<Chip size="small" avatar={<Avatar sx={{ bgcolor: `${color}.contrastText` }}><VerifiedUserIcon sx={{ color: `${color}.main` }} /></Avatar>} label={protocoloSSL} color={color} variant="outlined" />
		<Typography sx={{ ml: 1, fontWeight: 'bold' }} variant='overline' component="div">
			{suiteSSL}
		</Typography>
	</BoxInfo>
}

export default React.memo(InfoSSL);
