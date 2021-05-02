import style from '../css/EpisodeCard.module.css';
import { useContext } from 'react';
import { ProgramContext } from '../contexts/ProgramContext';

const EpisodeCard = (props) => {
  const { checkEnding } = useContext(ProgramContext);
  const episode = props.episode;

  const duration = (time) => {
    const duration = Math.ceil(time/60);
    if(duration > 60) {
      return `1 h ${duration - 60} min` 
    }
    else {
      return duration + " min"
    }
  }

  return ( 
    <div className={style.episodeCard}>
      <div className={style.container}>

        <div className={style.imgWrapper}>
          <img src={episode.imageurltemplate} alt={episode.title}/>
        </div>
        <div className={style.desc}>
          <h2>{episode.title}</h2>
          <p>{episode.publishdateutc}</p>
          <p>{episode.downloadpodfile && duration(episode.downloadpodfile.duration)}</p>
          <p>{checkEnding(episode.description)}</p>
          
        </div>
      </div>
    </div>
   );
}
 
export default EpisodeCard;