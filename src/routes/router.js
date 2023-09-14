import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import Home from '../components/Home/Home';
import Login from '../components/Pages/Login';
import Register from '../components/Pages/Register';
import Donation from '../components/Pages/Donation';
import Blog from '../components/Pages/Blog';
import ErrorPage from '../components/Pages/ErrorPage';
import Event from '../components/Pages/EventPage/Event';
import AddEvent from '../components/Pages/EventPage/AddEvent';
import Profile from '../components/Pages/Profile';
import EventUpdate from '../components/Pages/EventPage/EventUpdate';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                // loader: () => fetch('https://volunteer-network-server-dusky.vercel.app/data')
            },
            {
                path: '/home',
                element: <Home></Home>,
                // loader: () => fetch('https://volunteer-network-server-dusky.vercel.app/data')
            },
            {
                path: '/donation',
                element: <Donation></Donation>,
            },
            {
                path: '/events',
                element: <PrivateRoute><Event></Event></PrivateRoute>,
                loader: () => fetch('https://volunteer-network-server-dusky.vercel.app/user')
            },
            {
                path: '/blog',
                element: <Blog></Blog>,
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <Register></Register>,
            },
            {
                path: '/addevent',
                element: <PrivateRoute><AddEvent></AddEvent></PrivateRoute>,
                loader: () => fetch('https://volunteer-network-server-dusky.vercel.app/user')
            },
            {
                path: '/update/:id',
                element: <PrivateRoute><EventUpdate></EventUpdate></PrivateRoute>,
                loader: ({ params }) => fetch(`https://volunteer-network-server-dusky.vercel.app/event/${params.id}`)
            },
        ]
    },
]);

