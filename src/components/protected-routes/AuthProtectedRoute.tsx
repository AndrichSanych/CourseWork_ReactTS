import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../../models/CommonModels";
import user from '../../stores/UserStore'
import { observer } from "mobx-react";
 const AuthProtectedRoute: React.FC<ProtectedRouteProps> = observer(({redirectPath = '/login', children}) => {
   if(!user.isAuthorized){
      return <Navigate to={redirectPath} replace />
   }
   return children;
  });
  export default AuthProtectedRoute;