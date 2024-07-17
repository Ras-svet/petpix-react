import React from "react";
import LogoBig from "../image/logoBig.svg";
import AddPhoto from "../image/addPhoto.svg";
import AvatarDefault from "../image/avatar/small/avatar1.jpg";
import {Link, useNavigate} from 'react-router-dom';
import ProdileEditImg from "../image/profile_edit.svg";
import { ImageCardContext } from "../contexts/ImageCardContext";

function Header(props) {
	const {imageCard, setImageCard} = React.useContext(ImageCardContext);
	const [imagePreview, setImagePreview] = React.useState(null);
	const navigate = useNavigate();
	

	function handleChageImage(evt) {
		setImageCard(evt.target.files[0])
		console.log(evt.target.files[0].name)
		// const file = evt.target.files[0];
		// const reader = new FileReader();
		// reader.readAsText(file);

		// reader.onload = function(evt) {
		// 	// The file's text will be printed here, if you want to see the base64
		// 	console.log(evt.target.result)
		// 	// Set state with base64 data
		// 	setImagePreview(reader.result)
		// };
		navigate("/add-card")
	}

	return (
		<div className="header" id="header">
			<Link to="/all-users"><img className="header__logo logo__big" src={LogoBig} alt="лого" /></Link>
			<div className="header__actions">
					<div className={props.profile === 'false' ? 'header__action-profile' : 'header__action-add'} >
							<input type="file" id="add__photo" onChange={handleChageImage} />
							<label htmlFor="add__photo">
								<img src={AddPhoto} alt="аватар" />
							</label>
					</div>
					{/* <img className="header__avatar" src={imagePreview} alt="avatar" /> */}
					{props.profile === 'false' ? <Link to="/profile"><img className="header__avatar" src={props.user.avatar? `http://localhost:8000/${props.user.avatar}` : AvatarDefault} alt="avatar" /></Link> : <Link to="/edit"><img className="header__action-edit" src={ProdileEditImg} alt="настройки" /></Link>}
			</div>
		</div>
	)
	
	
}

export default Header;