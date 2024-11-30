'use strict';

const fs = require('fs').promises;

class UserStorage {

  static #getUsers(isAll, fields, data){
    const users = JSON.parse(data);
    if(isAll) return users;
    const newUsers = fields.reduce((newUsers, field) => {
      if(users.hasOwnProperty(field)){
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static getUsers(isAll, ...fields){
    return fs.readFile('./src/databases/users.json')
    .then(data => {
      return this.#getUsers(isAll, fields, data)
    })
    .catch(console.error);
  }

  static getUserInfo(id){
    return fs.readFile('./src/databases/users.json')
    .then((data) => {
      const users = JSON.parse(data);
      const idx = users.id.indexOf(id);
      const userKeys = Object.keys(users);
      const userInfo = userKeys.reduce((newUsers, info) => {
        newUsers[info] = users[info][idx];
        return newUsers;
      }, {})
      return userInfo;
    })
    .catch(console.error);
  }

  static async save(userInfo){
    const users = await this.getUsers(true);
    if(users.id.includes(userInfo.id)){
      throw "이미 존재하는 ID입니다";
    }
    users.id.push(userInfo.id);
    users.psword.push(userInfo.psword);
    users.name.push(userInfo.name);
    fs.writeFile('./src/databases/users.json', JSON.stringify(users))
  }
}

module.exports = UserStorage;