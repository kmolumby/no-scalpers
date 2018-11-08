import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form} from 'reactstrap';

class PostDetail extends Component {
    constructor(props) {
        super(props);

        this.state ={

            modal : false, 
            postToEdit: {
                title: props.post.title,
                commentBody: props.post.commentBody,
                _id: props.post._id
              },

        }
        this.toggle = this.toggle.bind(this);
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
        this.props.submitEdit(
           this.state.postToEdit
        );
        this.setState ({
            modal: false
        })
    }


    handleChange = (e) => {
        this.setState({
            postToEdit: {
                ...this.state.postToEdit,
                [e.currentTarget.name]: e.currentTarget.value
            }
        })
    }

    render() {
        return(

                <div key ={this.props.post._id}>
                    <h3>{this.props.post.title}</h3>
                    <p>{this.props.post.commentBody}</p>
                    <Button color="danger" onClick={this.props.deletePost.bind(null, this.props.post._id)}>Delete</Button>
                    <Button color="success"onClick={this.toggle}>Edit</Button>
                     <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Post</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="title">Post Title</Label>
                                    <Input type="text"  onChange={this.handleChange} name="title" id="title" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="commentBody">Comment</Label>
                                    <Input type="textarea"  onChange={this.handleChange} name="commentBody" id="commentBody" />
                                </FormGroup>
                            </Form>  
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.modalClose}>Submit</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                 </div>      
        )
    }



}

export default PostDetail; 