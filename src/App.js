import React, {useState} from 'react';
import './App.css';
import axios from 'axios'

import FileUploader from './components/FileUploader';

function App() {
  const [files, setFiles] = useState([])

  const onChangeHandler = e => {
    const files = Object.values(e.target.files).map((el, index) => {
      el.id = index + 1;
      return el;
    });
    setFiles(files)
  }

  const cancelFileHandler = id => {
    let newFiles = files.filter(file => file.id !== id)
    setFiles(newFiles)
  }

  const onClickHandler = () => {
    let data = new FormData()
    files.forEach(file => {
      data.append('file', file)
    })
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
          {files.map(file => (
            <div key={file.id}>
              <span>{`${file.name} ${(file.size/1024).toFixed(2)}kB`}</span>
              <button onClick={() => cancelFileHandler(file.id)}>CANCEL</button>
            </div>
          ))}
          <button onClick={onClickHandler}>UPLOAD</button>
        </div>: null}
    </div>
  );
}

export default App;
