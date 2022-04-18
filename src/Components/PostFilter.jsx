import React from 'react';
import Myselect from "./UI/select/Myselect";
import MyInput from "./UI/input/MyInput";

const PostFilter = ({filter,setFilter}) => {

    return (
        <div>
            <MyInput value = {filter.query} onChange={e => setFilter({...filter, query: e.target.value})} placeholder="Search..."/>
            <Myselect value = {filter.sort} onChange = {selectedSort => setFilter({...filter, sort: selectedSort})} options = {[{value: 'title', name: 'By title'}, {value: 'body', name: 'by description'}]} defaultValue = "Sort by"/>
        </div>
    );
}

export default PostFilter;