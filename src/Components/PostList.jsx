import React from 'react';
import PostItem from "./PostItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";

const PostList = ({posts, title, remove}) => {
    if(!posts.length) {
        return (
            <div style={{textAlign: 'center', color: 'teal', fontSize: '18px', fontWeight: '700'}}>Posts doesn't found!</div>
        )
    }
    return (
        <div>
            <h1 style={{textAlign: 'center', color: "Teal"}}>{title}</h1>
            <TransitionGroup>
            {posts.map((post,index)=>
                <CSSTransition
                    key={post.id}
                    timeout={1000}
                    classNames="post"
                    onEntered = {(node) =>{
                     node.classList.add("active")
                    }}>
                <PostItem remove={remove} number= {index + 1} post={post}/>
                </CSSTransition>
            )}
            </TransitionGroup>
        </div>);
};

export default PostList;