import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Error from '../pages/Error'
import Login from "../pages/Login";
export const publicRoutes = [
    {path: '*', element: Login},
    {path: '/login', element: Login},
]
export const privateRoutes = [
    {path: '/', element: Posts},
    {path: '/about', element: About},
    {path: '/posts', element: Posts},
    {path: '*', element: Error},
    {path: '/posts/:id', element: PostIdPage},
]