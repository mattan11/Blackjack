import {Deck} from './Deck';
import {Player} from './Player';
import {Table} from './Table';

class Game {
  constructor({
    player,
    table,
    hitButton,
    standButton,
    playerPoints,
    dealerPoints,
  }) {
    this.hitButton = hitButton;
    this.standButton = standButton;
    this.playerPoints = playerPoints;
    this.dealerPoints = dealerPoints;
    this.player = player;
    this.dealer = new Player('Krupier');
    this.table = table;
    this.deck = new Deck();
    this.deck.shuffle();
  }

  run() {
    this.hitButton.addEventListener('click', () => this.hitCard());
    this.standButton.addEventListener('click', () => this.dealerPlays());
    this.dealCards();
  }

  hitCard() {
    const card = this.deck.pickOne();
    this.player.hand.addCard(card);
    this.table.showPlayersCard(card);
    this.playerPoints.innerHTML = this.player.calculatePoints();
  }

  dealerPlays() {
    while (
      this.dealer.points < this.player.points &&
      this.dealer.points <= 21 &&
      this.player.points <= 21
    ) {
      const card = this.deck.pickOne();
      this.dealer.hand.addCard(card);
      this.table.showDealersCard(card);
      this.dealerPoints.innerHTML = this.dealer.calculatePoints();
    }
  }

  dealCards() {
    for (let i = 0; i < 2; i++) {
      const cardForPlayer = this.deck.pickOne();
      this.player.hand.addCard(cardForPlayer);
      this.table.showPlayersCard(cardForPlayer);

      const cardForDealer = this.deck.pickOne();
      this.dealer.hand.addCard(cardForDealer);
      this.table.showDealersCard(cardForDealer);
    }

    this.playerPoints.innerHTML = this.player.calculatePoints();
    this.dealerPoints.innerHTML = this.dealer.calculatePoints();
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
  playerPoints: document.getElementById('playerPoints'),
  dealerPoints: document.getElementById('dealerPoints'),
  player,
  table,
});
game.run();
