import React, { Component } from 'react';
import './App.css';
import Posts from './PostsContainer/PostsContainer';
import EventContainer from './EventContainer/EventContainer';
import NavContainer from './NavContainer/NavContainer'
import { Col, Container, Row} from 'reactstrap';
import Login from './Login/Login';
import {Route, Switch} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

library.add(faSearch)


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
  
  handleInputs = (e) => {
  this.setState({
    [e.currentTarget.name]: e.currentTarget.value
  })
  }
  
  handleRegistration = async (e) => {
  e.preventDefault();
  console.log(this.state);
  try{
    const createdUser = await fetch('http://localhost:9000/auth/register', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      } 
    });
    const createdUserJSON = await createdUser.json();
    console.log(createdUserJSON, ' this is response')
    if(createdUserJSON.status == 200){
      this.setState({
        loggedIn: true,
        username: createdUserJSON.data.username,
        password: createdUserJSON.data.password
      })
      console.log(this.state, '<----user is loggedin')
    } else if (createdUserJSON.status == 500){
      console.log("INTERNAL SERVER ERROR")
    }
  }catch(err){
    console.log(err, " error")
  }
  }

  
   render() {
    return (
      <div className="App">
     
      <NavContainer />
    
          { this.state.loggedIn ? 
          <div>
            <Row>
              
              
                  <img src="live-music2.jpeg" className="live-music"/>
            
            </Row>

            <Container>
              <Row>
                <Col xs="6">
                  <Posts /> 
                </Col>                  
                <Col xs="6">
                  <EventContainer />
                </Col>
              </Row>
              <Row>
              </Row>
              
             
            </Container>
   
          
          </div>: 
          
   
            <Login handleRegistration={this.handleRegistration} handleInputs={this.handleInputs} />}
        
          
      </div>
    );
  }
}

export default App;