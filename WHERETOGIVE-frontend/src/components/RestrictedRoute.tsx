import { useAuth } from '../../ts/authenticate';

const RestrictedRoute = ({children} : any) => {
    const {currentUser, loading} = useAuth();

    if(!currentUser && !loading){
        return window.location.replace("/login");
    }

    if(currentUser && !loading){
        return children;
    }
    
}

export default RestrictedRoute;