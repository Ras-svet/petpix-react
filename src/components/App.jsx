import React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { ImageCardContext } from '../contexts/ImageCardContext';
import Register from "./Register";
import Register2 from	"./Register2";
import Register3 from './Register3';
import Login from './Login';
import Welcome from './Welcome';
import ProtectedRoute from './ProtectedRoute';
import NavBar from './NavBar';
import Header from './Header';
import Main2 from './Main2';
import auth from '../utils/auth';
import posts from '../utils/posts';
import users, { Users } from '../utils/users';
import Lk from './Lk';
import ProfileEdit from './ProfileEdit';
import AddCard from './AddCard';

function App() {
	const [currentUser, setCurrentUser] = React.useState({});
	const [anotherUser, setAnotherUser] = React.useState({});
	const [userEmail, setUserEmail] = React.useState('');
	const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('jwt') ? true : false);
	const [allPosts, setAllPosts] = React.useState([]);
	const [favoritePosts, setFavoritePosts] = React.useState([]);
	const [myPosts, setMyPosts] = React.useState([]);
	const [userPosts, setUserPosts] = React.useState([]);
	const [friends, setFriends] = React.useState([]);
	const [imageCard, setImageCard] = React.useState('')
	const navigate = useNavigate();

	React.useEffect(() => {
		const token = localStorage.getItem('jwt');
		users.getMyInfo(token)
		.then((user) => {
			setCurrentUser(user)
			setFriends(user.friends)
			getFavoritesCards(token)
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`);
		})
	},[isLoggedIn])

	function checkEmail(email) {
		auth.checkEmail(email)
		.then((res) => {
			navigate("/sign-up2");
			setUserEmail(email)
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`);
			setUserEmail('')
		})
	}

	function checkCode(code) {
		console.log(userEmail)
		auth.checkCode(userEmail, code)
		.then(({answer, isTrue}) => {
			console.log(isTrue)
			if (isTrue) {
				navigate("/sign-up3")
			} else {
				console.log('Неверный код')
			}
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	function register(password, username, firstName) {
		auth.register(userEmail, password, username, firstName)
		.then(() => {
			console.log('Зареган');
			navigate("/sign-in")
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	function login(email, password) {
		auth.login(email, password)
		.then((res) => {
			localStorage.setItem('jwt', res.token);
			setIsLoggedIn(true);
			navigate("/welcome")
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	function getAllUsersCards() {
		const token = localStorage.getItem('jwt');
		posts.getAllPosts(token)
		.then((posts) => {
			setAllPosts(posts)
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	function getFavoritesCards() {
		const token = localStorage.getItem('jwt');
		posts.getFavoritesPosts(token)
		.then((posts) => {
			setFavoritePosts(posts)
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	function addToFavorite(userId) {
		const token = localStorage.getItem('jwt');
		users.addToFavorites(token, userId)
		.then((res) => {
			setFriends(res.friends)
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	function deleteFromFavorite(userId) {
		const token = localStorage.getItem('jwt');
		users.deleteFromFavorites(token, userId)
		.then((res) => {
			setFriends(res.friends)
			getFavoritesCards()
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	function like(postId) {
		const token = localStorage.getItem('jwt');
		posts.like(token, postId)
		.then(() => {
			getAllUsersCards()
			getFavoritesCards()
			getMyCards()
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	function deleteLike(postId) {
		const token = localStorage.getItem('jwt');
		posts.deleteLike(token, postId)
		.then(() => {
			getAllUsersCards()
			getFavoritesCards()
			getMyCards()
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	function getMyCards() {
		const token = localStorage.getItem('jwt');
		posts.getMyCards(token)
		.then((posts) => {
			setMyPosts(posts)
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	// function updateUser(email, firstName, about, avatar) {
	// 	const token = localStorage.getItem('jwt');
	// 	Promise.all([users.updateUserInfo(token, email, firstName, about), users.updateUserAvatar(token, avatar)])
	// 	.then(([user, avatar]) => {
	// 		setCurrentUser(user)
	// 	})
	// 	.catch(err => {
	// 		console.log(`Ошибка при отправке запроса ${err}`)
	// 	})
	// }

	function updateUser(email, firstName, about) {
		const token = localStorage.getItem('jwt');
		users.updateUserInfo(token, email, firstName, about)
		.then((user) => {
			console.log(user)
			setCurrentUser(user)
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	function logoutUser() {
		localStorage.clear();
		setUserEmail ('');
		setIsLoggedIn(false)
	}

	// function getUserCards(userId) {
	// 	const token = localStorage.getItem('jwt');
	// 	posts.getUserCards(token, userId)
	// 	.then((posts) => {
	// 		setUserPosts(posts)
	// 	})
	// 	.catch(err => {
	// 		console.log(`Ошибка при отправке запроса ${err}`)
	// 	})
	// }

	function getUserInfoAndCards(userId) {
		const token = localStorage.getItem('jwt');
		Promise.all([users.getUserInfo(token, userId), posts.getUserCards(token, userId)])
		.then(([user, posts]) => {
			setAnotherUser(user)
			setUserPosts(posts)
		})
		.then(() => {
			navigate("/user-profile")
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<>
				<Routes>
					<Route exact path="/sign-up" element={
						<Register onSubmit={checkEmail} />
					}
					/>
					<Route exact path="/sign-up2" element={
						<Register2 onSubmit={checkCode} />
					}
					/>
					<Route exact path="/sign-up3" element={
						<Register3 onSubmit={register} email={userEmail} />
					}
					/>
					<Route exact path="/sign-in" element={
						<Login onSubmit={login} />
					}
					/>
					<Route exact path="/welcome" element={
						<ProtectedRoute
							component={Welcome}
							isLoggedIn={isLoggedIn}
						/>
					}
					/>
					<Route exact path="/profile" element={
						<div className="body body__portal">
							<ImageCardContext.Provider value={{imageCard, setImageCard}}>
								<Header user={currentUser} profile="true" />
							</ImageCardContext.Provider>
							<ProtectedRoute
								component={Lk}
								isLoggedIn={isLoggedIn}
								user={currentUser}
								getCards={getMyCards}
								posts={myPosts}
								deleteFavorite={deleteFromFavorite}
								addFavorite={addToFavorite}
								friends={friends}
								like={like}
								deleteLike={deleteLike}
								myCard={true} />
						</div>
					} />
					<Route exact path="/user-profile" element={
						<div className="body body__portal">
							<ImageCardContext.Provider value={{imageCard, setImageCard}}>
								<Header user={currentUser} profile="false" />
							</ImageCardContext.Provider>
							<ProtectedRoute
								component={Lk}
								isLoggedIn={isLoggedIn}
								user={anotherUser}
								posts={userPosts}
								deleteFavorite={deleteFromFavorite}
								addFavorite={addToFavorite}
								friends={friends}
								like={like}
								deleteLike={deleteLike}
								myCard={false} />
						</div>
					} />
					<Route exact path="/add-card" element={
						<div className="body body__portal">
							<ImageCardContext.Provider value={{imageCard, setImageCard}}>
								<Header user={currentUser} profile="false" />
								<AddCard />
							</ImageCardContext.Provider>
						</div>
					} />
					<Route exact path="/edit" element={
						<div className="body body__portal">
							<Header user={currentUser} profile="false" />
							<ProtectedRoute
								component={ProfileEdit}
								user={currentUser}
								isLoggedIn={isLoggedIn}
								onSubmit={updateUser}
								logOut={logoutUser}
							/>
						</div>
					}/>
					<Route exact path="*" element={
						<div className="body body__portal-main">
							<ImageCardContext.Provider value={{imageCard, setImageCard}}>
								<Header user={currentUser} profile="false" />
							</ImageCardContext.Provider>
							<NavBar getAllUsersCards={getAllUsersCards} getFavoritesCards={getFavoritesCards} />
							<div className="feed">
								<div className="container">
									<Routes>
										<Route path="" element={
											<ProtectedRoute
												component={Main2}
												isLoggedIn={isLoggedIn}
												posts={favoritePosts}
												deleteFavorite={deleteFromFavorite}
												addFavorite={addToFavorite}
												friends={friends}
												like={like}
												deleteLike={deleteLike}
												user={currentUser}
												getAnotherUser={getUserInfoAndCards}
											/>
										} />
										<Route path="all-users" element={
											<ProtectedRoute
												component={Main2}
												isLoggedIn={isLoggedIn}
												posts={allPosts}
												deleteFavorite={deleteFromFavorite}
												addFavorite={addToFavorite}
												friends={friends}
												like={like}
												deleteLike={deleteLike}
												user={currentUser}
												getAnotherUser={getUserInfoAndCards}
											/>
										} />
									</Routes>
								</div>
							</div>
						</div>
					}>
					</Route>
				</Routes>
			</>
		</CurrentUserContext.Provider>
	)
}

export default App;