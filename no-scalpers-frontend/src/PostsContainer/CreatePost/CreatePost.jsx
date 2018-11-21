import React, {Component} from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form, Card, CardTitle, CardText, CardBody} from 'reactstrap';


class CreatePost extends Component {
    constructor () {
        super();

        this.state = {
            title: '',
            commentBody: '',
            modal : false, 

        }
        this.toggle = this.toggle.bind(this);
    }

    handleInput = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })

    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
        }
    
        modalShow () {
            this.setState({
                modal: true
            })
        }

    modalClose = () => {
        this.props.addPost.bind(null, this.state);
        this.setState ({
            modal: false
        })
    }

    
   
    
    render () {
        return (

            <div>
                <Card className="post-card">
                        <CardBody>
                            <Button color="info" onClick={this.toggle}>Create a Post</Button>
                        </CardBody>
                    </Card>


                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalBody>
                                    <h1>Post Your Ticket for Sale</h1>
                                <Container>
                                    <form id="new-post-form" onSubmit={this.props.addPost.bind(null, this.state)}>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Label for="title">Post Title</Label>
                                                    <Input type="text"  value = {this.state.title} onChange={this.handleInput} name="title" id="title" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <Label for="commentBody">Comment</Label>
                                                    <Input type="textarea" value = {this.state.commentBody} onChange={this.handleInput} name="commentBody" id="commentBody" />
                                                </FormGroup>
                                            </Col>
                                        </Row>    
                                        <ModalFooter>
                                            <Button input type="submit" value="Submit"color="primary" onClick={this.modalClose} color="primary">Submit</Button>
                                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>          
                                        </ModalFooter>
                                    </form>           
                                </Container>  
                            </ModalBody>
                       
                    </Modal>
            </div>
        )
    }

}
export default CreatePost;