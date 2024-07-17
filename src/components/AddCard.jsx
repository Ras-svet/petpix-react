import React from 'react';
import defaultCard from '../image/default_card.png';
import { ImageCardContext } from '../contexts/ImageCardContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FileViewer from 'react-file-viewer';

function AddCard(props) {
	const { imageCard } = React.useContext(ImageCardContext)
	const [description, setDescription] = React.useState('');
	const filename = imageCard.name
	console.log(filename)
	const type = filename.split('.').pop()
	const navigate = useNavigate()

	function handleChangeDescription (evt) {
		setDescription(evt.target.value);
	}

	const sendFile = React.useCallback(async (evt) => {
		evt.preventDefault()
		try {
			const data = new FormData();
			data.append("img", imageCard);
			data.append("description", description);

			await axios.post('http://localhost:8000/api/posts', data, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
					'Content-Type': 'multypart/form-data'
				}
			})

			.then(res => navigate("/profile"))
		} catch (error) {console.log(error)}
	}, [imageCard, description])
	
	return (
		<section className="add">
			<div className="container">
					<form className="form add__form" onSubmit={sendFile}>
						{imageCard && <FileViewer
						filePath={URL.createObjectURL(imageCard)}
						fileType={type}
						width= '72px'
						height='72px'
						/>}
							{/* <img src={imageCard} alt="картинка карточки" className="add__photo" /> */}
							<span className="block-input add__block-input">
									<textarea className="input add__input input__userName regular14" id="add__input-userName" placeholder="Description" onChange={handleChangeDescription}></textarea>
									<label className="label add__label regular16" htmlFor="add__input-userName">Description</label>
							</span>
							<button className="btn add__btn regular16" type="submit" tabIndex="4">Share</button>
					</form>
					<a href="index.html" className="add__form-cancel">Cancel</a>
			</div>
  	</section>
	)
}

export default AddCard;