import React from 'react';
import {Link} from 'react-router-dom';

function Welcome() {
	return (
		<div className="body body__welcome">
			<section className="welcome">
					<div className="container">
							<div className="welcome__head">
									<h1 className="welcome__title headline1">Welcome<br />to Petpix!</h1>
							</div>
							<button className="btn welcome__btn"><Link to="/" className="regular17" >Get started</Link></button>
					</div>
			</section>
	</div>
	)
}

export default Welcome;