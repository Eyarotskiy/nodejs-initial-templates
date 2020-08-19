import React, {useState} from 'react';
import axios from 'axios';
import 'components/App/Home/FileUpload/FileUpload.scss';

const FileUpload = () => {
	const [file, changeFile] = useState<File>();
	const [fileName, changeFileName] = useState('');
	const [imgUrl, changeImgUrl] = useState('');

	const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const file = e.target.files![0];
		changeFile(e.target.files![0]);
		changeFileName(file.name);
	};

	const uploadFile = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
		event.preventDefault();
		try {
			if (file) {
				const data = new FormData();
				data.append('file', file);
				const response = await axios.post('/file/upload', data);
				console.log(response);
				changeImgUrl(response.data.url)
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="FileUpload">
			<h2 className="title">File Upload</h2>
			<form className="form">
				<label htmlFor="file-upload" className="btn btn-grey">
					Select file to upload
				</label>
				<h4 className="file-name">{fileName}</h4>
				<input id="file-upload" type="file" onChange={onFileUpload} style={{display: 'none'}}/>
				{
					fileName.length > 0 &&
					<button className="btn btn-blue" onClick={uploadFile}>Upload file to server</button>
				}
				{
					imgUrl.length > 0 &&
					<img src={imgUrl} alt="uploaded" className="uploaded-img"/>
				}
			</form>
		</div>
	);
};

export default FileUpload;
