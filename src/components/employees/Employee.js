import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { Consumer } from '../../context';
import axios from 'axios';



import './Employee.css';

 class Employee extends Component {

  state = {
      showEmployee: false
  }
  
  showEmpHandler = (e) => {
     this.setState({
         showEmployee: !this.state.showEmployee
     })
  }

  
  deleteEmployee = async (id, dispatch) => {
     try{
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      dispatch({type: 'DELETE_EMPLOYEE', payload: id});
     }catch(e){
        dispatch({type: 'DELETE_EMPLOYEE', payload: id});
     }
  }

  render() {
    
    const {id, name, address, suite, city, zipcode, email, phone} = this.props.employee;
    const { showEmployee } = this.state;


    return (
        <Consumer >
            { value => {
                  const { dispatch  } = value; 
                    return (
                        <div className="employee">

                                <h2>{name}
                                    <span style={{fontSize: '1rem', marginLeft: '1em', cursor: 'pointer'}} onClick={this.showEmpHandler}>View</span>

                                    <span style={{fontSize: '1rem', margin:'0 1em', cursor: 'pointer', textDecoration: 'none'}}><Link to={`employee/edit/${id}`}>Edit</Link></span>

                                    <span style={{fontSize: '1rem', cursor: 'pointer', color: 'red'}} onClick={this.deleteEmployee.bind(this, id, dispatch)}>Delete</span>

                                    </h2>
                                {showEmployee ? (
                                        
                                    <div>
                                        <h3>Address</h3>
                                        <ul>
                                            <li>Address: {address}</li>
                                            <li>Suite: {suite}</li>
                                            <li>City: {city}</li>
                                            <li>Zip code: {zipcode}</li>
                                        </ul>
                                        <ul>
                                            <li>Email: {email}</li>
                                            <li>Phone: {phone}</li>
                                        </ul>
                                    </div>

                                ): null }
                                
                        </div>
                    )
            }}

        </Consumer>
    )
  }
}

Employee.propTypes = {
    employee: PropTypes.object.isRequired
}

export default Employee;
