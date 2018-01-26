const routeDefault = '/api/v1';

//  Export Routes
const signup = `${routeDefault}/users/signup`;
const signin = `${routeDefault}/users/signin`;
const userProfile = `${routeDefault}/users`;
const userbooks = `${routeDefault}/books`;
const newCategory = `${routeDefault}/newcategory`;
const categories = `${routeDefault}/categories`;
const newPasswordUrl = `${routeDefault}/resetpassword`;
const trending = `${routeDefault}/trendingbooks`;
const googleAccess = `${routeDefault}/googleuser`;

export {
  signup,
  signin,
  userProfile,
  userbooks,
  newCategory,
  categories,
  newPasswordUrl,
  trending,
  googleAccess
};
