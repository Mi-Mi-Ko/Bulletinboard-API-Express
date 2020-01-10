const express = require('express');
const router = express.Router();
const UserService = require('../service/user');
const Auth = require('../utils/authorize');
// ADD NEW USER POST ACTIO
router.post('/add', Auth.userRole,
  async function (req, res) {
    var result = await UserService.createUser(req);
    res.status(result.body.statusCode).send({ user: result });
  }
);

// GET ALL USER
router.get('/userList', Auth.userRole,
  async function (req, res) {
    var result = await UserService.getAllUsers(req);
    res.status(result.body.statusCode).send({ user: result });
  }
);

// GET ONE USER
router.get('/(:id)', Auth.userRole,
  async function (req, res) {
    var result = await UserService.getByUserId(req);
    res.status(result.body.statusCode).send({ user: result });
  }
);

// GET LOGIN USER
router.post('/login',
  async function (req, res) {
    var result = await UserService.login(req.body);
    res.status(result.body.statusCode).send({ user: result });
    // res.json(result);
  }
);

// LOGOUT USER
router.post('/logout', Auth.userRole,
  async function (req, res) {
    var result = await UserService.logout(req);
    res.status(result.body.statusCode).send({ user: result });
    // res.json(result);
  }
);

// DELETE USER
router.delete('/delete/(:id)', Auth.adminRole,
  async function (req, res) {
    var result = await UserService.delete(req.params.id);
    res.status(result.body.statusCode).send({ user: result });
  }
);

// UPDATE USER PUT
router.put('/update/(:id)', Auth.userRole,
  async function (req, res) {
    var result = await UserService.updateUser(req);
    res.status(result.body.statusCode).send({ user: result });
  }
);

// CHANGE PASSWORD
router.put('/password/(:id)', Auth.userRole,
  async function (req, res) {
    var result = await UserService.changePassword(req);
    res.status(result.body.statusCode).send({ user: result });
  }
);

module.exports = router;
