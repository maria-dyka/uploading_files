import React from 'react';

const FileUploader = props => {


    return (
        <div>
            <input type="file" onChange={e => props.onChange(e)} multiple={props.multiple}/>
        </div>
    )
}

export default FileUploader;