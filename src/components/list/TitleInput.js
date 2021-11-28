import React, { useRef, useContext, useEffect } from "react";
import UserContext from '../../services/user-context';
import { Transition, animated } from "react-spring";

const TitleInput = ({ showTitleInput, setShowTitleInput }) => {
	const { currentUser, currentList, setCurrentList } = useContext(UserContext)
	const titleInputRef = useRef()
	
	// Enter Keydown Handler for Input Field
	useEffect(() => {
		if(!titleInputRef.current) return
		let input = titleInputRef.current

    input.addEventListener('keydown', handleKeyDown)

    return function cleanupListener() {
      input.removeEventListener('keydown', handleKeyDown)
    }
  })

	function handleKeyDown(e) {
		if (e.code === 'Enter') {
			validateTitle()
		}
	}

	// Input Validation
	function validateTitle() {
		const input = titleInputRef.current
		let inputValue = titleInputRef.current.value
		let titleArr = []
		

		if(currentUser && currentUser.user_lists.length > 0) {
		for(let list of currentUser.user_lists){
			titleArr.push(list.title.toLowerCase())
		}}

		if(inputValue === "") {
			input.placeholder = "Please enter a new title"
		} else if(titleArr.includes(inputValue.toLowerCase())){
			input.placeholder = "You already have a list with that title!"
			titleInputRef.current.value = ""
		} else {
			setTitle()
		}
	}

	const setTitle = () => {
		let date = new Date().toISOString()
		let title = titleInputRef.current.value
		setCurrentList({...currentList, title: title, date_updated: date, })

		titleInputRef.current.placeholder = "Enter list name"
		titleInputRef.current.value = ""
		setShowTitleInput(false)
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
          height: 75,
					marginBottom: 0,
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
          <animated.div  style={styles} className="list-menu">
						<div className="input-container" id="newListTitle">
							<input
								ref={titleInputRef}
								className="list-input"
								type="text"
								name="list-tile"
								placeholder="Enter list name"
							/>
							<button onClick={validateTitle}>Update</button>
						</div>
					</animated.div>
        }
      </Transition>
	);
};

export default TitleInput;
