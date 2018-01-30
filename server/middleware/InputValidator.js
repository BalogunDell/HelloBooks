import bcrypt from 'bcrypt';
import validateEmail from './validateEmail';


/**
 * 
 * @param { object } req - Request object
 * @param { object } res - Response object
 * 
 * @returns { object } - returns an object
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
      firstname,
      lastname,
      username,
      email,
      password,
    } = req.body;


    // Validate firstname
    if (!firstname) {
      return res.status(400)
        .json({
          message: 'Firstname is required'
        });
    }

    if (firstname === '') {
      return res.status(400)
        .json({
          message: 'Firstname cannot be empty'
        });
    }


    if (firstname.length < 2) {
      return res.status(400)
        .json({
          message: 'Firstname should be two or more characters'
        });
    }
    if (typeof firstname === 'number') {
      return res.status(400)
        .json({
          message: 'Firstname should only contain alphabets'
        });
    }
    // Validate lastname
    
    if (!lastname) {
      return res.status(400)
        .json({
          message: 'Lastname is required'
        });
    }

    if (!lastname) {
      return res.status(400)
        .json({
          message: 'Lastname is required'
        });
    }
    if (lastname.length < 2) {
      return res.status(400)
        .json({
          message: 'Lastname should be two or more characters'
        });
    }
    if (typeof lastname === 'number') {
      return res.status(400)
        .json({
          message: 'Lastname should only contain alphabets'
        });
    }

    // Validate username
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

    // Validate password
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

    // Validate Email
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
      firstname,
      lastname,
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

    // Verify if there is an email
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
      res.status(400).json({ message: 'Password should not be less than 5 characters' });
    } else {
      const hashPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
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
      pdfUrl,
    } = req.body;

    const checkSpace = /(\s){1}/;
    const countMutipleSpace = /(\s){2}/;

    // Validate ISBN
    if (isbn === '') {
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

    // Validate Author
    if (author === '') {
      return res.status(400)
        .json({
          message: 'Author is required'
        });
    }

    if (typeof author !== 'string') {
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

    // Validate title
    if (title === '') {
      return res.status(400)
        .json({
          message: 'Title is required'
        });
    }
    if (typeof title !== 'string') {
      return res.status(400)
        .json({
          message: 'Invalid title'
        });
    }

    // Validate pages
    if (pages === '') {
      return res.status(400)
        .json({
          message: 'Book page(s) is required'
        });
    }

    // Validate pages
    if (year === '') {
      return res.status(400)
        .json({
          message: 'Year is required'
        });
    }
    if (year.toString().length > 4) {
      return res.status(400)
        .json({
          message: 'Book year can only be 4 digits or less'
        });
    }

    //  Validate descriptipn
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

    //  Validate quantity
    if (quantity === '') {
      return res.status(400)
        .json({
          message: 'Book quantity is required'
        });
    }

    //  Validate imageUrl
    if (imageUrl === '') {
      return res.status(400)
        .json({
          message: 'Book cover is required'
        });
    }
    if (checkSpace.test(imageUrl) || countMutipleSpace.test(imageUrl)) {
      return res.status(400)
        .json({
          message: 'Please select a valid book image'
        });
    }

    //  Validate pdfUrl
    if (pdfUrl === '') {
      return res.status(400)
        .json({
          message: 'Select a pdf to be uploaded'
        });
    }
    if (checkSpace.test(pdfUrl) || countMutipleSpace.test(pdfUrl)) {
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
      author,
      title,
      isbn,
      pages,
      year,
      description,
      quantity,
      imageUrl,
      categoryId,
      pdfUrl,
    } = req.body;

    const checkSpace = /(\s){1}/;
    const countMutipleSpace = /(\s){2}/;
    
    // Validate Author
    if (author === '') {
      return res.status(400)
        .json({
          message: 'Author is required'
        });
    }

    if (typeof author !== 'string') {
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

    // Validate title
    if (title === '') {
      return res.status(400)
        .json({
          message: 'Title is required'
        });
    }
    if (typeof title !== 'string') {
      return res.status(400)
        .json({
          message: 'Invalid title'
        });
    }

    // Validate pages
    if (pages === '') {
      return res.status(400)
        .json({
          message: 'Book page(s) is required'
        });
    }

    // Validate pages
    if (year === '') {
      return res.status(400)
        .json({
          message: 'Year is required'
        });
    }

    if (year.toString().length > 4) {
      return res.status(400)
        .json({
          message: 'Book year can only be 4 digits or less'
        });
    }

    //  Validate descriptipn
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

    //  Validate quantity
    if (quantity === '') {
      return res.status(400)
        .json({
          message: 'Book quantity is required'
        });
    }

    //  Validate imageUrl

    if (checkSpace.test(imageUrl) || countMutipleSpace.test(imageUrl)) {
      return res.status(400)
        .json({
          message: 'Please select a valid book image'
        });
    }

    //  Validate pdfUrl
    if (checkSpace.test(pdfUrl) || countMutipleSpace.test(pdfUrl)) {
      return res.status(400)
        .json({
          message: 'Invalid file selected'
        });
    }

    if (isbn !== undefined) {
      req.body = {
        author,
        title,
        pages,
        year,
        description,
        quantity,
        imageUrl,
        pdfUrl,
        categoryId };
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
      firstname,
      lastname,
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

    if (!firstname) {
      return res.status(400).json({
        message: 'Firstname is required'
      });
    }

    if (firstname.length < 3) {
      return res.status(400).json({
        message: 'Firstname should be atleast 3 characters'
      });
    }

    if ((/(\d)/gi).test(firstname)) {
      return res.status(400).json({
        message: 'Firstname cannot be a number'
      });
    }

    if (!lastname) {
      return res.status(400).json({
        message: 'Lastname is required'
      });
    }

    if (lastname.length < 3) {
      return res.status(400).json({
        message: 'Lastname should be atleast 3 characters'
      });
    }

    if ((/(\d)/gi).test(lastname)) {
      return res.status(400).json({
        message: 'Lastname cannot be a number'
      });
    }
    next();
  }
}

export default InputValidator;

