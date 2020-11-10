import * as crypto from 'crypto';
import { HashSecret } from '../config';
export const generateHash = (email) => {
    return crypto.createHash('sha1').update(HashSecret + email).digest('hex');
}