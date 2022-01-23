import React from "react";

const Wrong = ({ wrongLs }) => {
	return (
		<div className="wrong-letters-container">
			<div className="wrong-letters">
				{wrongLs.length > 0 && <p>Wrong</p>}
				{wrongLs
					.map((letter, index) => <span key={index}>{letter}</span>)
					.reduce(
						(prev, curr) =>
							prev === null ? [curr] : [prev, ", ", curr],
						null
					)}
			</div>
		</div>
	);
};

export default Wrong;
