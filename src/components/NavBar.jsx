import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
	const [isActiveFavorites, setIsActiveFavorites] = React.useState(false);
	const [isActiveAllUsers, setIsActiveAllUsers] = React.useState(false);
	const [mode, setMode] = React.useState("mode1")

	React.useEffect(() => {
		if(window.location.href === 'http://localhost:3000/all-users') {
			setIsActiveFavorites(false)
			setMode("mode2")
			setIsActiveAllUsers(true)
			props.getAllUsersCards()
		} else if(window.location.href === 'http://localhost:3000/') {
			setIsActiveFavorites(true)
			setMode("mode1")
			setIsActiveAllUsers(false)
			props.getFavoritesCards()
		}
	}, [window.location.href])

	return (
		<div className="help">
			<div className={`feed__mode ${mode}`}>
					<h3><Link to="" value={isActiveFavorites} className={`feed__title headline2 ${isActiveFavorites ? 'active' : ''}`} >Favorites</Link></h3>
					<h3><Link to="all-users" value={isActiveAllUsers} className={`feed__title headline2 ${isActiveAllUsers ? "active" : ''}`}>All users</Link></h3>
			</div>
		</div>
	)
}

export default NavBar;