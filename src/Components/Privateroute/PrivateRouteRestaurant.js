import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


export default function PrivateRouteRestaurant(){
    const authLoggedIn =useSelector((state) => state.siteauth.authLoggedIn);

    return(
        authLoggedIn?<Outlet />:<Navigate to='/restaurant-login' />
    )
}