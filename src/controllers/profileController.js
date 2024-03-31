import UserSchema from "../models/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const profileInfo = async (req, res) => {
  try {
    // get email from the req
    const token = req.body.token;
    const decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });
    const email = decodedToken.email;

    const existingUser = await UserSchema.findOne({ _id: email });
    // get all the information of the user
    const response = {
      data: {
        Email: existingUser.Email,
        Username: existingUser.Username,
        PhoneNo: existingUser.PhoneNo,
        Password: existingUser.Password,
        Year: existingUser.Year,
        Branch: existingUser.Branch,
        Plan: existingUser.Plan,
        Events: existingUser.Events,
      },
      message: "",
    };

    return res.send(response);
  } catch (error) {
    const response = {
      data: {},
      message: "Failure",
    };
    console.log(error);
    return res.send(response);
  }
};

export { profileInfo };
