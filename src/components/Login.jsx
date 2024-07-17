import React from "react";
import { Link } from "react-router-dom";
import ShowPassword from "../image/password_show.svg";
import LogoBig from "../image/logoBig.svg";

function Login(props) {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isShowPassword, setShowaPassword] = React.useState('password');
	const [isPasswordValid, setIsPasswordValid] = React.useState(false);
	const [isEmailValid, setIsEmailValid] = React.useState(false);
	const isActive = isEmailValid && isPasswordValid;

	function handleShowPassword() {
		if (isShowPassword === 'password') {
			setShowaPassword('text')
		} else {
			setShowaPassword('password')
		}
	}

	function handleChangePassword(evt) {
		setPassword(evt.target.value);
		setIsPasswordValid(true);
		if (!evt.target.value) {
			setIsPasswordValid(false)
		}
	}

	function handleChangeEmail(evt) {
		setEmail(evt.target.value);
		setIsEmailValid(true);
		if (!evt.target.value) {
			setIsEmailValid(false)
		}
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		props.onSubmit(email, password)
	}

	return (
		<div className="body">
			<section className="sign-in">
					<div className="container">
							<div className="sign-in__head">
									<h1 className="sign-in__title headline1">Sign in</h1>
									<img className="sign-up__logo logo__big" alt="лого" src={LogoBig} ></img>
							</div>
							<form className="form sign-in__form" onSubmit={handleSubmit}>
									<span className="block-input sign-in__block-input">
											<input className="input sign-in__input input__email regular16" type="email" id="sign-in__input-email" placeholder="Email" onChange={handleChangeEmail} tabIndex="1" required />
											<label className="label sign-in__label regular16" htmlFor="sign-in__input-email">Email</label>
									</span>
									<span className="block-input sign-in__block-input">
											<input className="input sign-in__input input__password regular16" type={isShowPassword} id="sign-in__input-password" placeholder="Password" onChange={handleChangePassword} tabIndex="2" required />
											<label className="label sign-in__label regular16" htmlFor="sign-in__input-password">Password</label>
											<img className="password-show" src={ShowPassword} alt="показать пароль" onClick={handleShowPassword} />
									</span>
									<div className="sign-in__block-settings">
											<div className="sign-in__block-remember">
													<input className="checkbox__remember sign-in__remember" type="checkbox" id="sign-in__remember-checkbox" />
													<label className="label__remember sign-in__remember regular14" htmlFor="sign-in__remember-checkbox">Remember me</label>
											</div>
											<h2 className="sign-in__forgot regular14">Forgot password?</h2>
									</div>
									<button className={`btn sign-in__btn regular16 ${isActive ? '' : 'disabled'}`} type="submit" tabIndex="3">Sign in</button>
							</form>
							<div className="sign-in__end">
									<p className="sign-in__message regular14">Don't have an account yet?</p>
									<h3><Link to="/sign-up" className="sign-in__message-link medium16">Sign up</Link></h3>
							</div>
					</div>
			</section>
	</div>
	)
}

export default Login;