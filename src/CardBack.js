import React, { Component } from "react";
import cardBack from "./card-back.png";
import "./CardBack.css";

class CardBack extends Component {
	render() {
		return (
			<img
				className="CardBack"
				src={cardBack}
				alt="Back of a Card"
				style={{ right: this.props.right }}
			/>
		);
	}
}

export default CardBack;
