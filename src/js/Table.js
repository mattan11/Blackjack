export class Table {
  constructor(playersCards, dealersCards) {
    this.playersCards = playersCards;
    this.dealersCards = dealersCards;
  }

  showPlayersCard(card) {
    this.playersCards.appendChild(card.render());
  }

  showDealersCard(card) {
    this.dealersCards.appendChild(card.render());
  }
}
