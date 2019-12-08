import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Card, CardTitle} from '../../styles/card'

class Home extends Component {
  render() {
    return (
      <Card>
      <CardTitle>IronProfile</CardTitle>
        <div className="buttons">
        <Link to="/signup">
          
            Sign up
          
        </Link>
        <Link to="/login">
          
            Login
          
        </Link>
        </div>
      </Card>
    );
  }
}

export default Home;