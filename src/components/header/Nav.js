import React, { useContext } from "react";
import UserContext from '../../services/user-context'
import MenuToggle from "./MenuToggle"

const Nav = ({ menuState }) => {
	const { createNewList } = useContext(UserContext)

	function toggleMenu() {
		menuState.menuOpen === true ? menuState.setMenuOpen(false) : menuState.setMenuOpen(true)
	}

	return (
		<nav>
			<ul className="nav-links">
				<li className="nav-link" onClick={createNewList}>+</li>
				<li className="nav-link" onClick={toggleMenu}>
					<MenuToggle menuState={menuState}/>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
