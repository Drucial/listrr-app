import React from "react";
import MenuToggle from "./MenuToggle"

const Nav = ({ menuState }) => {

	function toggleMenu() {
		menuState.menuOpen === true ? menuState.setMenuOpen(false) : menuState.setMenuOpen(true)
	}

	return (
		<nav>
			<ul className="nav-links">
				<li className="nav-link" >+</li>
				<li className="nav-link" onClick={toggleMenu}><MenuToggle /></li>
			</ul>
		</nav>
	);
};

export default Nav;
