import React from 'react';
import PostDetail from './PostDetail/PostDetail'

const PostsList = (props) => {
    const posts = props.posts.map((post) => {
        return (
            <PostDetail key= {post._id} post={post} deletePost= {props.deletePost} submitEdit={props.submitEdit} />
        )
    })

    return (
        <div>
            {posts}
        </div>
    )
}


export default PostsList;


