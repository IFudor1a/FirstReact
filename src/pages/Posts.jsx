import React, {useEffect, useRef, useState} from "react";
import {usePosts} from "../hooks/usePost";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../Components/utils/Pages";
import PostService from "../API/PostService";
import PostForm from "../Components/PostForm";
import MyButton from "../Components/UI/button/MyButton";
import MyModal from "../Components/UI/MyModal/MyModal";
import PostFilter from "../Components/PostFilter";
import Pagination from "../Components/UI/Pagination/Pagination";
import Loader from "../Components/UI/Loader/Loader";
import PostList from "../Components/PostList";
import {useObserver} from "../hooks/useObserver";
import Myselect from "../Components/UI/select/Myselect";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(0)
    const lastElement = useRef()
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)


    const [fetchPosts, isPostsLoading, postError] = useFetching( async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data])
        const TotalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(TotalCount, limit))

    })

    useObserver(lastElement, page <totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })


    useEffect(() =>{
        fetchPosts(limit, page)
    }, [page,limit])


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)

    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: "30px"}} onClick = {() => setModal(true)}>Create Post</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{margin: "15px 0"}}/>
            <PostFilter filter = {filter} setFilter={setFilter}/>
            {postError && <h1>Error ${postError}</h1>}
            <Myselect value={limit} onChange={value => setLimit(value)} defaultValue= "Quantity of elements on page" options={[{value: 5, name: '5'},{value: 10, name: '10'},{value: 20, name: '20'},{value: 25, name: '25'},{value: -1, name: 'all'}]}/>
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="List of Posts"/>
            <div ref ={lastElement} style={{height: '20px'}}/>
            {isPostsLoading &&<div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>}
            {/*<Pagination page={page} changePage={changePage} totalPages={totalPages} setPage={setPage}/>*/}
        </div>
    );
}

export default Posts;