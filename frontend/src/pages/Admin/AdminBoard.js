import OtherUser from "../../components/Profile/OtherUser";
import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/loader";
import useUserStore from "../../stores/user";
import useAuthStore from "../../stores/auth"
import UserList from "../../components/AdminBoard/UserList";


const AdminBoard = () => {

  const fetchAllUsers = useUserStore(state => state.fetchAllUsers);
  const deleteUser = useUserStore(state => state.deleteUser);
  const currentUserLoading = useUserStore(state => state.loading);
  const users = useUserStore(state => state.allUsers);
  const updateUserRole = useUserStore(state => state.updateUserRole)
  const token = useAuthStore((state) => state.token);
  console.log(users)

  useEffect(() => {
    fetchAllUsers();
    },[fetchAllUsers])

  if (currentUserLoading) return <Loader/>

  const handleDeleteUser = async (userId) => {
    try {
        console.log(userId, token)
        await deleteUser(userId, token)
    }
    catch (err) {
        console.log(err)
    }
  }

  const handleMakeAdmin = async (userId) => {
    try {
        console.log(userId)
        await updateUserRole(userId, token)

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
