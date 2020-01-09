import React from 'react';

import styles from './FileUploader.module.css'

const FileUploader = props => {
    return (
        <div>
            <input 
                className={styles.FileUploader}
                type="file" 
                id="file-uploader" 
                onChange={e => props.onChange(e)} 
                multiple={props.multiple}/>
            <label htmlFor="file-uploader">Upload files</label>
        </div>
    )
}

export default FileUploader;