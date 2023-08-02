import { Navigate } from 'react-router-dom';

export default function HomePage(props) {
  const { user } = props;
  if (!user.firstName) {
    return <Navigate replace to="/facebook-clone/login" />;
  }
  return <h1>Homepage</h1>;
}
