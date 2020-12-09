import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';

export const generateToken = (id: number, role: string): string => {
  return jwt.sign({ ID: id, role }, jwtSecret);
};

// export default generateToken;
