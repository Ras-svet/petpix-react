import React from "react";
import Card from "./Card";
import {Link} from 'react-router-dom'

function Main2(props) {
	return(
		<div className="feed__posts post">
			{props.posts.length === 0 && <div className="feed_dummy">
					<h3 className="feed_dummy-title headline1">No favorites yet</h3>
					<p className="feed_dummy-description regular14">See posts of other users and add to your favorites</p>
					<Link to="all-users"><h3 className="feed_dummy-btn btn regular16">View posts by all users</h3></Link>
				</div>}
			{props.posts?.map(post => {
				return (
					<Card
						post={post}
						key={post._id}
						img={`http://localhost:8000/${post.img}`}
						description={post.description}
						likes={post.likes}
						date={post.createdAt}
						ownername={post.owner.username}
						ownerId={post.owner._id}
						deleteFavorite={props.deleteFavorite}
						addFavorite={props.addFavorite}
						friends = {props.friends}
						like={props.like}
						deleteLike={props.deleteLike}
						user={props.user}
						getAnotherUser={props.getAnotherUser}
						anotherPost='true'
					/>
				)
			})}
		</div>
	)
}

export default Main2;