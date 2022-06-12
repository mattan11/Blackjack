import {Card} from './Card';

const card = new Card('A', 'hearts');

document.getElementById('playersCards').appendChild(card.render());
