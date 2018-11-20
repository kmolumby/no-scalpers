import React, {Component} from 'react';
import CreatePost from './CreatePost/CreatePost';
import PostList from './PostsList/PostsList';
import { Col, Container, Row} from 'reactstrap';
import './PostContainer.css';
import Cookie from 'js-cookie'


class Posts extends Component {
    constructor () {
        super();

        this.state = {
            posts: [],
            // newPost: {
            //     "title": "",
            //     "commentBody": "",
            //     "author": ""
            // }
            
        }
    }

    componentDidMount(){
        this.getToken()
        console.log('GOT TOKEN********')
      }
    

      getToken = async () => {
        const token = await fetch('http://localhost:8000/users/getToken', {
          method: 'get',
          credentials: 'include', // this sends our session cookie with our request
          headers: {
            'Content-Type': 'application/json'
          }
        });
    }


    //get Posts from server
    getPosts = async () => {
        const csrfCookie = Cookie.get('csrftoken');
        const posts = await fetch('http://localhost:8000/post/', {
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfCookie
              }
          
        });
       
        const postsJSON = await posts.json();
        return postsJSON
      }

    // Component Did Mount Check
      componentDidMount(){
        this.getPosts().then((posts) => {
          this.setState({posts: posts.data})

        }).catch((err) => {
          console.log(err);
        })
      }


  
    // Add a Post function to be passed down to child

    addPost = async (post, e) => {

        e.preventDefault();
        console.log(post);

        const csrfCookie = Cookie.get('csrftoken')

        try {
;
              const createdPost = await fetch('http://localhost:8000/post/', {
              method: 'POST',
              body: JSON.stringify(post),
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfCookie
              }

            });
            const parsedPost = await createdPost.json();

            console.log(parsedPost, "<----this is parsed post")
            console.log(parsedPost.status, "<---parsed post status")

            if(createdPost.status === 200){
                this.setState({
                    posts: [...this.state.posts, parsedPost.data]
                })
            }
        
            console.log('getting here')

          
        } catch (err) {

        }

    }


    // Delete Post function 
    deletePost = async (id) => {
        const csrfCookie = Cookie.get('csrftoken');

        try {
          
            const deletedPost = await fetch('http://localhost:8000/post/' + id, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfCookie
                  }
    
            });

            const deletedPostJSON = await deletedPost.json();

            this.setState({posts: this.state.posts.filter((post)=> post.id !== id)})

            console.log(deletedPostJSON)

        } catch (err) {
            console.log(err)

        }
        

    }


    // Edit Post 

  
    
    submitEdit = async (postToEdit) => {
        const csrfCookie = Cookie.get('csrftoken');
        console.log(postToEdit)
            try {
                const editedPost = await fetch ('http://localhost:8000/post/' + postToEdit.id +"/", {
                    method: 'PUT', 
                    credentials: 'include',

                    body: JSON.stringify({

                        title: postToEdit.title,
                        commentBody: postToEdit.commentBody

                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfCookie

                    }
                })
                const editedPostJSON = await editedPost.json();
        
                const newPostArrayWithEdited = this.state.posts.map((post) => {
        
                if(post.id === editedPostJSON.data.id){
                    post = editedPostJSON.data
                }
        
                return post
        
                return post
                });
                this.setState({
                    posts: newPostArrayWithEdited,
                    modal: false
                        })

            } catch (err) {
                console.log(err)
                return err
            }    
        }
    
    
    render() {

        return (
            <Container className="post-container">
                <Row>
                    <Col >  
                      <CreatePost username = {this.props.username} addPost = {this.addPost} />
                    </Col>
                    <Col className="post-list"> 
                        <h1>Recent Ticket Posts</h1>
                        <PostList  username = {this.props.username} deletePost = {this.deletePost} posts={this.state.posts} submitEdit = {this.submitEdit} handleChange = {this.handleChange}/>
                    </Col>

             </Row>
                       
            </Container>
          
        )

    }



}

export default Posts;
