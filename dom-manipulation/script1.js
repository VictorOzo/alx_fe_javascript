const quoteInput = document.getElementById('quote');
const authorInput = document.getElementById('author');
const addButton = document.getElementById('addQuote');
const quoteList = document.getElementById('quoteList');

addButton.addEventListener('click', addQuote);

function addQuote() {
	const quote = quoteInput.value.trim();
	const author = authorInput.value.trim();

	if (quote !== '' && author !== '') {
		const newQuote = {
			text: quote,
			author: author,
		};
		const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
		quotes.push(newQuote);
		localStorage.setItem('quotes', JSON.stringify(quotes));
		displayQuotes();
		quoteInput.value = '';
		authorInput.value = '';
	}
}

function displayQuotes() {
	const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
	quoteList.innerHTML = '';

	quotes.forEach((quote, index) => {
		const listItem = document.createElement('li');
		listItem.textContent = `${quote.text} - ${quote.author}`;
		const removeButton = document.createElement('button');
		removeButton.textContent = 'Remove';
		removeButton.addEventListener('click', () => removeQuote(index));
		listItem.appendChild(removeButton);
		quoteList.appendChild(listItem);
	});
}

function removeQuote(index) {
	const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
	quotes.splice(index, 1);
	localStorage.setItem('quotes', JSON.stringify(quotes));
	displayQuotes();
}

displayQuotes(); // Initial display
 