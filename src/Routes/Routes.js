import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Blog from "../Pages/Blog/Blog";
import MyCart from "../Pages/MyCart/MyCart";
import MyProfile from "../Pages/MyProfile/MyProfile";
import Login from "../Pages/Login/Login/Login";
import Register from "../Pages/Login/Register/Register";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";
import ProductPage from "../Pages/ProductPage/ProductPage";
import MyWishlist from "../Pages/MyWishlist/MyWishlist";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AdminLayout from "../Layouts/AdminLayout";
import Admins from "../Pages/Admin/Admins/Admins";
import Users from "../Pages/Admin/Users/Users";
import ProductsList from "../Pages/Admin/ProductsList/ProductsList";
import AddProduct from "../Pages/Admin/AddProduct/AddProduct";
import BlogPosts from "../Pages/Admin/BlogPosts/BlogPosts";
import AddBlogPost from "../Pages/Admin/AddBlogPost/AddBlogPost";
import Orders from "../Pages/Admin/Orders/Orders";
import Messages from "../Pages/Admin/Messages/Messages";
import Post from "../Pages/Blog/Post";
import MyOrders from "../Pages/MyOrders/MyOrders";
import PayNow from "../Pages/MyCart/PayNow/PayNow";
import MyOrder from "../Pages/MyOrders/MyOrder";
import TermsOfUse from "../Pages/Legal/TermsOfUse";
import PrivacyPolicy from "../Pages/Legal/PrivacyPolicy";
import CookiePolicy from "../Pages/Legal/CookiePolicy";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/home",
                element: <Home />
            },
            // getting to products page query and category filter
            {
                path: "/productspage",
                element: <ProductPage />,
            },
            {
                path: "/productspage/:searchText",
                element: <ProductPage />,
                loader: ({ params }) => (params.searchText)
            },
            // products related routes and navigations
            {
                path: "/product/:id",
                loader: ({ params }) => fetch(`http://localhost:5000/product/${params.id}`),
                element: <ProductDetail />
            },
            // nav items navigations
            {
                path: "/aboutus",
                element: <AboutUs />
            },
            {
                path: "/contactus",
                element: <ContactUs />
            },
            {
                path: "/blog",
                element: <Blog />
            },
            {
                path: "/blog/:id",
                element: <Post />,
                loader: ({ params }) => fetch(`http://localhost:5000/blogs/blog/${params.id}`)
            },
            {
                path: "/mycart",
                element: <PrivateRoute><MyCart /></PrivateRoute>
            },
            {
                path: "/mycart/paynow",
                element: <PrivateRoute><PayNow /></PrivateRoute>
            },
            {
                path: "/mywishlist",
                element: <PrivateRoute><MyWishlist /></PrivateRoute>
            },
            {
                path: "/myorders",
                element: <PrivateRoute><MyOrders /></PrivateRoute>
            },
            {
                path: "/myorders/:id",
                element: <MyOrder />,
                loader: ({ params }) => fetch(`http://localhost:5000/orders/myorders/${params.id}`)
            },
            {
                path: "myprofile",
                element: <PrivateRoute><MyProfile /></PrivateRoute>
            },
            // logging routes
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            // !footer links
            // legals
            {
                path: "/termsofuse",
                element: <TermsOfUse />
            },
            {
                path: "/privacypolicy",
                element: <PrivacyPolicy />
            },
            {
                path: "/cookiepolicy",
                element: <CookiePolicy />
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminRoute><AdminLayout /></AdminRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/admin",
                element: <Orders />
            },
            {
                path: "/admin/orders/all",
                element: <Orders />
            },
            {
                path: "/admin/admins/all",
                element: <Admins />
            },
            {
                path: "/admin/users/all",
                element: <Users />
            },
            {
                path: "/admin/products/all",
                element: <ProductsList />
            },
            {
                path: "/admin/products/add",
                element: <AddProduct />
            },
            {
                path: "/admin/blogs/all",
                element: <BlogPosts />
            },
            {
                path: "/admin/blogs/add",
                element: <AddBlogPost />
            },
            {
                path: "/admin/messages/all",
                element: <Messages />
            }
        ]
    }
]);
