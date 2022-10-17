const { getDB } = require("../utils/getDB");
const { setDB } = require("../utils/setDB");

module.exports.getAllUsers = async (req, res, next) => {
  try {
    let { users } = getDB();

    let { limit = users.length, page = 1 } = req.query;

    res.status(200).json(users.slice((page - 1) * limit, limit * page));
  } catch (error) {
    next(error);
  }
};

module.exports.saveAUser = async (req, res, next) => {
  try {
    const { photoUrl, gender, contact, address, name } = req.body;
    if (photoUrl && gender && contact && address && name) {
      const allData = getDB();
      const newUser = { photoUrl, gender, contact, address, name, id: allData.users.length + 1 }
      allData.users = [...allData.users, newUser]
      setDB(allData);
      res.send({ success: true, message: `User added.`, data: newUser });
    } else {
      res.send({ success: false, message: `photoUrl, gender, contact, address, name is required!` });
    }


  } catch (error) {
    next(error);
  }
};

module.exports.patchSingleUser = async (req, res, next) => {
  try {
    const { id: userId } = req.params;
    const reqBody = req.body;
    const { photoUrl, gender, contact, address, name } = reqBody;

    if (!photoUrl && !gender && !contact && !address && !name) {
      res.send({ success: false, message: `Nothing to change.`, data: {} });
    }

    const allData = getDB();
    const userIndex = allData.users.findIndex(({ id }) => id === Number(userId));
    if (userIndex > 0) {
      const { photoUrl, gender, contact, address, name } = { ...allData.users[userIndex], ...reqBody };
      allData.users[userIndex] = { photoUrl, gender, contact, address, name, id: Number(userId) };
      setDB(allData);
      res.send({ success: true, message: `User Updated.`, data: allData.users[userIndex] });
    } else {
      res.send({ success: false, message: `User Not Found.`, data: {} });

    }

  } catch (error) {
    next(error);
  }
};

module.exports.bulkUpdate = async (req, res, next) => {
  try {
    const { list } = req.body;
    if (list.length < 1) {
      res.send({ success: false, message: `Nothing To change.`, data: {} });
    }

    const allData = getDB();
    const updatedData = [];

    list.forEach(user => {
      const { photoUrl, gender, contact, address, name, id: userId } = user;
      if (photoUrl || gender || contact || address || name) {
        const userIndex = allData.users.findIndex(({ id }) => id === Number(userId));
        if (userIndex > 0) {
          const { photoUrl, gender, contact, address, name } = { ...allData.users[userIndex], ...user };
          allData.users[userIndex] = { photoUrl, gender, contact, address, name, id: Number(userId) };
          updatedData.push(allData.users[userIndex]);
        }
      }
    });

    const responseData = {
      success: true,
      message: `total ${updatedData.length} Users Updated.`,
      totalRequest: list.length, updateSuccess: updatedData.length,
      updateFailed: list.length - updatedData.length,
      data: updatedData
    };

    if (updatedData.length > 0) {
      setDB(allData);
    } else {
      responseData.success = false;
      responseData.data = null;
      responseData.message = "Update Failed!";
    }
    res.send(responseData);

  } catch (error) {
    next(error);
  }
};

module.exports.randomUser = async (req, res, next) => {
  try {
    const { users } = getDB();
    const randomIndex = Math.floor(Math.random() * users.length);
    res.send({ success: true, message: `Random User index is ${randomIndex}`, data: users[randomIndex] });

  } catch (err) {
    next(err);
  }
}

module.exports.delete = async (req, res, next) => {
  try {
    const allData = getDB();
    const { id: userId } = req.params;

    const filteredUser = allData.users.filter(({ id }) => id !== Number(userId));
    if (allData.users.length > filteredUser.length) {
      allData.users = filteredUser;
      setDB(allData);
      res.status(200).json({ success: true, message: "Successfully deleted" });
    }
    res.status(200).json({ success: false, message: "User Not Found!" });

  } catch (error) {
    next(error);
  }
};