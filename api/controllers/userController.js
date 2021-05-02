const sqlite3 = require("sqlite3");
const path = require("path");
const Encrypt = require("../Encrypt");

const db = new sqlite3.Database(path.join(__dirname, "../../srDatabase.db"));


const whoami = (req, res) => {
  res.json(req.session.user || null);
};
const login = (req, res) => {
  
  let query = /* sql */ `SELECT * FROM users WHERE email = $email`;
  let params = { $email: req.body.email };
  db.get(query, params, (err, userInDB) => {
    if(!userInDB){
      res.status(401).json({error: "Bad credentials"});
      return;
    }

    req.body.password = Encrypt.encrypt(req.body.password);
    if(userInDB.password === req.body.password) {
      delete userInDB.password;
       req.session.user = userInDB
       res.json({success: "Logged in successfully", loggedInUser: userInDB});
       return;
    } else {
      res.status(401).json({error: "Bad credentials"});
      return;
    }
  });
};

const logout = (req, res) => {
  delete req.session.user;
  res.json({success: "Logged out successfully"});
};

// 
const register = (req, res) => {
  let userToRegister = req.body;

  let query = /*sql*/ `SELECT * FROM users WHERE email = $email`;
  let params = { $email: userToRegister.email };

  db.get(query, params, (err, result) => {
    if (result) {
      res.json({ error: "A user with that email already exists" });
    } else {
      userToRegister.password = Encrypt.encrypt(userToRegister.password);
      query = /*sql*/ `INSERT INTO users (userName, email, password) VALUES ($userName, $email, $password)`;
      params = {
        $userName: userToRegister.userName,
        $email: userToRegister.email,
        $password: userToRegister.password,
      };
      db.run(query, params, function (err) {
        if (err) {
          res.status(400).json({ error: err });
          return;
        }
        res.json({ success: "User register successfull", lastID: this.lastID });
      });
    }
  });
};

const updateuser = (req, res) => {
  let user = req.body
  user.password = Encrypt.encrypt(user.password)
  let query = /* sql */ `UPDATE users SET userName = $userName, email = $email, password = $password WHERE userId = $id `;
  let params = {
    $userName: user.userName,
    $email: user.email,
    $password: user.password,
    $id: req.params.userId,
  };
  db.run(query, params, function (err) {
    res.json({ success: "User updated successfully", changes: this.changes })
  });
};

module.exports = {
  whoami,
  login,
  logout,
  register,
  updateuser
};