import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();
const UserProvider = (props) => {

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    whoami();
  }, [])

  const whoami = async () => {
    let user = await fetch(`/api/v1/users/whoami`);
    user = await user.json();
    setLoggedInUser(user);
  }

  const login = async (userToLogin) => {
    let result = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userToLogin),
    });
    result = await result.json();
    whoami();
    return result;
  };

  const logout = async () => {
    await fetch("/api/v1/users/logout")
    whoami();
  };
  
  const register = async (userToRegister) => {
    let result = await fetch("/api/v1/users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userToRegister),
    });
    result = await result.json();
    login(userToRegister);
    return result;
  };

  const updateUser = async (update) => {
    let result = await fetch(`/api/v1/users/${loggedInUser.userId}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(update)
    });
      result = await result.json();
      login(update);
      return result;
  }


const values = {
 loggedInUser,
 whoami,
 register,
 login,
 logout,
 updateUser,
};

return (
  <UserContext.Provider value={values}>
    {props.children}
  </UserContext.Provider>
);
}

export default UserProvider;