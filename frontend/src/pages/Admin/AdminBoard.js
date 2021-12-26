import React, {useEffect } from "react";
import Loader from "../../components/Loader/loader";
import useUserStore from "../../stores/user";
import useAuthStore from "../../stores/auth"
import UserList from "../../components/AdminBoard/UserList";
import { useNavigate} from "react-router-dom";

const AdminBoard = () => {

  const userStateSelector = (state) => ({
    fetchAllUsers: state.fetchAllUsers,
    fetchCurrentUser: state.fetchCurrentUser,
    deleteUser: state.deleteUser,
    currentUserLoading: state.loading,
    users : state.allUsers,
    currentUser: state.currentUser,
    updateUserRole: state.updateUserRole,
});

  const {fetchAllUsers, fetchCurrentUser, deleteUser, currentUserLoading, users, currentUser, updateUserRole} = useUserStore(userStateSelector);
  const navigate = useNavigate();

  const token = useAuthStore((state) => state.token);
  console.log(token)
  console.log(users)

  useEffect(() => {
    fetchCurrentUser(token);
    if (currentUser?.isAdmin === false) {
      navigate('/posts')
    }
    fetchAllUsers();
    },[fetchAllUsers, fetchCurrentUser])

  if (currentUserLoading) return <Loader/>

  const handleDeleteUser = async (userId) => {
    try {
        console.log(userId, token);
        await deleteUser(userId, token);
    }
    catch (err) {
        console.log(err)
    }
  }

  const handleMakeAdmin = async (userId) => {
    try {
        console.log(userId);
        await updateUserRole(userId, token);
        window.location.reload();
    }
    catch(err) {
        console.log(err)
    }
  }

  return (
    <>
    <UserList
    users={users}
    onDeleteUser={handleDeleteUser}
    onUpdateRole={handleMakeAdmin}
    />
    </>
  );
};

export default AdminBoard;
