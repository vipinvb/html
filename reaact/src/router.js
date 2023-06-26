import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/auth/Login";
import Addmedicine from "./components/Addmedicine";
import Editmedicine from "./components/Editmedicine";
import Searchmedicine from "./components/Searchmedicine";
import Signup from "./components/auth/Signup";
import ViewPost from "./components/viewPost";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'post/create', element: <Addmedicine/>},
    { path: '/posts/search', element: <Searchmedicine/>},
    {path : 'posts/edit/:postId/edit', element: <Editmedicine/>},
    {path :'posts/viewPost/:postId/', element: <ViewPost/>},
    { path: 'Signup', element:<Signup/>},
    { path: '/login', element:<Login/>},
]);

export default router;