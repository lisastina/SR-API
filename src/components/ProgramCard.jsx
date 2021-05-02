import style from '../css/ProgramCard.module.css';
import { useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ProgramContext } from '../contexts/ProgramContext';
import { UserContext } from '../contexts/UserContext';
import { FavouriteContext } from '../contexts/FavouriteContext';

  
const ProgramCard = (props) => {
  const history = useHistory();
  const { loggedInUser } = useContext(UserContext);
  const { checkEnding, sliceContent } = useContext(ProgramContext);
  const { addFavouriteProgram, deleteFavouriteProgram, isProgramInFavourites } = useContext(FavouriteContext);
  const program = props.program

  useEffect(() => {
    if(program){
      isProgramInFavourites(program)
    } 
  }, [program]);

  const handleClick = (programId, e) => {
    if(e.target.id !== "button"){
      history.push(`/programs/${programId}`) 
    }
  };

  const handleAddToFavourites = () => {
    if(isProgramInFavourites(program)){
      deleteFavouriteProgram(program.id)
    } else {
      addFavouriteProgram(program)
    }
  }

  return ( 
      <div className={style.programCard} onClick={(e) => handleClick(program.id, e)}>
        <div className={style.card}>
          <div className={style.imgWrapper}>
            <img src={program.programimage} alt={program.name}/>
          </div>
          <div>
            <h3>{program.name}</h3>
            <p>{checkEnding(sliceContent(program.description, 10))}</p>   
          </div>
        </div>

          {loggedInUser &&
          <div className={style.button}>
            {isProgramInFavourites(props.program) ?
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
 
export default ProgramCard;
