import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


export default function PrivateRouteDeliveryPartner(){
    const authLoggedIn =useSelector((state) => state.siteauth.authLoggedIn);

    return(
        authLoggedIn?<Outlet />:<Navigate to='/delivery-partner-login' />
    )
}