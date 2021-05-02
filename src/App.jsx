import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ChannelContext from './contexts/ChannelContext';
import ProgramContext from './contexts/ProgramContext';
import UserContext from './contexts/UserContext';
import FavouriteContext from './contexts/FavouriteContext';
import Channel from './pages/Channel';
import Channels from './pages/Channels';
import Programs from './pages/Programs';
import Schedule from './pages/Schedule'
import Program from './pages/Program';
import MyProfile from './pages/MyProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ChannelContext>
          <ProgramContext>
            <UserContext>
              <FavouriteContext>
                <Navbar />
                <div className="site-container">
                <Route exact path="/" component={Home}/>
                <Route exact path="/channels" component={Channels}/>
                <Route exact path="/channels/:channelId" component={Channel}/>
                <Route exact path="/programs" component={Programs}/>
                <Route exact path="/programs/:programId" component={Program}/>
                <Route exact path="/schedule" component={Schedule}/>
                <Route exact path="/myprofile" component={MyProfile}/>
                </div>
              </FavouriteContext>
            </UserContext>
          </ProgramContext>
        </ChannelContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
