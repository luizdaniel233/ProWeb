import fetch from "node-fetch";

async function searchUsers(user) {
  let bool = false;
  let response;
  await fetch(`https://api.github.com/search/users?q=${user}`)
    .then((response) => response.json())
    .then((data) => {
      response = data;
    })
    .catch((err) => {
      console.log(err);
    });
  if (response.items.lenght != 0) {
    response.items.forEach((element) => {
      if (element.login == user) {
        bool = true;
      }
    });
  } else {
    bool = false;
  }
  return bool;
}

let user = process.argv[2];
user = user.replace("./", "");

const request = await searchUsers(user);
console.log(request);
