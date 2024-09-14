import jwt, { decode } from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded data", decodedData);
    req.userID = decodedData?.id;

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
