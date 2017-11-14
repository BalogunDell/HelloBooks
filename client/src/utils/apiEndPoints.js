import { getUserDetails } from '../utils/getUserInfo';
const routeDefault = '/api/v1';

//  Export Routes
export const signup = `${routeDefault}/users/signup`;
export const signin = `${routeDefault}/users/signin`;
export const userProfile = `${routeDefault}/users`;
export const books = `${routeDefault}/books`;
export const newCategory = `${routeDefault}/newcategory`;
export const categories = `${routeDefault}/categories`;
export const newPassword = `${routeDefault}/resetpassword`;
