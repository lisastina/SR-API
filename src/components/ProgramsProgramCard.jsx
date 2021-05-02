import style from '../css/ProgramsProgramCard.module.css';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { FavouriteContext } from '../contexts/FavouriteContext';
import { useHistory } from 'react-router-dom';

const ProgramsProgramCard = (props) => {
  const history = useHistory();
  const { loggedInUser } = useContext(UserContext);
  const { addFavouriteProgram, deleteFavouriteProgram, isProgramInFavourites } = useContext(FavouriteContext);
  const program = props.program

  useEffect(() => {
    if(program){
      isProgramInFavourites(program)
    } 
  }, [program]);
  
  const handleClick = (e) => {
    if(e.target.id !== 'button'){
      history.push(`/programs/${props.program.id}`)
    }
  };

  const handleAddToFavourites = () => {
    if(isProgramInFavourites(program)){
      deleteFavouriteProgram(program.id)
    } else {
      addFavouriteProgram(program)
    }
  };

  const channelName = (program) => {
    if (program.channel.name === "[No channel]") {
      return;
      } else {
        return <p>{program.channel.name}</p>
      }
  };

  return ( 
    <div className={style.programCard} onClick={handleClick}>
      <div className={style.card}>
        <div className={style.imgWrapper}>
          <img src={program.programimage} alt={program.name}/>
        </div>
        <div className={style.title}>
          <h4>{program.name}</h4>
            {channelName(program)}
          </div>
        </div>
        {loggedInUser &&
        <div className={style.button}>
          {isProgramInFavourites(program) ?
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
   );
}
 
export default ProgramsProgramCard;