import React, {Component} from 'react';
import {Button, Form, Label, Input, FormGroup} from 'reactstrap';

class SearchTerm extends Component {
    constructor() {
        super();

        this.state = {
            searchTerm: ''
        }
    }


    handleSearchChange = (e) => {
        console.log(this.state.searchTerm)
        this.setState({
          
                [e.currentTarget.name]: e.currentTarget.value
            
        })
    }


    render () {
    return(
            <Form onSubmit = {this.props.performSearch.bind(null, this.state.searchTerm)}>
                <FormGroup>
                    <Label for="searchTerm">Search</Label>
                    <Input type="search" value ={this.state.searchTerm} name="searchTerm" onChange={this.handleSearchChange} id="searchTerm" placeholder="search here" />
                </FormGroup>
              <input type="submit" value="Submit"/>  
            </Form>
         )    

    }

}

export default SearchTerm;