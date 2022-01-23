import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import Wrong from "./components/Wrong";
import Word from "./components/Word";
import Notification from "./components/Notification";
import Popup from "./components/Popup";

const App = () => {
	const [words, setWords] = useState([]);
	const [selectedWord, setSelectedWord] = useState("wizard");
	const [playAble, setPlayAble] = useState(true);
	const [corrects, setCorrects] = useState([]);
	const [wrongs, setWrongs] = useState([]);
	const [showNotification, setShowNotification] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [gameWin, setGameWin] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(`https://random-word-api.herokuapp.com/all`)
			.then((res) => res.json())
			.then((data) => {
				setWords(data);
				setIsLoading(false);
				setSelectedWord(data[Math.floor(Math.random() * words.length)]);
			})
			.catch((err) => console.log(err));
	}, []);
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
					setShowNotification(false);
				} else {
					let flag = true;
					for (let i = 0; i < selectedWord.length; ++i) {
						if (corrects.includes(selectedWord[i])) continue;
						else {
							flag = false;
							break;
						}
					}
					if (flag) {
						setShowPopup(true);
						setGameWin(true);
						setPlayAble(false);
						setShowNotification(false);
					}
				}
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [corrects, wrongs, playAble]);
	const startAgain = () => {
		setCorrects([]);
		setWrongs([]);
		setShowPopup(false);
		setGameWin(false);
		setIsLoading(true);
		setTimeout(() => {
			setSelectedWord(words[Math.floor(Math.random() * words.length)]);
			setIsLoading(false);
			setPlayAble(true);
		}, 2500);
	};

	return (
		<>
			<Header />
			{isLoading ? (
				<>Fetching Data</>
			) : (
				<div className="game-container">
					<Figure wrongLs={wrongs} />
					<Wrong wrongLs={wrongs} />
					<Word selectedWord={selectedWord} correctLs={corrects} />
				</div>
			)}
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
