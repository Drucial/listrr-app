import React, { useRef } from "react";
// import { Transition, animated } from "react-spring";

const TitleInput = () => {
	const inputRef = useRef()

	function validateTitle() {
		const input = inputRef.current
		let inputValue = inputRef.current.value

		if(!inputRef) return;

		if(inputValue === "") {
			input.placeholder = "Please enter a new title"
		} else {
			inputValue = ""
		}
	}
	return (
		<div  className="input-container">
			<input
				ref={inputRef}
				className="list-input"
				id="newListTitle"
				type="text"
				name="list-tile"
				placeholder="Enter list name"
			/>
			<button onClick={validateTitle}>Update</button>
		</div>
	);
};

export default TitleInput;
