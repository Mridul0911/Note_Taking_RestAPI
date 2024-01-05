const { json } = require("express");
const express = require("express");
const router = express.Router();
const userService = require("../Service/userService")();

const userController = () => {
    return {
      registerUser: async (req, res) => {
        try {
          let user = {};
          user.name = req?.body?.name?.trim();
          user.emailId = req?.body?.emailId?.trim();
          user.password = req?.body?.password;
  
          if (!user?.name || user?.name?.length == 0)
            throw new Error("Name required");
          if (!user?.emailId || user?.emailId?.length < 11)
            throw new Error("correct email required");
          if (!user?.password || user?.password?.length == 0)
            throw new Error("Password required");
          
          r = await userService.registerUserUtil(req);
          return res.status(200).json({ message: r });
        } catch (e) {
          return res.status(400).json({ message: e.message });
        }
      },
  
      loginUser: async (req, res) => {
        try {
          let emailId = req?.body?.emailId?.trim();
          let password = req?.body?.password?.trim();
          if (!emailId || emailId?.length < 11)
            throw new Error("correct email required");
          if (!password || password?.length == 0)
            throw new Error("Password required");
          r = await userService.loginUserUtil(req);
          return res.status(200).json({ message: r });
        } catch (e) {
          return res.status(400).json({ message: e.message });
        }
      },
    };
  };
  module.exports = userController;