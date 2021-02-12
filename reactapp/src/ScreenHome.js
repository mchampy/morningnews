import React, {useState} from 'react';
import './App.css';
import { Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

function ScreenHome(props) {

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false)
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [errorSignup, setErrorSignup] = useState('')
  const [errorSignin, setErrorSignin] = useState('')

async function handleSubmitSignUp () {
  const data = await fetch('/sign-up', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
  })
  const body =  await data.json();

if(body.result === true){
    setIsLogin(true)
    props.addToken(body.token);
  } else {
    setErrorSignup(body.error)
  }
}

// au clic "ok" sign-in vérifie dans la BDD
async function handleSubmitSignIn () {
const rawResponse = await fetch(`/sign-in?emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`); 
var response = await rawResponse.json();
console.log(response)
if(response.result === true){
  console.log(response.token)
  setIsLogin(true)
  props.addToken(response.token);
} else {
  setErrorSignin(response.error)
}

;}
  if(isLogin === false) {
    return (
    <div className="Login-page" >
      

      {/* SIGN-IN */}

      <div className="Sign">
        {errorSignin}
        <Input className="Login-input" placeholder="email" 
          onChange={(e) => setSignInEmail(e.target.value)} value={signInEmail}
        />

        <Input.Password className="Login-input" placeholder="password" 
          onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword}
        />

        <Button style={{ width: '80px' }} type="primary" onClick={() => handleSubmitSignIn()}>Sign-in</Button>

      </div>
      
      {/* SIGN-UP */}

      

      <div className="Sign">
      {errorSignup}
        <Input className="Login-input" placeholder="username"
          onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername}
        />

        <Input className="Login-input" placeholder="email"
          onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail}
        />

        <Input.Password className="Login-input" placeholder="password"
          onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword}
        />

        <Button style={{ width: '80px' }} type="primary" onClick={() => handleSubmitSignUp()}>Sign-up</Button>

      </div>

    </div >
)
} else {
  return (
    <Redirect to='/screensource' />
  )
}
}

function mapDispatchToProps(dispatch) {
  return {
    addToken : function(token) {
        dispatch( {type: 'addtoken', token: token} )
    }
  }
 }
 
export default connect(
  null,
  mapDispatchToProps
)(ScreenHome);

