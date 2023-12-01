import React from "react";
import avatarDefault from "../image/avatar/big/avatar1.jpg";
import axios from 'axios'

function ProfileEdit(props) {
	const [email, setEmail] = React.useState(props.user.email);
	const [firstName, setFirstName] = React.useState(props.user.firstName);
	const [about, setAbout] = React.useState(props.user.about);
	const [avatar, setAvatar] = React.useState(null);
	const [isEmailValid, setIsEmailValid] = React.useState(false);
	const [isAboutValid, setIsAboutValid] = React.useState(false);
	const [isFirstNameValid, setIsFirstNameValid] = React.useState(false);
	const [isAvatarValid, setIsAvatarValid] = React.useState(false);
	const isActive = isAboutValid || isFirstNameValid || isEmailValid || isAvatarValid;

	function handleChangeEmail(evt) {
		setEmail(evt.target.value);
		setIsEmailValid(true);
	}

	function handleChangeFirstName(evt) {
		setFirstName(evt.target.value);
		setIsFirstNameValid(true);
	}

	function handleChangeAbout(evt) {
		setAbout(evt.target.value);
		setIsAboutValid(true);
	}

	function handleChangeAvatar(evt) {
		setAvatar(evt.target.files[0]);
		setIsAvatarValid(true);
	}

	const sendFile = React.useCallback(async () => {
		try {
			const data = new FormData();
			data.append("avatar", avatar);

			await axios.patch('http://localhost:8000/api/users/me/avatar', data, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
					'Content-Type': 'multipart/form-data'
				}
			})

			.then(res => console.log('фотография успешно загружена'))
		} catch (error) {console.log(error)}
	}, [avatar])

	function handleSubmit(evt) {
		evt.preventDefault();
		sendFile()
		.then(() => {
			props.onSubmit(email, firstName, about)
		})
	}

	return (
		<section className="edit">
			<div className="container">
					<form className="form edit__form" onSubmit={handleSubmit}>
							<div className="edit__block-photo">
									<img src={props.user.avatar ? `http://localhost:8000/${props.user.avatar}` : avatarDefault} alt="avatar" />
									<div className="edit__block-photo-info">
											<h2 className="edit__block-photo-username headline2">{props.user.username}</h2>                    
											<input className="edit__photo-input" type="file" id="edit__photo" onChange={handleChangeAvatar} />
											<label className="edit__photo-label regular14" htmlFor="edit__photo">
													Change profile photo
											</label>
									</div>
							</div>
							<span className="block-input edit__block-input">
									<input className={`input edit__input input__firstName regular16 ${isFirstNameValid ? 'initial': ''}`} onChange={handleChangeFirstName} type="text" id="edit__input-firstName" value={`${firstName}`} placeholder="First name" required />
									<label className="label edit__label regular16" htmlFor="edit__input-firstName">First name</label>
							</span>
							<span className="block-input edit__block-input">
									<input className={`input edit__input input__userName regular16 ${isEmailValid ? 'initial': ''}`} onChange={handleChangeEmail} type="email" id="edit__input-userName" value={`${email}`} placeholder="Username" required />
									<label className="label edit__label regular16" htmlFor="edit__input-userName">Email</label>
							</span>
							<span className="block-input edit__block-input">
									<textarea className={`input edit__input input__userName regular14 ${isAboutValid ? 'initial': ''}`} onChange={handleChangeAbout} id="edit__input-userName" value={`${about}`} placeholder="About you">{props.user.about}</textarea>
									<label className="label edit__label regular16" htmlFor="edit__input-userName">About you</label>
							</span>
							
							<button className={`btn edit__btn medium16 ${isActive ? '' : 'disabled'}`} type="submit" tabIndex="4">Save</button>
					</form>
					<button className="btn__exit edit__btn-exit pop-up__open medium16" type="button" onClick={props.logOut}>Log out</button>
					{/* <button className="btn__exit edit__btn-exit pop-up__open medium16" type="button" onClick={sendFile}>меняем аватарку</button> */}
			</div>
  	</section>
	)
}

export default ProfileEdit;