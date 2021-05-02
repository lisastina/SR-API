import style from '../css/Home.module.css';
import { useContext, useEffect } from 'react';
import { ChannelContext } from '../contexts/ChannelContext';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();
  const { channels, getAllChannels, getScheduleRightNow, scheduleNow } = useContext(ChannelContext);

  useEffect(() => {
    getAllChannels();
    getScheduleRightNow();
  }, []);

  const handleClick = (channelId) => {
    history.push(`/channels/${channelId}`)
  };

  return ( 
    <div className={style.home}>
      <h1>Lyssna på Sveriges Radio</h1>
      <div className={style.channelCards}>
        {channels && channels.map(channel => {
          if(channel.name === 'P1' || channel.name === 'P2' || channel.name === 'P3' || channel.name === 'P4 Malmöhus'){
            return (
            <div key={channel.id} className={style.channelCard} onClick={() => handleClick(channel.id)}>
              <div className={style.imgWrapper}>
                <img src={channel.image} alt={channel.name}/>
              </div>
              <div className={style.playing}>
                {scheduleNow && scheduleNow.map(schedule => {
                  if(schedule.name === channel.name){

                    return (
                      <div key={schedule.id}>
                      <h3>{schedule.currentscheduledepisode.title}</h3>
                    </div>
                  )}
                })}
                <span>{channel.name} </span>
              </div>
            </div>
          )}
        })}
      </div>
    </div>
   );
}
 
export default Home;