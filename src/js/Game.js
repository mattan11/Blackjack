import {Deck} from './Deck';
import {Player} from './Player';
import {Table} from './Table';
import {Message} from './Message';

class Game {
  constructor({
    player,
    table,
    hitButton,
    standButton,
    playerPoints,
    dealerPoints,
    messageBox,
  }) {
    this.hitButton = hitButton;
    this.standButton = standButton;
    this.playerPoints = playerPoints;
    this.dealerPoints = dealerPoints;
    this.player = player;
    this.dealer = new Player('Krupier');
    this.table = table;
    this.messageBox = messageBox;
    this.deck = new Deck();
    this.deck.shuffle();
  }

  run() {
    this.hitButton.addEventListener('click', (event) => this.hitCard());
    this.standButton.addEventListener('click', (event) => this.dealerPlays());
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

    this.endGame();
  }

  endGame() {
    this.hitButton.removeEventListener('click', (event) => this.hitCard());
    this.standButton.removeEventListener('click', (event) =>
      this.dealerPlays()
    );

    this.hitButton.style.display = 'none';
    this.standButton.style.display = 'none';

    if (this.player.points < 21 && this.player.points === this.dealer.points) {
      this.messageBox.setText('dealer wygrywa').show();
      return;
    }

    if (this.player.points > 21) {
      this.messageBox.setText('dealer wygrywa').show();

      return;
    }

    if (this.dealer.points > 21) {
      this.messageBox.setText('gracz wygrywa').show();

      return;
    }

    if (this.player.points < this.dealer.points) {
      this.messageBox.setText('dealer wygrywa').show();
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
const messageBox = new Message(document.getElementById('message'));
const player = new Player('Marek');
const game = new Game({
  hitButton: document.getElementById('hit'),
  standButton: document.getElementById('stand'),
  playerPoints: document.getElementById('playerPoints'),
  dealerPoints: document.getElementById('dealerPoints'),
  player,
  table,
  messageBox,
});
game.run();
