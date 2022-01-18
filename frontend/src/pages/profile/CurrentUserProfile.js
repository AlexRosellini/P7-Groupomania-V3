/*************************************************/
//On Importe ce dont on a besoin.

import {useEffect} from 'react';
import CurrUserProfile from '../../components/Profile/CurrUserProfile';
import Loader from "../../components/Loader/loader";
import useAuthStore from '../../stores/auth';
import useUserStore from '../../stores/user';
import { useAlert } from "react-alert";

/*************************************************/
//Notre page

const Profile = () => { 
    const userStateSelector = (state) => ({ //On set un stateSelector pour recupérer les données du store.
      data: state.currentUser,
      fetchCurrentUser: state.fetchCurrentUser,
      updateUserDesc: state.updateUserDesc,
      updateUserPicture: state.updateUserPicture,
      currentUserLoading: state.loading,
  });

  const alert = useAlert(); //On set les alertes.
  const {data, fetchCurrentUser, updateUserDesc, updateUserPicture, currentUserLoading} = useUserStore(userStateSelector);
    const token = useAuthStore(state => state.token); //On recupère token de AuthStore
    const userId = data?.id //on set userId depuis Data du userStateSelector.

  useEffect(() => {
      fetchCurrentUser(); //On fetchCurrentUser 
  },[userId, fetchCurrentUser]) 

  if (currentUserLoading) return <Loader/>
  
  const handleDesc = (description) => { //Fonction pour gêrer le changement de description.    
      try { 
         if (description.length > 150) { //On donne une limite pour la description
          alert.show('Votre description doit faire moins de 150 caractères') //Si au dessus, on lance une alerte.
         } else {
          updateUserDesc(userId, token, description) //Sinon on update depuis le store.         
          window.location.reload(); //On reload ensuite la page
         }
      }
      catch (error) {
          console.log(error) //Si érreur, on log l'érreur.
      }
  }

  const handlePic = (formData) => { //Fonction pour le changement de photo.
      try {    
          updateUserPicture( userId, token, formData) //On update depuis le store
          window.location.reload(); //et on recharge la page.
      }
      catch(error) {
          console.log(error) //On log une érreur si ça marche.
      } 
  }
  return (
    <>
      <CurrUserProfile //On envoie les données vers le component
      profile = {data}
      onDescChange= {handleDesc}  
      onPicChange={handlePic}
      />
    </>
  );
};

export default Profile;
