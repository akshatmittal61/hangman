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
	const [images, setImages] = useState([]);

	const selectWord = () => {
		const newWord = words[Math.floor(Math.random() * words.length)];
		if (newWord.length <= 8) setSelectedWord(newWord);
		else selectWord();
	};

	useEffect(() => {
		fetch(`https://random-word-api.herokuapp.com/all`)
			.then((res) => res.json())
			.then((data) => {
				setWords(data);
				setIsLoading(false);
				selectWord();
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
	useEffect(() => {
		fetch(
			`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${selectedWord}&image_type=photo&pretty=true&page=1&per_page=4`
		)
			.then((res) => res.json())
			.then((data) => {
				setImages(data.hits);
			})
			.catch((err) => console.log(err));
	}, [selectedWord]);
	const startAgain = () => {
		setCorrects([]);
		setWrongs([]);
		setShowPopup(false);
		setGameWin(false);
		setIsLoading(true);
		setTimeout(() => {
			selectWord();
			setIsLoading(false);
			setPlayAble(true);
		}, 2500);
	};

	return (
		<>
			<Header />
			{isLoading ? (
				<div className="loading-container">
					<div className="loading">Getting Data</div>
				</div>
			) : (
				<>
					<div className="game-container">
						<div className="game-panel">
							<Figure wrongLs={wrongs} />
							<Wrong wrongLs={wrongs} />
						</div>
						<div className="game-figure-container">
							{images.map((image) => (
								<div
									className="game-figure"
									style={{
										backgroundImage: `url(${image.largeImageURL})`,
									}}
								></div>
							))}
						</div>
						<Word
							selectedWord={selectedWord}
							correctLs={corrects}
						/>
					</div>
				</>
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
