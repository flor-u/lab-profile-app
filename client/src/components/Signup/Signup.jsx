import React, { Component } from 'react'
// import PageTitle from '../../fontStyles/PageTitle'
import AuthService from '../../services/AuthService'
import { Card, CardTitle, Form } from '../../styles/card';

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.authService = new AuthService();
  }

  state = {
    username: '',
    password: '',
    campus: '',
    course: ''
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({...this.state, [name]:value})
  }
  handleSignUp = (e) => {
    e.preventDefault()
    const { history, setUser } = this.props;
    this.authService.signup(this.state)
    .then(
      (user) => {
        setUser(user);
        history.push("/profile")
      },
      (error) => {
        console.error(error)
      }
    )
  }

//   handleUpload = (e) => {
//     const uploadData = new FormData();
//     uploadData.append('image', e.target.files[0])
//     this.authService.upload(uploadData)
//     .then(
//       (data) => {
//         this.setState({...this.state, image: data.secure_url})
//       },
//       (error) => {
//         console.error(error)
//       }
//     )
//   }

  render() {
    const { username, password, campus, course} = this.state;
    return (
      <Card>
      <CardTitle>Sign Up</CardTitle>
        <Form onSubmit={this.handleSignUp}>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" value={username} required onChange={this.handleChange}/>
          <label htmlFor="password">Password: </label>
          <input type="password" value={password} name="password" required onChange={this.handleChange}/>
          <label htmlFor="campus">Campus: </label>
          <input type="campus" value={campus} name="campus" required onChange={this.handleChange}/>
          <label htmlFor="course">Course: </label>
          <input type="course" value={course} name="course" required onChange={this.handleChange}/>
          <input type="submit" value="Create account"/>
        </Form>
      </Card>
    )
  }
}