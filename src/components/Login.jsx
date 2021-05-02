import style from '../css/Login.module.css';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';


const Login = () => {

  const { register, login } = useContext(UserContext);

  const [alreadyAUser, setAlreadyAUser] = useState(true);

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  };
  const handleNameChange = (e) => {
    setUserName(e.target.value)
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let newUser = {
      email,
      userName, 
      password
    };
    if(alreadyAUser){
      login(newUser);
    }
    if(!alreadyAUser) {
      register(newUser);    
    }
  }

  return ( 
      <div className={style.login}>
        {alreadyAUser ? 
        <div>
          <h1>Logga in</h1>
          <form action="">
            <label htmlFor="">Email</label>
            <input type="email"
            value={email}
            onChange={handleEmailChange}
            />
            <label htmlFor="">Lösenord</label>
            <input type="password"
            value={password}
            onChange={handlePasswordChange}
            />
            <input type="submit" value="Logga in" onClick={handleSubmit}/>
          </form>
          <p onClick={(e) => {e.preventDefault()
            setAlreadyAUser(false)}}>Inte medlem? Skapa ett konto </p>
        </div> :
        <div>
          <h1>Registrera konto</h1>
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
            <input type="submit" value="Skapa konto" onClick={handleSubmit}/>
          </form>
          <p onClick={(e) => {e.preventDefault()
            setAlreadyAUser(true)}}>Redan medlem? Logga in </p>
        </div> 
        }
        
      </div>
   );
}
 
export default Login;