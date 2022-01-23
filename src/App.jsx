import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import Wrong from "./components/Wrong";
import Word from "./components/Word";

const App = () => {
	const words = ["application", "interface", "programming", "wizard"];
	// https://random-word-api.herokuapp.com/all
	const [selectedWord, setSelectedWord] = useState(
		words[Math.floor(Math.random() * words.length)]
	);
	const [playAble, setPlayAble] = useState(true);
	const [corrects, setCorrects] = useState([]);
	const [wrongs, setWrongs] = useState([]);

	useEffect(() => {
		const handleKeyDown = (event) => {
			const { key, keyCode } = event;
			if (playAble && keyCode >= 65 && keyCode <= 90) {
				const letter = key.toLowerCase();
				if (selectedWord.includes(letter)) {
					if (!corrects.includes(letter)) {
						setCorrects((curr) => [...curr, letter]);
					}
				} else {
					if (!wrongs.includes(letter)) {
						setWrongs((curr) => [...curr, letter]);
					}
				}
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [corrects, wrongs, playAble]);

	return (
		<>
			<Header />
			<div className="game-container">
				<Figure />
				<Wrong wrongLs={wrongs} />
				<Word selectedWord={selectedWord} correctLs={corrects} />
			</div>
		</>
	);
};

export default App;
