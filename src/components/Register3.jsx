import React from "react";
import DefaultAvatar from "../image/avatar/big/default.svg";
import ShowPassword from "../image/password_show.svg";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import FileViewer from 'react-file-viewer';

function Register3(props) {
	const [userName, setUserName] = React.useState('');
	const [firstName, setFirstName] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [avatar, setAvatar] = React.useState(null);
	const [isShowPassword, setShowaPassword] = React.useState('password');
	const [isUserNameValid, setIsUserNameValid] = React.useState(false);
	const [isPasswordValid, setIsPasswordValid] = React.useState(false);
	const [isFirstNameValid, setIsFirstNameValid] = React.useState(false);
	const isActive = isUserNameValid && isFirstNameValid && isPasswordValid;
	const navigate = useNavigate();
	const [type, setType] = React.useState('')
	
	function handleChangeUsername(evt) {
		setUserName(evt.target.value);
		setIsUserNameValid(true);
		if (!evt.target.value) {
			setIsUserNameValid(false)
		}
	}

	function handleShowPassword() {
		if (isShowPassword === 'password') {
			setShowaPassword('text')
		} else {
			setShowaPassword('password')
		}
	}

	function handleChangeFirstName(evt) {
		setFirstName(evt.target.value);
		setIsFirstNameValid(true)
		if (!evt.target.value) {
			setIsFirstNameValid(false)
		}
	}

	function handleChangePassword(evt) {
		setPassword(evt.target.value);
		setIsPasswordValid(true);
		if (!evt.target.value) {
			setIsPasswordValid(false)
		}
	}

	function handleChangeAvatar(evt) {
		const filename = evt.target.files[0].name
		setType(filename.split('.').pop())
		setAvatar(evt.target.files[0]);
	}

	const sendFile = React.useCallback(async (evt) => {
		evt.preventDefault()
		try {
			const data = new FormData();
			data.append("avatar", avatar);
			data.append("email", props.email);
			data.append("password", password);
			data.append("username", userName);
			data.append("firstName", firstName);

			await axios.post('http://localhost:8000/api/auth/register', data, {
				headers: {
					// Authorization: `Bearer ${localStorage.getItem('jwt')}`,
					'Content-Type': 'multypart/form-data'
				}
			})

			.then(res => navigate("/sign-in"))
		} catch (error) {console.log(error)}
	}, [avatar, password, firstName, userName, props.email])

	// function handleSubmit(evt) {
	// 	evt.preventDefault();
	// 	props.onSubmit(password, userName, firstName)
	// }

	return (
		<div className="body">
			<section className="sign-up sign-up3">
					<div className="container">
							<div className="sign-up__head">
									<h1 className="sign-up__title headline1">Your profile</h1>
							</div>
							<form className="form sign-up__form" onSubmit={sendFile}>
									<div className="sign-up__block-photo">
											<input className="sign-up__photo-input" type="file" id="sign-up__photo" onChange={handleChangeAvatar} />
											<label className="sign-up__photo-label" htmlFor="sign-up__photo">
													{avatar ? 
													<FileViewer
													filePath={URL.createObjectURL(avatar)}
													fileType={type}
												/> : <img src={DefaultAvatar} alt="avatar" />}
											</label>
									</div>
									<span className="block-input sign-up__block-input">
											<input className={`input sign-up__input input__firstName regular16 ${isFirstNameValid ? 'initial': ''}`} value={firstName || ''} type="text" id="sign-up__input-firstName" placeholder="First name" onChange={handleChangeFirstName} tabIndex="1" required />
											<label className="label sign-up__label regular16" htmlFor="sign-up__input-firstName">First name</label>
									</span>
									<span className="block-input sign-up__block-input">
											<input className={`input sign-up__input input__userName regular16 ${isUserNameValid ? 'initial': ''}`} value={userName || ''} type="text" id="sign-up__input-userName" placeholder="Username" tabIndex="2" onChange={handleChangeUsername} required />
											<label className="label sign-up__label regular16" htmlFor="sign-up__input-userName">Username</label>
									</span>
									<span className="block-input sign-up__block-input">
											<input className={`input sign-up__input input__password regular16 ${isPasswordValid ? 'initial': ''}`} value={password || ''} type={isShowPassword} id="sign-up__input-password" placeholder="Password" tabIndex="3" onChange={handleChangePassword} required />
											<label className="label sign-up__label regular16" htmlFor="sign-up__input-password">Password</label>
											<img className="password-show" src={ShowPassword} alt="показать пароль" onClick={handleShowPassword} />
									</span>
									<div className="sign-up__block-remember">
											<input className="checkbox__remember sign-up__remember" type="checkbox" id="sign-up__remember-checkbox" />
											<label className="label__remember sign-up__remember regular16" htmlFor="sign-up__remember-checkbox">Remember me</label>
									</div>
									<button className={`btn sign-up__btn regular16 ${isActive ? '' : 'disabled'}`} type="submit" tabIndex="4">Next</button>
							</form>
					</div>
			</section>
	</div>

	)
}

export default Register3;