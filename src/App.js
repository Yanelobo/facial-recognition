import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
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
  const [route, setRoute] = useState('home');
  const [isSignedIn, setSigned] = useState(false)
  

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



  // const displayName = (name) => {
  //   console.log(name)
  //   setName(name)
  //   };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

/*   const celebName = (data) => {
    setName(data.outputs[0].data.concepts[0].name)
  } */

/*   const nameChange = () => {
    document.getElementById('name').innerHTML = name.toUpperCase(); 
  } */
  const celebName = (data) => {
    setName(data.outputs[0].data.concepts[0].name);
    document.getElementById('name').innerHTML = data.outputs[0].data.concepts[0].name.toUpperCase();
  };

  const onRouteChange = (route) => {
    if(route === 'signout') {
      setSigned(false)
    } else if (route === 'home') {
      setSigned(true)
    }
    setRoute(route)
  }

  const onButtonSubmit = () => {
    // nameChange('');
    setImage(input);
      // console.log(input);
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
        .then(data => {
          // nameChange(celebName(data));
          celebName(data)
          })
        .catch(error => console.log('error', error));

  };


  return (
      <div className="App">
      <ParticlesBg color="#FFFFFF" num={50} type="cobweb" bg={true} />
      <Navigation isSignedIn={ isSignedIn } onRouteChange={ onRouteChange}/>
      <div>
        {route ==='home' 
        ? <div> 
              <Rank />
              <ImageLinkForm 
              onInputChange = {onInputChange} 
              onButtonSubmit = {onButtonSubmit}/>
              <FaceRecognition name={name} imageURL = {imageURL}/>
            </div>
            : (
              route === 'signin' 
              ? <SignIn onRouteChange={ onRouteChange }/>
              : <Register onRouteChange={ onRouteChange }/>
              )
        }
      </div>
    </div>
  )
}

export default App;
