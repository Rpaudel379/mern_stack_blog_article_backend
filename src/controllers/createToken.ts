import jwt from "jsonwebtoken";

const maxAge = 2 * 24 * 60 * 60;

export default (id: string) => {
  return jwt.sign({ id }, process.env.JWT_KEY as string, { expiresIn: maxAge });
};
