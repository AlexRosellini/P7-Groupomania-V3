/*************************************************/
//On Importe ce dont on a besoin.

import OtherUser from "../../components/Profile/OtherUser";
import React, { useEffect } from "react";
import Loader from "../../components/Loader/loader";
import useUserStore from "../../stores/user";
import {useParams } from "react-router-dom";

/*************************************************/
//Notre Page

const Profile = () => {

  const fetchUser = useUserStore(state => state.fetchUser); //On recupère données du store.
  const data = useUserStore(state => state.user); //On recupère données du store
  const currentUserLoading = useUserStore(state => state.loading); //on recupère données du store
  const { id } = useParams(); //On set l'id depuis l'URL.
  const userId = id 

  useEffect(() => {
    if (userId) { //Si on à une userId.
      fetchUser(userId);  //on fetch l'user depuis l'userId.
    }
  }, [userId, fetchUser]);

  if (currentUserLoading) return <Loader/> //Si loading, on renvoie le loader.
  console.log(userId)


  return (
      <OtherUser
      profile={data} //On envoie les données vers le component
      />
  );
};

export default Profile;
