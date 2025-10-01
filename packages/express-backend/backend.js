// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

// app.get("/users", (req, res) => {
//   res.send(users);
// });

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  let result = users;
  if (name != undefined && job != undefined) {
    result = findUserByNameAndJob(name, job);
  } else if (name != undefined) {
    result = findUserByName(name);
    result = { users_list: result };
  } 

  res.send(result);
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  console.log(req.body)
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

const deleteUser = (id) => {
    users["users_list"] = users["users_list"].filter(
    (user) => user["id"] !== id
  );
}

app.delete("/users/:id", (req, res) => {
  const id = req.params.id; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("User not found.");
  } else {
    deleteUser(id);
    res.send();
  }
});


