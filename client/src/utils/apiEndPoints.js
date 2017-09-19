import { getUserDetails } from '../utils/getUserInfo';
const routeDefault = 'http://localhost:3000/api';

//  Export Routes
export const signup = `${routeDefault}/users/signup`;
export const signin = `${routeDefault}/users/signin`;
export const userProfile = `${routeDefault}/users`;
export const books = `${routeDefault}/books`;