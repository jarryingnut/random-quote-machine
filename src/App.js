import React, { useState, useEffect } from 'react';
import randomcolor from 'randomcolor';

function App() {
	//const QUOTES;
	const [ color, setColor ] = useState(randomcolor());
	const [ quote, setQuote ] = useState(null);
	const [ author, setAuthor ] = useState(null);

	useEffect(
		() => {
			fetch(
				'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
			)
				.then((response) => response.json())
				.then((data) => {
					let QUOTES = data.quotes.map((quote) => ({ quote: quote.quote, author: quote.author }));
					let newQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
					setQuote(newQuote.quote);
					setAuthor(newQuote.author);
				});
		},
		[ color ]
	);

	const changeQuote = () => {
		setColor(randomcolor());
	};

	return (
		<div class={'w-screen h-screen flex justify-center items-center flex-row'} style={{ background: color }}>
			<div id={'quote-box'} class={'w-2/3 border px-6 pb-6 bg-white rounded-lg'}>
				<h1 style={{ color: color }} class={'text-6xl'}>
					&#10077;
				</h1>
				<p
					class={'font-normal text-2xl font-sans p-1 text-center leading-tight'}
					id={'text'}
					style={{ color: color }}
				>
					{quote}
				</p>
				<p class={'font-light text-xl font-sans p-1 text-right '} id={'author'} style={{ color: color }}>
					{' '}
					{author}
				</p>
				<button
					id={'new-quote'}
					onClick={changeQuote}
					class={'m-2 text-white font-normal py-1 px-2 rounded'}
					style={{ background: color }}
				>
					New Quote
				</button>
				<a
					class={'m-2 text-white font-normal py-1 px-2 rounded text-lg'}
					id={'tweet-quote'}
					href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`}
					target="blank"
					style={{ background: color }}
				>
					tweet
				</a>
			</div>
		</div>
	);
}

export default App;
