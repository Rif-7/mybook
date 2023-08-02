import { Navigate } from 'react-router-dom';
export default function UserProfile(props) {
  const { user } = props;
  if (!user.firstName) {
    return <Navigate replace to="/facebook-clone/login" />;
  }
  return <div>User Profile</div>;
}
