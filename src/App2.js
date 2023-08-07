import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import './App.css';
import './index.css';
import 'tachyons';

const PAT = '3db14d7452e3488e816a272d5e0f6ad1';
const USER_ID = 'yanelobo';       
const APP_ID = 'my-first-application';
const MODEL_ID = 'celebrity-face-recognition';
// const IMAGE_URL = ' ';

function App() {

  const [input, setInput] = useState();
  const [imageURL, setImage] = useState();
  const [name, setName] = useState(' ');
  

  // const calculateFaceLocation = (data) => {
  //   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  //   const image = document.getElementById('inputImage');
  //   const width = Number(image.width);
  //   const height = Number(image.height);
  //   console.log(width, height);
  //   return {
  //     leftCol: clarifaiFace.left_col * width,
  //     topRow: clarifaiFace.top_row * height,
  //     rightCol: width - (clarifaiFace.right_col * width),
  //     bottomRow: height - (clarifaiFace.bottom_row * height)
  //   }
  // };

  // const displayFaceBox = (box) => {
  //   console.log(box)
  //   setBox({box})
  // };

  const celebName = (data) => {
    const clarifaiFace = data.outputs[0].data.concepts[0].name
    console.log(clarifaiFace)
  }

  const displayName = (name) => {
    console.log(name)
    setName(name)
    };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImage(input);
    console.log(input);
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": input
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(data => displayName(celebName(data.text())))
        // .then(result => console.log(result))
        .catch(error => console.log('error', error));
  
  };


  return (
      <div className="App">
      <ParticlesBg color="#FFFFFF" num={50} type="cobweb" bg={true} />
      <Navigation />
      <Rank />
      <ImageLinkForm onInputChange = {onInputChange} 
      onButtonSubmit={onButtonSubmit}/>
      <FaceRecognition name={name} imageURL = {imageURL}/>
    </div>
  );
}

export default App;
