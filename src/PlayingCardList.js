import React from "react";
import { useAxios } from "./hooks";
import uuid from "uuid";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const [cards, addCard, clearCards] = useAxios(
    "https://deckofcardsapi.com/api/deck/new/draw/"
  );
  //   const addCard = async () => {
  //     const response = await axios.get(
  //       "https://deckofcardsapi.com/api/deck/new/draw/"
  //     );
  //     setCards(cards => [...cards, { ...response.data, id: uuid() }]);
  //   };

  const formatCard = (data) => {
    return { image: data.cards[0].image, id: uuid() };
  };

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={() => addCard(formatCard)}>Add a playing card!</button>
        <button onClick={clearCards}>Remove all playing cards</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map((cardData) => (
          <PlayingCard key={cardData.id} front={cardData.image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
