import OtherUser from "../../components/Profile/OtherUser";
import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/loader";
import useUserStore from "../../stores/user";
import {useParams } from "react-router-dom";

const Profile = () => {

  const fetchUser = useUserStore(state => state.fetchUser);
  const data = useUserStore(state => state.user);
  const currentUserLoading = useUserStore(state => state.loading);
  const { id } = useParams();
  const userId = id

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
      console.log(data);
    }
  }, [userId, fetchUser]);

  if (currentUserLoading) return <Loader/>
  console.log(userId)


  return (
      <OtherUser
      profile={data}
      />
  );
};

export default Profile;
