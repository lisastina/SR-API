import { createContext, useState } from "react";

export const ChannelContext = createContext();
const ChannelsProvider = (props) => {

const [channels, setChannels] = useState(null);
const [singleChannel, setSingleChannel] = useState(null);
const [schedule, setSchedule] = useState(null);
const [scheduleNow, setScheduleNow] = useState(null);
const [channelScheduleNow, setChannelScheduleNow] = useState(null);

  const getAllChannels = async () => {
    let channels = await fetch("/api/v1/channels");
    channels = await channels.json();

    let filteredChannels = channels.filter(channel => !channel.name.includes("SR Extra"))
    setChannels(filteredChannels)
  };

  const getChannelById = async (channelId) => {
    let channel = await fetch(`/api/v1/channels/${channelId}`);
    channel = await channel.json();
    setSingleChannel(channel);
  }

  const getChannelSchedule = async (channelId, date) => {
    let schedule = await fetch(`/api/v1/schedule/channel/${channelId}${date}`);
    schedule = await schedule.json();
    setSchedule(schedule);
  };

  const getScheduleRightNow = async () => {
    let schedule = await fetch('/api/v1/schedule/rightnow');
    schedule = await schedule.json();
    setScheduleNow(schedule)
  };

  const getScheduleRightNowById = async(channelId) => {
    let schedule = await fetch(`/api/v1/schedule/rightnow/${channelId}`);
    schedule = await schedule.json();
    setChannelScheduleNow(schedule)
  };

const values = {
  channels,
  getAllChannels,
  singleChannel,
  getChannelById,
  schedule,
  getChannelSchedule,
  scheduleNow,
  getScheduleRightNow,
  getScheduleRightNowById,
  channelScheduleNow,
};

return (
  <ChannelContext.Provider value={values}>
    {props.children}
  </ChannelContext.Provider>
);
}

export default ChannelsProvider;