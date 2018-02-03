import bcrypt from 'bcrypt';
import validateEmail from './validateEmail';


/**
 * @class InputValidator
 * 
 * @classdesc this class validates input from users
 * 
 */
class InputValidator {
/** 
 * @description Validates login payload
 * 
 * @param { object } req request object
 * @param { object } res response object
 * @param { object } next passes action to following controller
 * 
 * @returns { object } req
 */
  static loginValidator(req, res, next) {
    const {
      username,
      password
    } = req.body;

    if (!username || !password) {
      return res.status(400)
        .json({
          message: 'Username and password are both required'
        });
    }
    if (username === '' || password === '' || !req.body) {
      return res.status(401)
        .json({ message: 'Provide your username and password to login'
        });
    }
    if (username.length < 2) {
      return res.status(400)
        .json({
          message: 'Username should be two or more characters'
        });
    }
    if (password.length < 5) {
      return res.status(400)
        .json({
          message: 'Password should not be less than 5 characters'
        });
    }
    if (typeof username === 'number') {
      return res.status(400)
        .json({
          message: 'Invalid Username'
        });
    }
    req.body = {
      username: username.toLowerCase(),
      password
    };
    return next();
  }

  /** 
 * @description Validates signup payload
 * 
 * @param { object } req request object
 * @param { object } res response object
 * @param { object } next passes action to following controller
 * 
 * @returns { object } books with count and rows
 */
  static signupValidator(req, res, next) {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
    } = req.body;


    if (!firstName) {
      return res.status(400)
        .json({
          message: 'First name is required'
        });
    }

    if (firstName === '') {
      return res.status(400)
        .json({
          message: 'First name cannot be empty'
        });
    }


    if (firstName.length < 2) {
      return res.status(400)
        .json({
          message: 'First name should be two or more characters'
        });
    }
    if (typeof firstName === 'number') {
      return res.status(400)
        .json({
          message: 'First name should only contain alphabets'
        });
    }

    
    if (!lastName) {
      return res.status(400)
        .json({
          message: 'Last name is required'
        });
    }

    if (!lastName) {
      return res.status(400)
        .json({
          message: 'Last name is required'
        });
    }
    if (lastName.length < 2) {
      return res.status(400)
        .json({
          message: 'Last name should be two or more characters'
        });
    }
    if (typeof lastName === 'number') {
      return res.status(400)
        .json({
          message: 'Last name should only contain alphabets'
        });
    }


    if (!username) {
      return res.status(400)
        .json({
          message: 'Username is required'
        });
    }
    if (typeof username === 'number') {
      return res.status(400)
        .json({
          message: 'Numbers cannot be used as username'
        });
    }
    if (username === '') {
      return res.status(400)
        .json({
          message: 'Username cannot be empty'
        });
    }

    if (username.length < 2) {
      return res.status(400)
        .json({
          message: 'Username should be two or more characters'
        });
    }


    if (!password) {
      return res.status(400)
        .json({
          message: 'Password is required'
        });
    }
    if (password === '') {
      return res.status(400)
        .json({
          message: 'Password cannot be empty'
        });
    }

    if (password.length < 5) {
      return res.status(400)
        .json({
          message: 'Password should not be less than 5 characters'
        });
    }


    if (!email) {
      return res.status(400)
        .json({
          message: 'Email is required'
        });
    }

    if (email === '') {
      return res.status(400)
        .json({
          message: 'Email cannot be empty'
        });
    }
    
    if (!validateEmail(email)) {
      return res.status(400)
        .json({
          message: 'Provided email is invalid'
        });
    }
    req.body = {
      firstName,
      lastName,
      email,
      username: username.toLowerCase(),
      password
    };
    return next();
  }

/**
 * @description Validates email for password reset
 *  
 * @param { object } req request object
 * @param { object } res response object
 * @param { object } next passes action to following controller
 * 
 * @returns { object } resquest body
 */
  static resetPassEmailVerifer(req, res, next) {
    const { email } = req.body;


    if (!email) {
      return res.status(400)
        .json({
          message: 'Email is required'
        });
    }

    if (typeof email === 'number') {
      return res.status(400)
        .json({
          message: 'Provide your valid email'
        });
    }

    if (!validateEmail(email)) {
      return res.status(400)
        .json({
          message: 'Provide your valid email'
        });
    }

    return next();
  }

/** 
 * @description Validates password reset url
 * 
 * @param { object } req request object
 * @param { object } res response object
 * @param { object } next passes action to following controller
 * 
 * @returns { object } resquest body
 */
 static resetPassVerifier(req, res, next) {
    const { resetUrl } = req.params;
    const newPassword = req.body.password;
    if ((!newPassword) || (newPassword === '')) {
      res.status(400).json({ message: 'Please type in your new password' });
    } else if (newPassword.length < 6) {
      res.status(400).json({ 
        message: 'Password should not be less than 5 characters' });
    } else {
      const hashPassword = bcrypt.hashSync(newPassword,
        bcrypt.genSaltSync(10));
      req.body.password = hashPassword;
      req.body.passwordResetUrl = resetUrl;
      next();
    }
  }

/** 
 * @description Validates payload to create a book 
 * 
 * @param { object } req request object
 * @param { object } res response object
 * @param { object } next passes action to following controller
 * 
 * @returns { object } resquest body
 */
 static bookPayloadChecker(req, res, next) {
    const {
      isbn,
      author,
      title,
      pages,
      year,
      description,
      quantity,
      imageUrl,
      PDFUrl,
      categoryId,
    } = req.body;

    const checkSpace = /(\s){1}/;
    const countMutipleSpace = /(\s){2}/;
    const numberCheck = /((\d)+)/g;

    if (isbn === '' || !isbn) {
      return res.status(400)
        .json({
          message: 'ISBN is required'
        });
    }

    if (isbn.toString().length !== 6) {
      return res.status(400)
        .json({
          message: 'ISBN number should be 6 digits'
        });
    }

    if (typeof isbn === 'string') {
      return res.status(400)
        .json({
          message: 'ISBN should be a number'
        });
    }


    if (author === '') {
      return res.status(400)
        .json({
          message: 'Author is required'
        });
    }

    if (numberCheck.test(author)) {
      return res.status(400)
        .json({
          message: 'Book author should be a valid name'
        });
    }

    if (typeof author === 'number') {
      return res.status(400)
        .json({
          message: 'Author should be a name'
        });
    }
    if (countMutipleSpace.test(author)) {
      return res.status(400)
        .json({
          message: 'Author name is not well formated'
        });
    }


    if (title === '') {
      return res.status(400)
        .json({
          message: 'Title is required'
        });
    }


    if (numberCheck.test(title)) {
      return res.status(400)
        .json({
          message: 'Title should be a valid name'
        });
    }


    if (countMutipleSpace.test(title)) {
      return res.status(400)
        .json({
          message: 'Title is not well formated'
        });
    }


    if (pages === '') {
      return res.status(400)
        .json({
          message: 'Book page(s) is required'
        });
    }

    if (typeof pages === 'string') {
      return res.status(400)
        .json({
          message: 'Book page should be a number'
        });
    }


    if (year === '') {
      return res.status(400)
        .json({
          message: 'Year is required'
        });
    }
    if (year.toString().length !== 4) {
      return res.status(400)
        .json({
          message: 'Book year can only be 4 digits or less'
        });
    }


    if (categoryId === '') {
      return res.status(400)
        .json({
          message: 'Please choose a category id'
        });
    }

    if (!numberCheck.test(categoryId)) {
      return res.status(400)
        .json({
          message: 'CategoryId should be a number'
        });
    }
    if (typeof year === 'string') {
      return res.status(400)
        .json({
          message: 'Book year can only be digits'
        });
    }

    if (countMutipleSpace.test(year)) {
      return res.status(400)
        .json({
          message: 'Year is not well formatted'
        });
    }


    if (description === '') {
      return res.status(400)
        .json({
          message: 'Book description is required'
        });
    }
    if (countMutipleSpace.test(description)) {
      return res.status(400)
        .json({
          message: 'Description is not well formated'
        });
    }


    if (quantity === '') {
      return res.status(400)
        .json({
          message: 'Book quantity is required'
        });
    }

    if (typeof quantity === 'string') {
      return res.status(400)
        .json({
          message: 'Book quantity should be a number'
        });
    }


    if (imageUrl === '') {
      return res.status(400)
        .json({
          message: 'Book cover is required'
        });
    }

    if (typeof imageUrl !== 'string') {
      return res.status(400)
        .json({
          message: 'Book cover is invalid'
        });
    }

    if (checkSpace.test(imageUrl) || countMutipleSpace.test(imageUrl)) {
      return res.status(400)
        .json({
          message: 'Please select a valid book image'
        });
    }


    if (PDFUrl === '') {
      return res.status(400)
        .json({
          message: 'Select a pdf to be uploaded'
        });
    }

    if (typeof PDFUrl !== 'string') {
      return res.status(400)
        .json({
          message: 'Select a pdf to be uploaded'
        });
    }
    if (checkSpace.test(PDFUrl) || countMutipleSpace.test(PDFUrl)) {
      return res.status(400)
        .json({
          message: 'Invalid file selected'
        });
    }

    return next();
  }


  /**
 * @description Validates new category payload
 *  
 * @param { object } req request object
 * @param { object } res response object
 * @param { object } next passes action to following controller
 * 
 * @returns { object } resquest body
 */
  static checkCategoryPayload(req, res, next) {
    const { category } = req.body;
    const numberCheck = /((\d)+)/g;
    
    if (category === '') {
      return res.status(400)
        .json({
          message: 'Category field cannot be empty'
        });
    }

    if (category.length <= 2) {
      return res.status(400)
        .json({
          message: 'Category is too short'
        });
    }

    if (numberCheck.test(category)) {
      return res.status(400)
        .json({
          message: 'Category cannot contain numbers'
        });
    }
    return next();
  }

/**
 * @description Verfifies if book Id is valid (number)
 * 
 * @param { object } req request object
 * @param { object } res response object
 * @param { object } next passes action to following controller
 * 
 * @returns { object } resquest body
 */
  static verifyBookId(req, res, next) {
    const { bookId } = req.body;
    if (typeof bookId !== 'number') {
      return res.status(400)
        .json({
          message: 'Please provide a valid book id'
        });
    }
    return next();
  }

/**
 * @description Validates payload to edit book
 *  
 * @param { object } req request object
 * @param { object } res response object
 * @param { object } next passes action to following controller
 * 
 * @returns { object } resquest body
 */
  static editBookVerifier(req, res, next) {
    const {
      isbn,
      author,
      title,
      pages,
      year,
      description,
      quantity,
      imageUrl,
      PDFUrl,
      categoryId,
    } = req.body;

    const checkSpace = /(\s){1}/;
    const countMutipleSpace = /(\s){2}/;
    const numberCheck = /((\d)+)/g;

    if (isbn) {
      return res.status(400)
        .json({
          message: 'ISBN cannot be edited'
        });
    }


    if (author === '') {
      return res.status(400)
        .json({
          message: 'Author is required'
        });
    }

    if (numberCheck.test(author)) {
      return res.status(400)
        .json({
          message: 'Book author should be a valid name'
        });
    }

    if (typeof author === 'number') {
      return res.status(400)
        .json({
          message: 'Author should be a name'
        });
    }
    if (countMutipleSpace.test(author)) {
      return res.status(400)
        .json({
          message: 'Author name is not well formated'
        });
    }


    if (title === '') {
      return res.status(400)
        .json({
          message: 'Title is required'
        });
    }


    if (numberCheck.test(title)) {
      return res.status(400)
        .json({
          message: 'Title should be a valid name'
        });
    }


    if (countMutipleSpace.test(title)) {
      return res.status(400)
        .json({
          message: 'Title is not well formated'
        });
    }


    if (pages === '') {
      return res.status(400)
        .json({
          message: 'Book page(s) is required'
        });
    }

    if (typeof pages === 'string') {
      return res.status(400)
        .json({
          message: 'Book page should be a number'
        });
    }


    if (year === '') {
      return res.status(400)
        .json({
          message: 'Year is required'
        });
    }
    if (year.toString().length !== 4) {
      return res.status(400)
        .json({
          message: 'Book year can only be 4 digits or less'
        });
    }


    if (categoryId === '') {
      return res.status(400)
        .json({
          message: 'Please choose a category id'
        });
    }

    if (!numberCheck.test(categoryId)) {
      return res.status(400)
        .json({
          message: 'CategoryId should be a number'
        });
    }
    if (typeof year === 'string') {
      return res.status(400)
        .json({
          message: 'Book year can only be digits'
        });
    }

    if (countMutipleSpace.test(year)) {
      return res.status(400)
        .json({
          message: 'Year is not well formatted'
        });
    }

    if (description === '') {
      return res.status(400)
        .json({
          message: 'Book description is required'
        });
    }
    if (countMutipleSpace.test(description)) {
      return res.status(400)
        .json({
          message: 'Description is not well formatted'
        });
    }

    if (quantity === '') {
      return res.status(400)
        .json({
          message: 'Book quantity is required'
        });
    }

    if (typeof quantity === 'string') {
      return res.status(400)
        .json({
          message: 'Book quantity should be a number'
        });
    }

    if (imageUrl === '') {
      return res.status(400)
        .json({
          message: 'Book cover is required'
        });
    }

    if (typeof imageUrl !== 'string') {
      return res.status(400)
        .json({
          message: 'Please select a valid book image'
        });
    }

    if (checkSpace.test(imageUrl) || countMutipleSpace.test(imageUrl)) {
      return res.status(400)
        .json({
          message: 'Please select a valid book image'
        });
    }

    if (PDFUrl === '') {
      return res.status(400)
        .json({
          message: 'Select a pdf to be uploaded'
        });
    }

    if (typeof PDFUrl !== 'string') {
      return res.status(400)
        .json({
          message: 'Select a pdf to be uploaded'
        });
    }
    if (checkSpace.test(PDFUrl) || countMutipleSpace.test(PDFUrl)) {
      return res.status(400)
        .json({
          message: 'Invalid file selected'
        });
    }

    return next();
  }


/**
 * @description Validates payload to edit profile
 *  
 * @param { object } req request object
 * @param { object } res response object
 * @param { object } next passes action to following controller
 * 
 * @returns { object } resquest body
 */
  static editProfileVerifier(req, res, next) {
    const {
      username,
      firstName,
      lastName,
    } = req.body;

    if (!username) {
      return res.status(400).json({
        message: 'Username is required'
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        message: 'Username should be at least 3 characters'
      });
    }

    if (typeof username === 'number') {
      return res.status(400).json({
        message: 'Username cannot be a number'
      });
    }

    if (!firstName) {
      return res.status(400).json({
        message: 'First name is required'
      });
    }

    if (firstName.length < 3) {
      return res.status(400).json({
        message: 'First name should be atleast 3 characters'
      });
    }

    if ((/(\d)/gi).test(firstName)) {
      return res.status(400).json({
        message: 'First name cannot be a number'
      });
    }

    if (!lastName) {
      return res.status(400).json({
        message: 'Last name is required'
      });
    }

    if (lastName.length < 3) {
      return res.status(400).json({
        message: 'Last name should be atleast 3 characters'
      });
    }

    if ((/(\d)/gi).test(lastName)) {
      return res.status(400).json({
        message: 'Last name cannot be a number'
      });
    }
    next();
  }

/**
 * @description Validates payload to edit password
 *  
 * @param { object } req request object
 * @param { object } res response object
 * @param { object } next passes action to following controller
 * 
 * @returns { object } resquest body
 */
  static editPasswordVerifier(req, res, next) {
    const {
      currentPassword,
      newPassword
    } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400)
        .json({
          message: 'Please type your current password and the new password'
        });
    }
    if (currentPassword === '' || newPassword === '') {
      return res.status(400)
        .json({
          message: 'Field cannot be empty'
        });
    }

    if (currentPassword.length < 5 || newPassword.length < 5) {
      return res.status(400)
        .json({
          message: 'Your password should be atleast 5 characters long'
        });
    }

    return next();
  }
}

export default InputValidator;
