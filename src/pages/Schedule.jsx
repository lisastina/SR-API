import style from '../css/Schedule.module.css';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChannelContext } from '../contexts/ChannelContext'
import ScheduleCard from '../components/ScheduleCard';

const Schedule = (props) => {
  const history = useHistory();

  const { channels, getAllChannels, schedule, getChannelSchedule } = useContext(ChannelContext);
  const [channel, setChannel] = useState(132);
  const [query, setQuery] = useState("");
  const  search  = props.location.search

  useEffect(() => {
    getAllChannels()
    getChannelSchedule(channel, "")
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getChannelSchedule(channel, String(search))
  }, [search, channel]);

  useEffect(() => {
    const params = new URLSearchParams()
    if(query) {
      params.append("date", query)
    }
    else {
      params.delete("date")
    }
    history.push({search: params.toString()})
    
  }, [query, history]);

 const handleDateChange = (e) => {
    setQuery(e.target.value)
  };

  const handleChannelChange = (e) => {
    setChannel(e.target.value)
  };

  return ( 
    <div className={style.schedule}>
      <h1>Tablå</h1>
      <hr/>
      <div className={style.inputs}>
     
        <div className={style.select}>
          <label htmlFor="channels">Kanaler</label>
          <div className="customSelect">
          <select name="channels" id="channels" onChange={handleChannelChange}>
            {channels && channels.map(channel => {
              return(
                <option key={channel.id} value={channel.id}>{channel.name}</option>
                )})}
          </select>
          </div>
        </div>

        <div className={style.date}>
          <label htmlFor="date">Datum</label><br/>
          <input type="date" value={query} onChange={handleDateChange} id="date"/> 
        </div>
      </div>

      <h2>Program {query ? query : "idag"}</h2>
      <ScheduleCard schedule={schedule}/>
    </div>
   );
}
 
export default Schedule;