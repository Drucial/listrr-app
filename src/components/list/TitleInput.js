import React, { useRef, useContext } from "react";
import UserContext from '../../services/user-context'
import { Transition, animated } from "react-spring";

const TitleInput = ({ showTitleInput, setShowTitleInput }) => {
	const { user, currentList, setCurrentList } = useContext(UserContext)
	const inputRef = useRef()

	// Needs Enter Key Listener

	function validateTitle() {
		const input = inputRef.current
		let inputValue = inputRef.current.value
		let titleArr =[]

		for(let list of user.user_lists){
			titleArr.push(list.title.toLowerCase())
		}

		if(!inputRef){
			return;
		} else if(inputValue === "") {
			input.placeholder = "Please enter a new title"
		} else if(titleArr.includes(inputValue.toLowerCase())){
			input.placeholder = "You already have a list with that title!"
			inputRef.current.value = ""
		} else {
			setCurrentList({...currentList, title: inputValue})
			input.placeholder = "Enter list name"
			inputRef.current.value = ""
			setShowTitleInput(false)
		}
	}
	
	return (
		<Transition
        items={showTitleInput}
        from={{ 
          opacity: 0,
          height: 0,
					marginBottom: 0,
          overflow: 'hidden',
        }}
        enter={{ 
          opacity: 1,
          height: 52,
					marginBottom: 16,
        }}
        leave={{ 
          opacity: 0,
          height: 0,
					marginBottom: 0,
          overflow: 'hidden',
        }}
        reverse={showTitleInput}
        delay={200}
        >
        {(styles, item) =>
          item && 
          <animated.div  style={styles} className="input-container">
						<input
							ref={inputRef}
							className="list-input"
							id="newListTitle"
							type="text"
							name="list-tile"
							placeholder="Enter list name"
						/>
						<button onClick={validateTitle}>Update</button>
					</animated.div>
        }
      </Transition>
	);
};

export default TitleInput;
