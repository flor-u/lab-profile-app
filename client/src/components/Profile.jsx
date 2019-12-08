import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Card, CardTitle, Button} from '../styles/card'
import AuthService from '../services/AuthService';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
      }
   
  render() {
    console.log(this.props.userData.username);
    return (
       
      <Card>
      <CardTitle>Profile</CardTitle>
        <div>
        <p> Welcome {this.props.userData.username}!</p>
        <p> Username: {this.props.userData.username}</p>
        <p> Course: {this.props.userData.course} </p>
        <p> Campus: {this.props.userData.campus} </p>
 
        <Link to="/" onClick={this.logoutUser}>
            Logout
          
        </Link>
        </div>
      </Card>
    );  
  }
}

export default Profile;