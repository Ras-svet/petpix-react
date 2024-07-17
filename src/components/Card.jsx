import React from "react";
import avatar1 from "../image/avatar/medium/avatar1.jpg";
import subscribe from "../image/MINUSIK.svg";
import notSubscribe from "../image/PLYuSIK.svg";
import blackLike from "../image/like.svg";
import like from "../image/dislike.svg";
import { useNavigate } from "react-router-dom";


function Card(props) {
	const [isMore, setIsMore] = React.useState(false);
	const [text, setText] = React.useState("more");
	let isFavorited = props.friends.some(i => i._id === props.ownerId) || props.friends.includes(props.ownerId);
	const [isSubscribe, setIsSubscribe] = React.useState(isFavorited);
	let isLiked = props.likes.some(i => i._id === props.user._id) || props.likes.includes(props.user._id)
	const user = props.post.owner;
	const navigate = useNavigate();

	function handleLike() {
		if(isLiked) {
			props.deleteLike(props.post._id)
			isLiked = props.likes.some(i => i._id === props.user._id) || props.likes.includes(props.user._id)
		} else {
			props.like(props.post._id)
			isLiked = props.likes.some(i => i._id === props.user._id) || props.likes.includes(props.user._id)
		}
	}

	function handleMore(){
		if(!isMore) {
			setIsMore(true);
			setText("less")
		} else {
			setIsMore(false);
			setText("more")
		}
	}

	function handleAddToFavorite() {
		if(isFavorited) {
			setIsSubscribe(true)
		} else {
			setIsSubscribe(false)
		}
		if(!isSubscribe) {
			setIsSubscribe(true)
			props.addFavorite(props.ownerId)
		} else if(isSubscribe) {
			setIsSubscribe(false)
			props.deleteFavorite(props.ownerId)
		}
	}

	function handleClickUser() {
		props.getAnotherUser(props.ownerId)
	}

	return(
		<div className="feed__post post">
			{props.anotherPost === 'true' && <div className="post__user">
				<div className="post__user-info">
						<img src={props.post.owner.avatar? `http://localhost:8000/${props.post.owner.avatar}` : avatar1} alt="avatar" className="post__user-avatar" />
						<h3 className="post__user-username headline3" onClick={handleClickUser}>{props.ownername}</h3>
				</div>
				<div className="post__user-subscribe">
					{props.user._id !== props.ownerId && <img src={isSubscribe ? subscribe : notSubscribe} alt="добавить в избранное" onClick={handleAddToFavorite} />}
				</div>
			</div>}
			<img src={props.img} alt="фото" className="post__photo" />
			<div className="post__info">
					<div className="post__info-like">
							<div className="post__info-like-svg">
								<img src={isLiked ? blackLike : like} alt="лайк" onClick={handleLike} />
							</div>
							<p className="post__info-like-value headline3">{props.likes.length} Likes</p>
					</div>
					<div className="post__info-date regular12">
							{props.date.split('T')[0].split("-").reverse().join("/")}
					</div>
			</div>
			<p className="post__description text__more regular14">
					<span className={`regular14 ${isMore ? '' : 'text__expand'}`}>
							{props.description}
					</span>
					<span className="show__expand" onClick={handleMore}>{text}</span>
			</p>
		</div>
	)
}

export default Card;