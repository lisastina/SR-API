import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from './UserContext';

export const FavouriteContext = createContext();
const FavouriteProvider = (props) => {

  const { loggedInUser } = useContext(UserContext);

  const [favouritePrograms, setFavouritePrograms] = useState([]);
  const [favouriteChannels, setFavouriteChannels] = useState([]);

  useEffect(() => {
    if(loggedInUser){
      getFavouriteChannels(loggedInUser.userId)
      getFavouritePrograms(loggedInUser.userId)
    }
  }, [loggedInUser]);

 const getFavouriteChannels = async () => {
    let channels = await fetch(`/api/v1/favourite/channels/${loggedInUser.userId}`);
    channels = await channels.json();
    setFavouriteChannels(channels);
  };

  const getFavouritePrograms = async () => {
    let programs = await fetch(`/api/v1/favourite/programs/${loggedInUser.userId}`);
    programs = await programs.json();
    setFavouritePrograms(programs);
  };


 const addFavouriteChannel = async (channel) => {
   let result = await fetch(`/api/v1/favourite/channels/${loggedInUser.userId}`, {
     method: "POST",
     headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(channel)
   });
   result = await result.json();
   if(loggedInUser){
     await getFavouriteChannels(loggedInUser.userId)
   }
   return result;
 };

 const addFavouriteProgram = async (program) => {
   let result = await fetch(`/api/v1/favourite/programs/${loggedInUser.userId}`, {
     method: "POST",
     headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(program)
   });
   result = await result.json();
   if(loggedInUser){
     await getFavouritePrograms(loggedInUser.userId)
   }
   return result;
 };

 const deleteFavouriteChannel = async (channelId) => {
  /* let result =  */await fetch(`/api/v1/favourite/channels/${loggedInUser.userId}/${channelId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  getFavouriteChannels(loggedInUser.userId)
 };

 const deleteFavouriteProgram = async (programId) => {
  /* let result =  */await fetch(`/api/v1/favourite/programs/${loggedInUser.userId}/${programId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  getFavouritePrograms(loggedInUser.userId)
 };

 const isChannelInFavourites = (item) => {
  const isInFavourites = favouriteChannels.some(channel => channel.channelId === item.id)
  return isInFavourites;
 };

 const isProgramInFavourites = (item) => {
  const isInFavourites = favouritePrograms.some(program => program.programId === item.id)
  return isInFavourites;
 };


const values = {
  getFavouriteChannels,
  favouriteChannels,
  getFavouritePrograms,
  favouritePrograms,
  addFavouriteChannel,
  addFavouriteProgram,
  deleteFavouriteChannel,
  deleteFavouriteProgram,
  isChannelInFavourites,
  isProgramInFavourites,
};

return (
  <FavouriteContext.Provider value={values}>
    {props.children}
  </FavouriteContext.Provider>
);
}

export default FavouriteProvider;