import React, { Component } from 'react';
import Employee from './Employee';

import { Consumer } from '../../context';

class Employees extends Component {

  render() {

   return (
     <Consumer>
        {value => {
          const { employees } = value;
           return (
            <div>
                {employees.map(employee =>
                  <Employee 
                     key={employee.id}
                     employee={employee}
                  />
               )}
            </div>
          )
        }}
     </Consumer>
    ) 
  }
}

export default Employees;
