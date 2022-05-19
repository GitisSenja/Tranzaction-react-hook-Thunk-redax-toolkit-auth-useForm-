import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import getIsAuth from "store/authReduser/getterIsAuth";


const RenderPrivateRoute = ({children}) => {
    const {isAuth} = useSelector(getIsAuth);

    if (isAuth) {
        return children
    }
    return <Navigate to={'/login'}/>
}

export default RenderPrivateRoute;
