import React, {useState} from 'react';
import axios from 'axios'
import styles from './App.module.css'

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
    <div className={styles.App}>
      <h3>Upload your files here</h3>
      <FileUploader onChange={onChangeHandler} multiple={true}/>
      {(files.length > 0)? 
        <div className={styles.ListWrapper}>
          <div className={styles.FilesList}>
            {files.map((file, index) => (
              <div key={file.id} className={styles.FileItem}>
                <div className={styles.FileNumber}>{index + 1}</div>
                <div className={styles.FileName}>{file.name}</div>
                <div className={styles.FileSize}>{`${(file.size/1024).toFixed(2)}kB`}</div>
                <div className={styles.FileCancel}>
                  <button 
                    onClick={() => cancelFileHandler(file.id)}
                    className={[styles.Button, styles.ButtonCancel].join(' ')}>X</button>
                </div>
              </div>
            ))}
          </div>
          <button 
            className={[styles.Button, styles.ButtonUpload].join(' ')} 
            onClick={onClickHandler}>UPLOAD</button>
        </div>: null}
    </div>
  );
}

export default App;
