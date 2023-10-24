let deckId = ''

const newDeck = document.getElementById('new-deck')
const cardsContainer = document.getElementById('cards')
const drawCardBtn = document.getElementById('draw-btn')
const result = document.getElementById('result')
const remainingCardsEl = document.getElementById('remaining-cards')

let remainingCards = ''

function handleClick() {
	fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
		.then((res) => res.json())
		.then((data) => {
			deckId = data.deck_id
			const slots = cardsContainer.children
			slots[0].innerHTML = ``
			slots[1].innerHTML = ``

			drawCardBtn.disabled = false
			console.log(drawCardBtn)
			remainingCardsEl.innerText = `Remaining cards: 52`
		})
}

function drawCards() {
	fetch(
		`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
	)
		.then((res) => res.json())
		.then((data) => {
			const slots = cardsContainer.children
			remainingCards = data.remaining
			remainingCardsEl.innerText = `Remaining cards: ${remainingCards}`
			const card1 = data.cards[0]
			const card2 = data.cards[1]
			// console.log(data)
			result.innerText = getWinner(card1, card2)

			slots[0].innerHTML = `
            <img src='${card1.image}' class='card'/>
            `
			slots[1].innerHTML = `
            <img src='${card2.image}' class='card'/>
            `
		})
}

function getWinner(card1, card2) {
	const cardValues = [
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'JACK',
		'QUEEN',
		'KING',
		'ACE',
	]
	const index1 = cardValues.indexOf(card1.value)
	const index2 = cardValues.indexOf(card2.value)
	if (index1 > index2) {
		// console.log('card1 wins!')
		return 'Computer wins!'
	} else if (index2 > index1) {
		// console.log('card2 wins!')
		return 'You win!'
	} else {
		// console.log("It's a tie!")
		return 'War!'
	}
}

newDeck.addEventListener('click', handleClick)
drawCardBtn.addEventListener('click', drawCards)
