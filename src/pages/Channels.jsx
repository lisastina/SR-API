import { useContext, useEffect } from 'react';
import { ChannelContext } from '../contexts/ChannelContext';
import { useHistory } from 'react-router-dom';
import style from '../css/Channels.module.css';

const Channels = () => {
  const history = useHistory();
  const { channels, getAllChannels } = useContext(ChannelContext);

  const handleClick = (channelId) => {
    history.push(`/channels/${channelId}`)
  };

  useEffect(() => {
    getAllChannels();
  }, []);

  return ( 
    <div className={style.channels}>
      <h1>Kanaler</h1>
      <hr/>
      <div className={style.channelCards}>
        {channels && channels.map(channel => {
          return (
          <div key={channel.id} className={style.channelCard} onClick={() => handleClick(channel.id)}>
            <div className={style.imgWrapper}>
              <img src={channel.image} alt={channel.name}/>
            </div>
              <h3>{channel.name}</h3>
          </div>
        )})}
      </div>
    </div>
   );
}
 
export default Channels;