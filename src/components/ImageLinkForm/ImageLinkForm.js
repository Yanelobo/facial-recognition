import React from 'react';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'I will detect faces in your pictures. Give it a try.'}
            </p>
            <div className='center'>
                <div className='pa2 center'>
                    <input className = 'f4 pa2 w-70 center br2 ba b--near-white' 
                    type='text' onChange={onInputChange}></input>
                    <button className=" dib button-1 w-30" role="button" 
                    onClick = {onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;