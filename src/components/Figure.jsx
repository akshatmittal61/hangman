import React from "react";

const Figure = ({ wrongLs }) => {
	let errs = wrongLs.length;
	return (
		<svg height="250" width="200" className="figure-container">
			<line x1="60" y1="20" x2="140" y2="20" />
			<line x1="140" y1="20" x2="140" y2="50" />
			<line x1="60" y1="20" x2="60" y2="230" />
			<line x1="20" y1="230" x2="100" y2="230" />
			{errs > 0 && <circle cx="140" cy="70" r="20" />}
			{errs > 1 && <line x1="140" y1="90" x2="140" y2="150" />}
			{errs > 2 && <line x1="140" y1="120" x2="120" y2="100" />}
			{errs > 3 && <line x1="140" y1="120" x2="160" y2="100" />}
			{errs > 4 && <line x1="140" y1="150" x2="120" y2="180" />}
			{errs > 5 && <line x1="140" y1="150" x2="160" y2="180" />}
		</svg>
	);
};

export default Figure;
