import { useContext, useEffect } from 'react';
import { ChannelContext } from '../contexts/ChannelContext';
import { ProgramContext } from '../contexts/ProgramContext';
import { UserContext } from '../contexts/UserContext';
import style from '../css/Channel.module.css';
import ProgramCard from '../components/ProgramCard';
import { FavouriteContext } from '../contexts/FavouriteContext';

const Channel = (props) => {

  const { singleChannel, getChannelById } = useContext(ChannelContext);
  const { programs, getAllProgramsByChannel } = useContext(ProgramContext);
  const { loggedInUser } = useContext(UserContext);
  const { addFavouriteChannel, deleteFavouriteChannel, isChannelInFavourites } = useContext(FavouriteContext);
  const { channelId } = props.match.params

  useEffect(() => {
    getChannelById(channelId)
    getAllProgramsByChannel(channelId)
  }, []);

  useEffect(() => {
    if(singleChannel){
      isChannelInFavourites(singleChannel)
    } 
  }, [singleChannel]);

  const handleAddToFavourites = () => {
    if(isChannelInFavourites(singleChannel)){
      deleteFavouriteChannel(singleChannel.id)
    } else {
      addFavouriteChannel(singleChannel)
    }
  };   

  return ( 
    <div className={style.channel}>
      {singleChannel && 
      <div>

          <div className={style.header}>
            <div className={style.text}>
              <h1>{singleChannel.name}</h1>
              <p>{singleChannel.tagline}</p>
            </div>
              {loggedInUser &&
              <div className={style.button}>
                <p>Favorit</p>
                {isChannelInFavourites(singleChannel) ?
                <button id="button"
                className={style.inFavourites}
                onClick={handleAddToFavourites}
                >+</button>
                : 
                <button id="button"
                className={style.notInFavourites}
                onClick={handleAddToFavourites}
                >+</button> 
                }
              </div>
              }
          </div>

          <hr/>
        <div className={style.programCards}>
          {programs && programs.map(program => {
            return(
              <ProgramCard key={program.id} program={program}/>
            )
          })
        }
      </div>
    </div>
    }
    </div>
   );
}

export default Channel;