import { Points } from "../dbSchema";

export const insertPoints = async (req, res) => {
  // Extract the userId and points from the request body
  const { userId, points } = req.body;
  try {
    // Create a new user points object
    const userPoints = new Points({
      userId,
      points,
    });

    // Save the user points object to the database
    userPoints
      .save()
      .then(() => {
        res
          .status(201)
          .json({ message: "User points data inserted successfully" });
      })
      .catch((err) => {
        console.error("Error inserting user points data:", err);
        res.status(500).json({ error: "An error occurred" });
      });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Error inserting user points data" });
  }
};

export const getPoints = async (req, res) => {
  // Extract the userId from request params
  const userId = req.body.userId;
  try {
    Points.find({ userId })
    .then((points) => {
      res.status(200).json(points);
    })
    .catch((err) => {
      console.error('Error retrieving user points:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Error retrieving user points" });
  }
};
