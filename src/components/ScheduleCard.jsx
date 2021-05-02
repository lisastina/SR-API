import style from '../css/ScheduleCard.module.css'

const ScheduleCard = (props) => {
  return ( 
      <div className={style.scheduleCard}>
        {props.schedule &&
        <div>
          <div>
            <h3>{props.schedule[0].channel.name}</h3>
            <hr/>
          </div>
          <div className={style.programs}>
        {props.schedule.map(program => {
        return(
          <div className={style.program} key={program.starttime}>
            <p><strong>{program.starttimeutc.slice(11)}</strong> {program.title} {program.subtitle}</p>
          </div>
                  )
                })}
            </div>
        </div>
        }
      </div>
   );
}
 
export default ScheduleCard;