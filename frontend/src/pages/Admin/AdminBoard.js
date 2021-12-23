import React, {useEffect } from "react";
import Loader from "../../components/Loader/loader";
import useUserStore from "../../stores/user";
import useAuthStore from "../../stores/auth"
import UserList from "../../components/AdminBoard/UserList";

const AdminBoard = () => {

  const userStateSelector = (state) => ({
    fetchAllUsers: state.fetchAllUsers,
    deleteUser: state.deleteUser,
    currentUserLoading: state.loading,
    users : state.allUsers,
    updateUserRole: state.updateUserRole,
});

const {fetchAllUsers, deleteUser, currentUserLoading, users, updateUserRole} = useUserStore(userStateSelector);

  const token = useAuthStore((state) => state.token);
  console.log(users)

  useEffect(() => {
    fetchAllUsers();
    },[fetchAllUsers])

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
