import React, {useState} from 'react';
import './App.css';
import axios from 'axios'

import FileUploader from './components/FileUploader';

function App() {
  const [files, setFiles] = useState([])

  const onChangeHandler = e => {
    const files = Object.values(e.target.files);
    setFiles(files)
  }

  const cancelFileHandler = index => {
    let newFiles = [...files];
    newFiles.splice(index, 1);
    console.log('newFiles', newFiles)
    setFiles(newFiles)
  }

  const onClickHandler = () => {
    let data = new FormData()
    data.append('file', files[0])
    axios.post('http://localhost:8080/upload', data)
      .then(resp => {
        console.log(resp.statusText)
      })
  }

  return (
    <div className="App">
      <h3>Upload your files here</h3>
      <FileUploader onChange={onChangeHandler} multiple={true}/>
      {(files.length > 0)? 
        <div>
          {files.map((file, index) => (
            <div key={index}>
              <span>{`${file.name} ${(file.size/1024).toFixed(2)}kB`}</span>
              <button onClick={() => cancelFileHandler(index)}>CANCEL</button>
            </div>
          ))}
          <button onClick={onClickHandler}>UPLOAD</button>
        </div>: null}
    </div>
  );
}

export default App;
