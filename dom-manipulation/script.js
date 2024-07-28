const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteForm = document.getElementById('addQuoteForm');
const addQuoteButton = document.getElementById('addQuoteButton');

let quotes = [
	{
		text: 'The only way to do great work is to love what you do.',
		author: 'Steve Jobs',
		category: 'inspiration',
	},
	// ... more quotes
];

function showRandomQuote() {
	const randomIndex = Math.floor(Math.random() * quotes.length);
	const randomQuote = quotes[randomIndex];
	quoteDisplay.textContent = `${randomQuote.text} - ${randomQuote.author}`;
}

function createAddQuoteForm() {
	addQuoteForm.style.display = 'block';
}

function addQuote() {
	const newQuoteText = document.getElementById('newQuoteText').value;
	const newQuoteCategory = document.getElementById('newQuoteCategory').value;
	const newQuote = { text: newQuoteText, category: newQuoteCategory };
	quotes.push(newQuote);
	// Clear input fields
	document.getElementById('newQuoteText').value = '';
	document.getElementById('newQuoteCategory').value = '';
	// Optionally: display a success message or update the UI to show the new quote
}

newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteButton.addEventListener('click', createAddQuoteForm);
