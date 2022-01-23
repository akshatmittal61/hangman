import React from "react";

const Word = ({ selectedWord, correctLs }) => {
	return (
		<div className="word">
			{selectedWord.split("").map((letter, index) => (
				<span className="letter" key={index}>
					{correctLs.includes(letter) ? letter : ""}
				</span>
			))}
		</div>
	);
};

export default Word;
