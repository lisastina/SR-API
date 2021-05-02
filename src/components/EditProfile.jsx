import style from '../css/EditProfile.module.css';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';

const EditProfile = (props) => {

  const { loggedInUser, updateUser, whoami } = useContext(UserContext);
  const [email, setEmail] = useState(loggedInUser.email);
  const [userName, setUserName] = useState(loggedInUser.userName);
  const [password, setPassword] = useState("");

  useEffect(() => {
    whoami();
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  };
  const handleNameChange = (e) => {
    setUserName(e.target.value)
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let update = {
      email,
      userName, 
      password,
    }
    if(password && email && userName){
      let result = await updateUser(update)
      whoami();
      if(result.success) {
        props.setEditProfile(false);
      }
    }
  }

  return ( 
    <div className={style.editProfile}>
      <h2>Redigera profil</h2>
      <form action="">
            <label htmlFor="">Email</label>
            <input type="email"
            value={email}
            onChange={handleEmailChange}
            />
            <label htmlFor="">Namn</label>
            <input type="text"
            value={userName}
            onChange={handleNameChange}
            />
            <label htmlFor="">Lösenord</label>
            <input type="password"
            value={password}
            onChange={handlePasswordChange}
            />
            <input type="submit" value="Spara ändringar" onClick={handleSubmit}/>
          </form>
    </div>
   );
}
 
export default EditProfile;