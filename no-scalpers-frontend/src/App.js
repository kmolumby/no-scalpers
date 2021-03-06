import React, { Component } from 'react';
import './App.css';
import Posts from './PostsContainer/PostsContainer';
import EventContainer from './EventContainer/EventContainer';
import NavContainer from './NavContainer/NavContainer'
import { Col, Container, Row, Header} from 'reactstrap';
import Login from './Login/Login';
import { Route, Switch, withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Cookie from 'js-cookie';
import HeaderApp from './HeaderContainer/HeaderContainer'

const My404 = () => {
  return (
    <div>
      You're Lost
    </div>
    )
};
class App extends Component {
  constructor () {
    super()
      this.state = {
        loggedIn: false,
        username: "",
        password: ""
      }
  }

  getToken = async () => {
    const token = await fetch('http://localhost:8000/users/getToken/', {
      method: 'get',
      credentials: 'include', // this sends our session cookie with our request
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const tokenResponse = token.json();
    return tokenResponse;
  }
  componentDidMount(){
    this.getToken()
    console.log('GOT TOKEN********')
  }

  handleInputs = (e) => {
  this.setState({
    [e.currentTarget.name]: e.currentTarget.value
  })
  }
  
  handleRegistration = async (e) => {
  e.preventDefault();
  console.log(this.state);
  const csrfCookie = Cookie('csrftoken');

  try{
    const createdUser = await fetch('http://localhost:8000/users/', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfCookie
      } 
    });
    const createdUserJSON = await createdUser.json();
    if(createdUser.status == 200){
      this.setState({
        loggedIn: true,
        username: createdUser.username,
        password: createdUser.password
      })
      console.log(this.state.username, "<---- username bro")
    } else if (createdUserJSON.status == 500){
      console.log("INTERNAL SERVER ERROR")
    }
  }catch(err){
    console.log(err, " error")
  }
  }

  handleLogin = async (e) => {
    e.preventDefault();
    console.log(this.state);
    const csrfCookie = Cookie('csrftoken');

    try{
      const foundUser = await fetch('http://localhost:8000/users/login/', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfCookie,
        } 
      });
      console.log(foundUser , "Getting here")
      const foundUserJSON = await foundUser.json();
      console.log(foundUserJSON, ' this is found user')
      console.log(foundUserJSON.data, "<----foundUser.data")
      if(foundUserJSON.data == "login successful"){
        this.setState({
          loggedIn: true,
          username: this.state.username,
          password: this.state.password
        })
        console.log(this.state, '<----user is loggedin')
        console.log(this.state.username, "<---- username bro")
      } else if (foundUser.status == 500){
        console.log("INTERNAL SERVER ERROR")
      }
    }catch(err){
      console.log(err, " error")
    }
    }
  
    logOut = async (e) => {
      e.preventDefault();
      console.log('being called')
      const csrfCookie = Cookie('csrftoken');
      const loginResponse = await fetch('http://localhost:8000/users/logout/', {
        method: 'get',
        credentials: 'include',
        headers: {
          'X-CSRFToken': csrfCookie,
          'Content-Type': 'application/json',
  
        },
      });
      console.log(loginResponse)
      const parsedResponse = await loginResponse.json();
  
      if(parsedResponse.data === 'logout successful'){
        // change our component
        console.log('succes logut')
       this.setState({
         loggedIn:false
       })
  
      } else {
        console.log(parsedResponse.error)
      }
    }
  
   render() {
    return (
      <div className="App">
     
      <NavContainer logOut ={this.logOut} />
    
          { this.state.loggedIn ? 
         <div>
            <Row className="background-image">
                <h1 className="noscalpers">NOSCALPERS</h1>
            </Row>
          <div className="posts">
              <Container  className="posts container-fluid">
                <Row>
                    <Posts username = {this.state.username}/> 
                  </Row> 
              </Container>
          </div>
              <Container> 
                  <Row> 
                      <EventContainer />
                  </Row>
              </Container>
          
          
          
          </div>: 
          
   
            <Login className="login-page" handleRegistration={this.handleRegistration} handleInputs={this.handleInputs} handleLogin={this.handleLogin}/>}
        
          
      </div>
    );
  }
}

export default withRouter(App);
