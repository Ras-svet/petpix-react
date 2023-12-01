import React from "react";
import avatarDefault from "../image/avatar/big/avatar1.jpg";
import Card from "./Card";

function Lk(props) {

	React.useEffect(() => {
		if (props.myCard) {
			props.getCards()
		}
	}, [])
	return (
		<>
			<section className="head">
				<div className="container">
					<div className="head__info">
							<img className="head__info-photo" src={props.user.avatar ? `http://localhost:8000/${props.user.avatar}` : avatarDefault} alt="avatar" />
							<div className="head__info-value">
									<h2 className="head__info-username headline2">{props.user.username}</h2>
									<div className="head__info-value-block">
											<div className="head__info-posts">
													<p className="head__info-posts-value bold14 headline3">{props.posts.length}</p>
													<p className="regular14">Posts</p>
											</div>
											<div className="head__info-followers">
													<p className="head__info-followers-value bold14">{props.user.subscribers.length}</p>
													<p className="regular14">Followers</p>
											</div>
									</div>
							</div>
					</div>
					<p className="head__description text__more regular14">
						<span className="text__expand regular14" style={props.user.about ? {} : {color: "#808080"}}>
							{props.user.about ? props.user.about : 'No information'}
						</span>
					</p>
				</div>
			</section>
			<div className="container post">
			{props.posts?.map(post => {
				return (
					<Card
						post={post}
						key={post._id}
						img={`http://localhost:8000/${post.img}`}
						description={post.description}
						likes={post.likes}
						date={post.createdAt}
						deleteFavorite={props.deleteFavorite}
						addFavorite={props.addFavorite}
						friends = {props.friends}
						like={props.like}
						deleteLike={props.deleteLike}
						user={props.user}
						anotherPost={false}
					/>
					)
				})}
			</div>
		</>
	)
}

export default Lk;