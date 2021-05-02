import React, { Component } from 'react'
import { Form, FormControl,Button } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router-dom'

export  class Search extends Component {

  render() {
    return (
      <div style={{ width: '100%'}}>
        <Form inline  style={{float: 'left'}}>
            <FormControl type="text" 
                placeholder="Search" 
                className="mr-sm-0" 
                name="search_query"
                id="search_query"
                style={{ width: '450px',  marginRight: '0px !important', marginLeft: '200px',  borderRadius: '0', height: '34px'}} 
            />
            <Button style={{ borderRadius: '0', height: '34px'}} ><SearchIcon /></Button>
         </Form>
      </div>
    )
  }
}


export default (withRouter(Search));
