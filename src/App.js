import React, {useState} from 'react';
import './App.css';

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
          <button>UPLOAD</button>
        </div>: null}
    </div>
  );
}

export default App;
