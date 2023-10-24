let deckId = ''

const newDeck = document.getElementById('new-deck')
const cardsContainer = document.getElementById('cards')
const drawCardBtn = document.getElementById('draw-btn')

function handleClick() {
	fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
		.then((res) => res.json())
		.then((data) => {
			console.log(data)
			deckId = data.deck_id
			const slots = cardsContainer.children
			slots[0].innerHTML = ``
			slots[1].innerHTML = ``
		})
}

function drawCards() {
	fetch(
		`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
	)
		.then((res) => res.json())
		.then((data) => {
			const slots = cardsContainer.children
			slots[0].innerHTML = `
            <img src='${data.cards[0].image}' class='card'/>
            `
			slots[1].innerHTML = `
            <img src='${data.cards[1].image}' class='card'/>
            `
		})
}

newDeck.addEventListener('click', handleClick)
drawCardBtn.addEventListener('click', drawCards)
