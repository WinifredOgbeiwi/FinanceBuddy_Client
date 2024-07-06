import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../services/slices/userSlice';


const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (auth.user && auth.user._id) {
      dispatch(fetchUserDetails(auth.user._id)); 
    }
  }, [dispatch, auth.user]); 


  // if (user.loading) return <p>Loading...</p>;
  // if (user.error) return <p>Error: {user.error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      {/* {user.userDetails && (
        <div>
          <p>First Name: {user.userDetails.firstName}</p>
          <p>Last Name: {user.userDetails.lastName}</p>
          <p>Email: {user.userDetails.email}</p>
          <p>Occupation: {user.userDetails.occupation}</p>
          <p>Location: {user.userDetails.location}</p>
          <p>Role: {user.userDetails.role}</p>
          <p>Created At: {new Date(user.userDetails.createdAt).toLocaleString()}</p>
          <p>Updated At: {new Date(user.userDetails.updatedAt).toLocaleString()}</p>
        </div>
      )}
      <hr/> */}

    </div>
  );
};

export default Dashboard;
