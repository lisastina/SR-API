import { ProgramContext } from '../contexts/ProgramContext';
import { useContext, useEffect } from 'react';
import { FavouriteContext } from '../contexts/FavouriteContext';

import style from '../css/Program.module.css';
import EpisodeCard from '../components/EpisodeCard';

const Program = (props) => {

  const { singleProgram, getProgramById, episodes, getProgramEpisodes, checkEnding } = useContext(ProgramContext);
  const { addFavouriteProgram, deleteFavouriteProgram, isProgramInFavourites } = useContext(FavouriteContext);
  const { programId } = props.match.params

  useEffect(() => {
    getProgramById(programId)
    getProgramEpisodes(programId)
  }, []);

  useEffect(() => {
    if(singleProgram){
      isProgramInFavourites(singleProgram)
    } 
  }, [singleProgram]);


  const handleAddToFavourites = () => {
    if(isProgramInFavourites(singleProgram)){
      deleteFavouriteProgram(singleProgram.id)
    } else {
      addFavouriteProgram(singleProgram)
    }
  };

  return ( 
    <div>
      {singleProgram && 
      <div className={style.program}>
        <div className={style.header}>
          <div className={style.headerDesc}>
            <div className={style.imgWrapper}>
              <img src={singleProgram.programimage} alt={singleProgram.name}/>
            </div>
            <div className={style.text}>
              <h1>{singleProgram.name}</h1>
              <h3><em>{singleProgram.broadcastinfo}</em></h3>
              <p>{checkEnding(singleProgram.description)}</p>
            </div>
          </div>
          <div className={style.button}>
              <p>Favorit</p>
              {isProgramInFavourites(singleProgram) ?
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
        </div>
        <hr/>
        <div>
          <h2>Avsnitt</h2>
          <div className={style.episodes}>
            {episodes && episodes.map(episode => {
              return(
                <EpisodeCard key={episode.id} episode={episode}/>
                )
              })}
          </div>
        </div>
      </div>
      }
    </div>
   );
}
 
export default Program;