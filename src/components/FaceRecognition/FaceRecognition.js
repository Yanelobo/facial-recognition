import React from 'react';
import './FaceRecognition.css';
import 'tachyons';

const FaceRecognition = ( {imageURL, name} ) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <div>This celebrity is: <div  id="name"></div></div>
                {/* <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>test</div> */}
                <img id = 'inputImage' src={imageURL} width='500px' height='auto' />    
            </div>
        </div>
    );
}

export default FaceRecognition;