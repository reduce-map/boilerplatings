const User = require('../../models/User').User;


async function findAllUser() {
  return await User.find({}, (err, user) => {
        if (err) throw err;
        console.log(user);
        return user;
    })
}


async function findUser(searchValue) {
   return await User.findOne(searchValue, (err, user) => {
        if (err) throw err;
        return user;
    })
}

async function findUserById(userId) {
   return await User.findById({_id: userId}, (err, doc) => {
        if (err) throw err;
        console.log(doc);
        return doc;
    })
}

module.exports = {
    all: findAllUser,
    one: findUser,
    byId: findUserById
}