import React from "react";

const Popup = ({ win, word, playAgain }) => {
	return (
		<div className="popup-container">
			<div className="popup">
				<h2 className="final-message">
					{win
						? "Congratulations! You won! 😃"
						: "Unfortunately you lost. 😕"}
				</h2>
				<h3 className="final-message-reveal-word">
					The word was {word}
				</h3>
				<button className="play-btn" onClick={playAgain}>
					Play Again
				</button>
			</div>
		</div>
	);
};

export default Popup;
