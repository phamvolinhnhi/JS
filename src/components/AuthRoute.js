//Dashboard cannot be accesse unless logged in
import { Route, Navigate, Outlet } from "react-router-dom";
import {connect} from 'react-redux';

const AuthRoute = ({children, authenticated,...rest}) => {
    // return(
    //     <Route {...rest}
    //         render = {
    //             ({location}) => authenticated ? (children) : (
    //                 <Navigate
    //                     to={{
    //                         pathname: "/login",
    //                         state: {from: location}
    //                     }}
    //                 />
    //             )
    //         }
    //     />
    // )
    const auth = authenticated; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? (children) : <Navigate to="/login" />;
}

const mapStateToProps = ({session}) => ({
    authenticated: session.authenticated
})
export default connect(mapStateToProps)(AuthRoute);