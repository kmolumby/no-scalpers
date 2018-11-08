import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form, Container, Row, Col} from 'reactstrap';


class CreatePost extends Component {
    constructor () {
        super();

        this.state = {
            title: '',
            commentBody: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })

    }

    render () {
        return (

            <div>
                <h2>Create a Post</h2>
                
                      <Container>
                        <Form id="new-post-form" onSubmit={this.props.addPost.bind(null, this.state)}>
                            <Row>
                                <Col sm="12" md={{ size: 6, offset: 3 }}>
                                    <FormGroup>
                                        <Label for="title">Post Title</Label>
                                        <Input type="text"  value = {this.state.title} onChange={this.handleInput} name="title" id="title" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12" md={{ size: 6, offset: 3 }}>
                                    <FormGroup>
                                        <Label for="commentBody">Comment</Label>
                                        <Input type="textarea" value = {this.state.commentBody} onChange={this.handleInput} name="commentBody" id="commentBody" />
                                    </FormGroup>
                                </Col>
                            </Row>            
                        <input type="submit" value="Submit"/>
                     </Form>           
                 </Container>  
            </div>
        )
    }

}
export default CreatePost; 