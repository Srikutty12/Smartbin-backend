import { User } from "../dbSchema";
import * as dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
dotenv.config();

export const login = async (req, res) => {
  const { idToken } = req.body;
  let CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

  const client = new OAuth2Client(CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();

    // Create or update user in db
    const user = await User.findOneAndUpdate(
      { email, name },
      { email, name },
      { upsert: true, new: true }
    );

    // Return a JWT token to the frontend for further authentication
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid ID token" });
  }
};
