import React, { Component } from 'react';
import axios from 'axios';
const Context = React.createContext();

const reducer = (state, action) => {
   switch(action.type){
       case 'DELETE_EMPLOYEE':
         return {
              ...state,
              employees: state.employees.filter(employee =>
                employee.id !== action.payload  
              )
        };
        case 'ADD_EMPLOYEE':
         return {
              ...state,
              employees:[action.payload, ...state.employees]
        };
        case 'UPDATE_EMPLOYEE':
         return {
              ...state,
              employees: state.employees.map(employee => 
              employee.id === action.payload.id ? (employee = action.payload) : employee
             )
        }
        default: 
        return state;
     }
}

export class Provider extends Component {

    state = {
       employees: [ ],
        dispatch: action => {
            this.setState(state => reducer(state, action));
        }
    };

    async componentDidMount() {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users')
      
      this.setState({employees: res.data.map(employee => {
         return {
          id: employee.id,
          name: employee.name,
          phone: employee.phone,
          address: employee.address.street,
          suite: employee.address.suite,
          zipcode: employee.address.zipcode,
          email: employee.email,
          city: employee.address.city
         }
      })}) 
    }
    // componentDidMount() {
    //     axios.get('https://jsonplaceholder.typicode.com/users').then(res =>
    //     this.setState({
    //       employees: res.data.map(employee => {
    //         return {
    //           id: employee.id,
    //           name: employee.name,
    //           phone: employee.phone,
    //           address: employee.address.street,
    //           suite: employee.address.suite,
    //           zipcode: employee.address.zipcode,
    //           email: employee.email,
    //           city: employee.address.city
    //         };
    //       }) 
    //     })
    //   );    
    // }

    render(){
        return(
            <Context.Provider value={this.state}>
                 {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;