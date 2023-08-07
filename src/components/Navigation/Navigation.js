import React from 'react';
import logo from './logo.png'

const Navigation = ({onRouteChange, isSignedIn}) => {
        if(isSignedIn){
            return(
                <nav className='flex justify-between'>  
                    <img src={logo} id = 'logo' ></img>
                    <p onClick={() => onRouteChange('signin')} id='signout' className='f4 link dim white pointer'> Sign Out </p>    
                </nav>
            )
        } else {
            return(
                <nav className='flex justify-between'>  
                    <img src={logo} id = 'logo' ></img>
                    <div className='flex items-center'>
                        <p onClick={() => onRouteChange('signin')}  className='f4 ma0 mr3 link dim white pointer'> Sign In </p> 
                        <p onClick={() => onRouteChange('register')}  className='f4 ma0 link dim white pointer'> Register </p> 
                    </div>    
                </nav>
            )
        }
}

export default Navigation