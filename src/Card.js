import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
	constructor(props) {
		super(props);

		// Piling cards styles
		const angle = Math.random() * 90 - 45;
		const xPos = Math.random() * 40 - 20;
		const yPos = Math.random() * 40 - 20;
		this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
	}

	render() {
		const { image, suit, value } = this.props;

		return (
			<img
				className="Card"
				src={image}
				alt={`${value} of ${suit}`}
				style={{ transform: this._transform }}
			/>
		);
	}
}

export default Card;
