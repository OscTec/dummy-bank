import { Navigate, useLocation } from 'react-router-dom';

import { getCurrentUser } from '../../services/authService';

interface Props {
  element: React.FunctionComponent,
  props?: any,
}

const ProtectedRoute = ({ element: Element, props }: Props) => {
  let location = useLocation();

  if (!getCurrentUser()) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  return <Element {...props} />
}


export default ProtectedRoute
