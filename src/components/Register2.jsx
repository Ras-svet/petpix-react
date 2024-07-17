import React from "react";
import LogoBig from "../image/logoBig.svg"

function Register2(props) {
	const [code, setCode] = React.useState('');
	const [isActive, setIsActive] = React.useState(false);
	const [codeIsActive, setCodeIsActive] = React.useState(false);
	
	function handleChangeCode(evt) {
		setCode(evt.target.value);
		setIsActive(true);
		setCodeIsActive(true);
		if (!evt.target.value) {
			setIsActive(false);
			setCodeIsActive(false)
		}
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		props.onSubmit(code)
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
											<input className={`input sign-up__input input__code regular16 ${codeIsActive ? 'initial': ''}`} type="number" id="sign-up__input-code" placeholder="Сonfirmation code" onChange={handleChangeCode} tabIndex="1" required />
											<label className="label sign-up__label regular16" htmlFor="sign-up__input-code">Сonfirmation code</label>
									</span>
									<button className={`btn sign-up__btn regular16 ${isActive ? '' : 'disabled'}`} type="submit" tabIndex="2">Next</button>
							</form>
					</div>
			</section>
	</div>
	)
}

export default Register2;