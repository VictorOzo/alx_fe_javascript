document.addEventListener('DOMContentLoaded', () => {
	// Load quotes from local storage or use a default array
	const quotes = JSON.parse(localStorage.getItem('quotes')) || [
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

	// Function to display quotes based on a category filter
	function filterQuotes() {
		const selectedCategory = document.getElementById('categoryFilter').value;
		const filteredQuotes =
			selectedCategory === 'all'
				? quotes
				: quotes.filter((q) => q.category === selectedCategory);

		if (filteredQuotes.length === 0) {
			document.getElementById('quoteDisplay').innerText =
				'No quotes available.';
			return;
		}

		const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
		const quote = filteredQuotes[randomIndex];
		document.getElementById(
			'quoteDisplay'
		).innerText = `"${quote.text}" - ${quote.category}`;
	}

	// Function to populate categories dynamically in the dropdown
	function populateCategories() {
		const categoryFilter = document.getElementById('categoryFilter');
		const categories = new Set(quotes.map((q) => q.category));

		// Add 'All Categories' option
		categoryFilter.innerHTML = '<option value="all">All Categories</option>';

		// Add options for each category
		categories.forEach((category) => {
			const option = document.createElement('option');
			option.value = category;
			option.textContent = category;
			categoryFilter.appendChild(option);
		});

		// Restore last selected category from local storage
		const lastSelectedCategory =
			localStorage.getItem('lastSelectedCategory') || 'all';
		categoryFilter.value = lastSelectedCategory;
		filterQuotes();
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
		populateCategories(); // Update categories dropdown
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
					populateCategories(); // Update categories dropdown
					filterQuotes();
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

	// Function to save the last selected category filter in local storage
	function saveLastSelectedCategory() {
		const selectedCategory = document.getElementById('categoryFilter').value;
		localStorage.setItem('lastSelectedCategory', selectedCategory);
	}

	// Event listeners
	document.getElementById('newQuote').addEventListener('click', filterQuotes);
	document
		.getElementById('exportQuotes')
		.addEventListener('click', exportQuotes);
	document.getElementById('categoryFilter').addEventListener('change', () => {
		filterQuotes();
		saveLastSelectedCategory();
	});

	// Initial quote display
	displayRandomQuote();
	populateCategories();
	filterQuotes();
});
