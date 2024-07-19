import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../../models/CommonModels";
import user from '../../stores/UserStore'
import { observer } from "mobx-react";
 const AdminProtectedRoute: React.FC<ProtectedRouteProps> = observer(({redirectPath = '/login', children}) => {
   if(user.isAuthorized){
      if(!user.isAdmin){
        redirectPath = '/forbiden'
      }
      else{
        return children;
      } 
    }
    return <Navigate to={redirectPath} replace />
  });
  export default AdminProtectedRoute;