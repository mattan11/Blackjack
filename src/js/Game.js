import {Deck} from './Deck';
import {Player} from './Player';
import {Table} from './Table';

class Game {
  constructor({player, table, hitButton, standButton}) {
    this.hitButton = hitButton;
    this.standButton = standButton;
    this.player = player;
    this.dealer = new Player('Krupier');
    this.table = table;
    this.deck = new Deck();
    this.deck.shuffle();
  }

  run() {
    this.hitButton.addEventListener('click', (event) => this.hitCard());
    this.dealCards();
  }

  hitCard() {
    const card = this.deck.pickOne();
    this.player.hand.addCard(card);
    this.table.showPlayersCard(card);
  }

  dealCards() {
    for (let i = 0; i < 2; i++) {
      const cardForPlayer = this.deck.pickOne();
      this.player.hand.addCard(cardForPlayer);
      this.table.showPlayersCard(cardForPlayer);

      const cardForDealer = this.deck.pickOne();
      this.player.hand.addCard(cardForDealer);
      this.table.showDealersCard(cardForDealer);
    }
  }
}

const table = new Table(
  document.getElementById('playersCards'),
  document.getElementById('dealersCards')
);
const player = new Player('Marek');
const game = new Game({
  hitButton: document.getElementById('hit'),
  standButton: document.getElementById('stand'),
  player,
  table,
});
game.run();
