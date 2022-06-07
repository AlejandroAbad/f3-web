
//import React from "react";
import { usePantalla } from "redux/pantalla/pantallaSlice";






export default function PantallaDevoluciones({ history, location, match }) {

	usePantalla('Devoluciones', 'transmisiones');
	
	return null;

}