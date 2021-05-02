import { useHistory } from 'react-router-dom';
import style from '../css/NoFavourites.module.css';
const NoFavourites = (props) => {
  const history = useHistory();

  const buttonClick = () => {
    if(props.item === "program"){
      history.push('/programs') 
    }
    if(props.item === "kanaler") {
      history.push('/channels') 
    }
  };

  return ( 
    <div className={style.noFavourites}>
      <h3>Du har inga favoriter...</h3>
      <p>Ta en titt på alla våra {props.item}!</p>
      <button
      onClick={buttonClick}
      >{props.item}</button>
    </div>
   );
}
 
export default NoFavourites;