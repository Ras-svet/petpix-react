import React from "react";
import { Link } from "react-router-dom";
import LogoBig from "../image/logoBig.svg"

function Register(props) {
	const [email, setEmail] = React.useState('');
	const [isActive, setIsActive] = React.useState(false);
	const [emailIsActive, setEmailIsActive] = React.useState(false);
	
	function handleChangeEmail(evt) {
		setEmail(evt.target.value);
		setIsActive(true);
		setEmailIsActive(true);
		if (!evt.target.value) {
			setIsActive(false);
			setEmailIsActive(false)
		}
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		props.onSubmit(email)
	}

	return (
		<div className="body">
			<section className="sign-up">
					<div className="container">
							<div className="sign-up__head">
									<h1 className="sign-up__title headline1">Sign up</h1>
									<img className="sign-up__logo logo__big" alt="лого" src={LogoBig}></img>
							</div>
							<form className="form sign-up__form" onSubmit={handleSubmit} >
									<span className="block-input sign-up__block-input">
											<input className={`input sign-up__input input__email regular16 ${emailIsActive ? 'initial': ''}`} type="email" id="sign-up__input-email" placeholder="Email" onChange={handleChangeEmail} tabIndex="1" required />
											<label className="label sign-up__label regular16" htmlFor="sign-up__input-email">Email</label>
									</span>
									<button className={`btn sign-up__btn regular16 ${isActive ? '' : 'disabled'}`} type="submit" tabIndex="2">Next</button>
							</form>
							<div className="sign-up__end">
									<p className="sign-up__message regular16">Do you already have an account?</p>
									<h3><Link to="/sign-in" className="sign-up__message-link medium14">Sign in</Link></h3>
							</div>
					</div>
			</section>
	</div>
	)
}

export default Register;