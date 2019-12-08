import React, { Component } from 'react'
import AuthService from '../../services/AuthService';
import { Form, Card, CardTitle } from '../../styles/card';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    username: '',
    password: ''
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({...this.state, [name]:value})
  }
  handleLogin = (e) => {
    const { setUser, history } = this.props;
    e.preventDefault()
    this.authService.login(this.state)
    .then(
      (user) => {
        setUser(user)
        history.push("/profile")
      },
      (error) => {
        console.error(error)
      }
    )
  }

  render() {
    const { username, password } = this.state;
    return (
      <Card>
      <CardTitle>Log In</CardTitle>
        <Form onSubmit={this.handleLogin}>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" value={username} onChange={this.handleChange}/>
          <label htmlFor="password" >Password: </label>
          <input type="password" name="password" value={password} onChange={this.handleChange}/>

          <input type="submit" value="Login"/>
        </Form>
      </Card>
    )
  }
}