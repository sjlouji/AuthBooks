import React, {Component} from 'react';
import {withRouter} from 'react-router'
import MUIDataTable from "mui-datatables";
import Chip from '@material-ui/core/Chip';

// const columns = [
//     {
//      name: "name",
//      label: "Name",
//      options: {
//       filter: true,
//       sort: true,
//      }
//     },
//     {
//      name: "company",
//      label: "Company",
//      options: {
//       filter: true,
//       sort: false,
//      }
//     },
//     {
//      name: "city",
//      label: "City",
//      options: {
//       filter: true,
//       sort: false,
//      }
//     },
//     {
//      name: "state",
//      label: "State",
//      options: {
//       filter: true,
//       sort: false,
//      }
//     },
//    ];
// const data = [
//     { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
//     { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
//     { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
//     { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
//    ];


export class UserTable extends Component {

    render() {
        const options = {
            filterType: 'checkbox',
            elevation: 0,
          };
        
        return(
            <div {...this.props.style ? {style: this.props.style} : ''}>
                <MUIDataTable 
                    title={this.props.tabName} 
                    data={this.props.row} 
                    columns={this.props.columns} 
                    options={options} 
                    />
            </div>
        );
    }
}

export default (withRouter(UserTable))