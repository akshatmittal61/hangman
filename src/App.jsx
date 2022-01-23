import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import Wrong from "./components/Wrong";
import Word from "./components/Word";
import Notification from "./components/Notification";
import Popup from "./components/Popup";

const App = () => {
	const words = ["application", "interface", "programming", "wizard"];
	// https://random-word-api.herokuapp.com/all
	const [selectedWord, setSelectedWord] = useState(
		words[Math.floor(Math.random() * words.length)]
	);
	const [playAble, setPlayAble] = useState(true);
	const [corrects, setCorrects] = useState([]);
	const [wrongs, setWrongs] = useState([]);
	const [showNotification, setShowNotification] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [gameWin, setGameWin] = useState(false);

	useEffect(() => {
		const handleKeyDown = (event) => {
			const { key, keyCode } = event;
			if (playAble && keyCode >= 65 && keyCode <= 90) {
				const letter = key.toLowerCase();
				if (corrects.includes(letter) || wrongs.includes(letter)) {
					setShowNotification(true);
					setTimeout(() => {
						setShowNotification(false);
					}, 2000);
				} else {
					if (selectedWord.includes(letter))
						setCorrects((curr) => [...curr, letter]);
					else setWrongs((curr) => [...curr, letter]);
				}
				if (wrongs.length === 6) {
					setPlayAble(false);
					setShowPopup(true);
					setGameWin(false);
				}
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [corrects, wrongs, playAble]);
	const startAgain = () => {
		setCorrects([]);
		setWrongs([]);
		setSelectedWord(words[Math.floor(Math.random() * words.length)]);
		setShowPopup(false);
		setGameWin(false);
		setPlayAble(true);
	};

	return (
		<>
			<Header />
			<div className="game-container">
				<Figure wrongLs={wrongs} />
				<Wrong wrongLs={wrongs} />
				<Word selectedWord={selectedWord} correctLs={corrects} />
			</div>
			{showPopup && (
				<Popup
					win={gameWin}
					word={selectedWord}
					playAgain={startAgain}
				/>
			)}
			{showNotification && <Notification />}
		</>
	);
};

export default App;
