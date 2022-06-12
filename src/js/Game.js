import {Deck} from './Deck';
import {Player} from './Player';

class Game {
  constructor({playersCards, dealersCards, player}) {
    this.player = player;
    this.dealer = new Player('Krupier');
    this.playersCards = playersCards;
    this.dealersCards = dealersCards;
    this.deck = new Deck();
    this.deck.shuffle();
  }

  run() {
    this.dealCards();
  }

  dealCards() {
    for (let i = 0; i < 2; i++) {
      const cardForPlayer = this.deck.pickOne();
      this.player.hand.addCard(cardForPlayer);
      this.playersCards.appendChild(cardForPlayer.render());

      const cardForAI = this.deck.pickOne();
      this.player.hand.addCard(cardForAI);
      this.dealersCards.appendChild(cardForAI.render());
    }
  }
}

const player = new Player('Marek');
const game = new Game({
  player,
  playersCards: document.getElementById('playersCards'),
  dealersCards: document.getElementById('dealersCards'),
});
game.run();
