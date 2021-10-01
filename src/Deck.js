import React, { Component } from "react";
import Card from "./Card.js";
import CardBack from "./CardBack.js";
import "./Deck.css";

class Deck extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deck: null,
			flippedCards: [],
			remaining: 52,
			isDepleted: false,
		};
		this.fetchDeck = this.fetchDeck.bind(this);
		this.fetchCard = this.fetchCard.bind(this);
		this.shuffleNewDeck = this.shuffleNewDeck.bind(this);
	}

	fetchDeck = async () => {
		try {
			const res = await fetch(
				"https://deckofcardsapi.com/api/deck/new/shuffle"
			);
			const data = await res.json();
			this.setState({
				deck: data,
				flippedCards: [],
				remaining: 52,
				isDepleted: false,
			});
		} catch (err) {
			console.log(err);
		}
	};

	fetchCard = async () => {
		try {
			const res = await fetch(
				`https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/`
			);
			const data = await res.json();

			if (this.state.remaining === 1) {
				this.setState({
					isDepleted: true,
				});
			}

			if (!data.success) {
				throw new Error("No cards remaining");
			} else {
				const card = data.cards[0];
				this.setState((prevState) => ({
					flippedCards: [...prevState.flippedCards, card],
					remaining: data.remaining,
				}));
			}
		} catch (err) {
			console.log(err);
		}
	};

	shuffleNewDeck() {
		this.fetchDeck();
	}

	componentDidMount() {
		this.fetchDeck();
	}

	render() {
		// Flipped Cards
		const flippedCards = this.state.flippedCards.map((c) => (
			<Card key={c.code} image={c.image} suit={c.suit} value={c.value} />
		));

		// Button Display
		let buttonDisplay;
		if (this.state.isDepleted) {
			buttonDisplay = (
				<button
					className="Deck__new-deck-btn"
					type="button"
					onClick={this.shuffleNewDeck}
				>
					Shuffle New Deck
				</button>
			);
		} else {
			buttonDisplay = (
				<button
					className="Deck__flip-card-btn"
					type="button"
					onClick={this.fetchCard}
				>
					Flip a Card
				</button>
			);
		}

		// Remaining Cards
		let remainingCards = [];
		let right = 0;
		for (let i = 0; i < this.state.remaining; i++) {
			right += 3;
			remainingCards.push(<CardBack key={right} right={right} />);
		}

		return (
			<div className="Deck">
				<div className="Deck__display-container">
					<div className="Deck__btn-container">{buttonDisplay}</div>
					<div className="Deck__card-back-container">{remainingCards}</div>
				</div>

				<div className="Deck__cards-container">{flippedCards}</div>
			</div>
		);
	}
}

export default Deck;
