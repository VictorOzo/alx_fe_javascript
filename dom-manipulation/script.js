document.addEventListener('DOMContentLoaded', () => {
	let quotes = JSON.parse(localStorage.getItem('quotes')) || [
		{
			text: 'The best way to predict the future is to invent it.',
			category: 'Innovation',
		},
		{
			text: 'You miss 100% of the shots you don’t take.',
			category: 'Opportunity',
		},
		{
			text: 'The only limit to our realization of tomorrow is our doubts of today.',
			category: 'Motivation',
		},
	];

	// Function to save quotes to local storage
	function saveQuotes() {
		localStorage.setItem('quotes', JSON.stringify(quotes));
	}

	// Function to display a random quote
	function displayRandomQuote() {
		if (quotes.length === 0) {
			document.getElementById('quoteDisplay').innerText =
				'No quotes available.';
			return;
		}

		const randomIndex = Math.floor(Math.random() * quotes.length);
		const quote = quotes[randomIndex];
		document.getElementById(
			'quoteDisplay'
		).innerText = `"${quote.text}" - ${quote.category}`;
	}

	// Function to add a new quote
	function addQuote() {
		const newQuoteText = document.getElementById('newQuoteText').value.trim();
		const newQuoteCategory = document
			.getElementById('newQuoteCategory')
			.value.trim();

		if (newQuoteText === '' || newQuoteCategory === '') {
			alert('Please enter both quote text and category.');
			return;
		}

		quotes.push({ text: newQuoteText, category: newQuoteCategory });
		saveQuotes();
		document.getElementById('newQuoteText').value = '';
		document.getElementById('newQuoteCategory').value = '';
		alert('Quote added successfully!');
	}

	// Function to export quotes as a JSON file
	function exportQuotes() {
		const blob = new Blob([JSON.stringify(quotes, null, 2)], {
			type: 'application/json',
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'quotes.json';
		a.click();
		URL.revokeObjectURL(url);
	}
	// Function to import quotes from a JSON file
	function importFromJsonFile(event) {
		const fileReader = new FileReader();
		fileReader.onload = function (event) {
			try {
				const importedQuotes = JSON.parse(event.target.result);
				if (Array.isArray(importedQuotes)) {
					quotes.length = 0; // Clear existing quotes
					quotes.push(...importedQuotes);
					saveQuotes();
					showRandomQuote();
					alert('Quotes imported successfully!');
				} else {
					alert('Invalid JSON format.');
				}
			} catch (error) {
				alert('Error parsing JSON file.');
			}
		};
		fileReader.readAsText(event.target.files[0]);
	}

	// Event listener for the "Export Quotes" button
	document
		.getElementById('exportQuotes')
		.addEventListener('click', exportQuotes);

	// Event listener for the "Show New Quote" button
	document
		.getElementById('newQuote')
		.addEventListener('click', showRandomQuote);

	// Initial quote display
	displayRandomQuote();
});
