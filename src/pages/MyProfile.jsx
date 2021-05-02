import style from '../css/MyProfile.module.css';
import Login from '../components/Login';
import EditProfile from '../components/EditProfile';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import MyProfileCard from '../components/MyProfileCard';
import { FavouriteContext } from '../contexts/FavouriteContext';
import NoFavourites from '../components/NoFavourites';
import ScheduleCard from '../components/ScheduleCard';
import { ChannelContext } from '../contexts/ChannelContext'


const MyProfile = () => {

const { whoami, loggedInUser, logout } = useContext(UserContext);
const { favouriteChannels, getFavouriteChannels, favouritePrograms, getFavouritePrograms } = useContext(FavouriteContext);
const [editProfile, setEditProfile] = useState(false);
const { schedule, getChannelSchedule } = useContext(ChannelContext);
const [channelId, setChannelId] = useState();
  useEffect(() => {
    whoami(); 
    if(favouriteChannels.length > 0){
      getChannelSchedule(favouriteChannels[0].channelId, "")
    }
  }, []);

  useEffect(() => {
    if(loggedInUser){
      getFavouriteChannels(loggedInUser.userId);
      getFavouritePrograms(loggedInUser.userId);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if(favouriteChannels.length > 0){
      getChannelSchedule(favouriteChannels[0].channelId, "")
    }
  }, [favouriteChannels]);

  const handleChannelChange = (e) => {
    setChannelId(e.target.value)
  };

  useEffect(() => {
    if(channelId){
      getChannelSchedule(channelId, "")
    }
  }, [channelId]);

  return ( 
    <div className={style.myProfile}>
      {loggedInUser ? 
      <div>
        <div className={style.headerText}>
          <h1>Min profil</h1>
          <div className={style.userName}>
            <h3>{loggedInUser.userName}</h3>
            <div className={style.buttons}>
              <button
              onClick={() => logout()}
              >Logga ut</button>
              {!editProfile && 
              <button
              onClick={() => setEditProfile(true)}
              >Redigera Profil</button>
              }
            </div>
          </div>
        </div>
      <hr/>
      {editProfile ? <EditProfile setEditProfile={setEditProfile}/> :

      <div className={style.content}>
        <h2>Mina favoriter</h2>
        <div className={style.favourites}>
          <div className={style.favouriteChannels}>
            <h3>Kanaler</h3>
            {favouriteChannels.length ? 
              favouriteChannels.map(channel => {
                return(
                  <MyProfileCard key={channel.channelId} item={channel}/>
                  )})
            :
            <NoFavourites item="kanaler" type="channels"/>
            }
          </div>
          <div className={style.favouritePrograms}>
            <h3>Program & poddar</h3>
            {favouritePrograms.length ? favouritePrograms.map(program => {
              return(
                <MyProfileCard key={program.programId} item={program}/>
                )})
            :
            <NoFavourites item="program" type="programs"/>
            }
            
          </div>
        </div>
        {favouriteChannels.length > 0 &&
        <div>
          <h2>Program idag</h2>
          <div className={style.select}>
            <label htmlFor="channels">Kanaler</label>
            <div className="customSelect">
            <select name="channels" id="channels" onChange={handleChannelChange}>
              {favouriteChannels && favouriteChannels.map(channel => {
                return(
                  <option key={channel.channelId} value={channel.channelId}>{channel.name}</option>
                  )})}
            </select>
            </div>
          </div>
          <ScheduleCard schedule={schedule}/>
        </div> 
        }
      </div>
      }
      </div>
      :
      <Login/>
      }
    </div>
   );
}
 
export default MyProfile;