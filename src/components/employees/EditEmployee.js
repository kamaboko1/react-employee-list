import React, { Component } from 'react';
import uuid from 'uuid';
import { Consumer } from '../../context';
import axios from 'axios';

import InputForm from '../layout/InputForm';


 class EditEmployee extends Component {

    state = {
        name: '',
        address: '',
        suite: '',
        city: '',
        zipcode: '',
        email: '',
        phone: '',
        errors: {}
    };

    async componentDidMount(){
        const { id } = this.props.match.params;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)

        const employee = res.data;

        this.setState({
          name: employee.name,
          phone: employee.phone,
          address: employee.address.street,
          suite: employee.address.suite,
          zipcode: employee.address.zipcode,
          email: employee.email,
          city: employee.address.city
        })
    }

  onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const { name, address, suite, city, zipcode, email, phone } = this.state;

        // check field input
        if(name === ''){
          this.setState({errors: {name: "name is required"}});
          return;
        }
        if(address === ''){
          this.setState({errors: {address: "address is required"}});
          return;
        }
        if(suite === ''){
          this.setState({errors: {suite: "suite is required"}});
          return;
        }
        if(city === ''){
          this.setState({errors: {city: "city is required"}});
          return;
        }
        if(zipcode === ''){
          this.setState({errors: {zipcode: "zipcode is required"}});
          return;
        }
        if(email === ''){
          this.setState({errors: {email: "email is required"}});
          return;
        }
        if(phone === ''){
          this.setState({errors: {phone: "phone is required"}});
          return;
        }


        // send edited empployee info to server

        const editedEmployee = {
          name,
          address,
          suite,
          city,
          zipcode,
          email,
          phone
        }

        const { id } = this.props.match.params;
        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, editedEmployee);
        dispatch({type: 'UPDATE_EMPLOYEE', payload: res.data});


        // clear state after submitted
        this.setState({
          name: '',
          address: '',
          suite: '',
          city: '',
          zipcode: '',
          email: '',
          phone: '',
          errors: {}
        })

        // returns to homepage after submit
        this.props.history.push('/');
  }

  onChange = (e) => {
      e.preventDefault();
      this.setState({[e.target.name]: e.target.value});
  }



  render() {

     const { name, address, suite, city, zipcode, email, phone, errors } = this.state;


    return (
      <Consumer >
         { value=> {
           const { dispatch } = value;
            return (
              <div className="employee">
                <h1>Edit Employee</h1>
                <form className="form" onSubmit={this.onSubmit.bind(this, dispatch)} >
                   <InputForm 
                        label="Name"
                        name="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={this.onChange}
                        error={errors.name}
                   />
                   <InputForm 
                        label="Address"
                        name="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={this.onChange}
                        error={errors.address}
                   />
                   <InputForm 
                        label="Suite"
                        name="suite"
                        placeholder="Enter suite"
                        value={suite}
                        onChange={this.onChange}
                        error={errors.suite}
                   />
                   <InputForm 
                        label="City"
                        name="city"
                        placeholder="Enter city"
                        value={city}
                        onChange={this.onChange}
                        error={errors.city}
                   />
                   <InputForm 
                        label="Zipcode"
                        name="zipcode"
                        placeholder="Enter zipcode"
                        value={zipcode}
                        onChange={this.onChange}
                        error={errors.zipcode}
                   />
                   <InputForm 
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={this.onChange}
                        error={errors.email}
                   />
                   <InputForm 
                        label="Phone"
                        name="phone"
                        placeholder="Enter phone"
                        value={phone}
                        onChange={this.onChange}
                        error={errors.phone}
                   />
                    <input type="submit" value="Edit Employee"/>
                </form>
              </div>
            )
         }}
      </Consumer>
    )

    
  }
}

export default EditEmployee;
