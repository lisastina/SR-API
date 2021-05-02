import style from '../css/MyProfileCard.module.css';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { ProgramContext } from '../contexts/ProgramContext';
import { FavouriteContext } from '../contexts/FavouriteContext';

  
const MyProfileCard = (props) => {
  const history = useHistory();
  const { checkEnding, sliceContent } = useContext(ProgramContext);
  const { deleteFavouriteChannel, deleteFavouriteProgram } = useContext(FavouriteContext);

  const item = props.item

  const handleClick = (e) => {
    if(e.target.id !== "button"){
      if(props.item.programId){
        history.push(`/programs/${props.item.programId}`) 
      }
      if(props.item.channelId){
        history.push(`/channels/${props.item.channelId}`) 
      }
    }
  }

  const handleDelete = () => {
    if(props.item.programId){
      deleteFavouriteProgram(props.item.programId)
    }
    if(props.item.channelId){
      deleteFavouriteChannel(props.item.channelId);
    }
  };

  return ( 
      <div className={style.itemCard} id={item.programId} onClick={handleClick}>
        <div className={style.card}>
          <div className={style.imgWrapper}>
            <img src={item.image} alt={item.name}/>
          </div>
          <div>
            <h3>{item.name}</h3>
            <p>{checkEnding(sliceContent(item.description, 15))}</p>   
          </div>
        </div>

        <div className={style.button}>
          <button id="button"
          onClick={handleDelete}
          >+</button>
        </div>
      </div>
   );
}
 
export default MyProfileCard;
