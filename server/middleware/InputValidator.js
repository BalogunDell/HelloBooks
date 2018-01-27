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

    if (username === undefined || password === undefined) {
      return res.status(400)
        .json({
          errorMessage: 'Username and password are both required'
        });
    }
    if (username === '' || password === '' || !req.body) {
      return res.status(401)
        .json({ errorMessage: 'Provide your username and password to login'
        });
    }
    if (username.length < 2) {
      return res.status(400)
        .json({
          errorMessage: 'Username should be two or more characters'
        });
    }
    if (password.length < 5) {
      return res.status(400)
        .json({
          errorMessage: 'Password should not be less than 5 characters'
        });
    }
    if (typeof username === 'number') {
      return res.status(400)
        .json({
          errorMessage: 'Invalid Username'
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
    if (firstname === undefined) {
      return res.status(400)
        .json({
          errorMessage: 'Firstname is required'
        });
    }

    if (firstname === '') {
      return res.status(400)
        .json({
          errorMessage: 'Firstname cannot be empty'
        });
    }


    if (firstname.length < 2) {
      return res.status(400)
        .json({
          errorMessage: 'Firstname should be two or more characters'
        });
    }
    if (typeof firstname === 'number') {
      return res.status(400)
        .json({
          errorMessage: 'Firstname should only contain alphabets'
        });
    }
    // Validate lastname
    
    if (lastname === undefined) {
      return res.status(400)
        .json({
          errorMessage: 'Lastname is required'
        });
    }

    if (!lastname) {
      return res.status(400)
        .json({
          errorMessage: 'Lastname is required'
        });
    }
    if (lastname.length < 2) {
      return res.status(400)
        .json({
          errorMessage: 'Lastname should be two or more characters'
        });
    }
    if (typeof lastname === 'number') {
      return res.status(400)
        .json({
          errorMessage: 'Lastname should only contain alphabets'
        });
    }

    // Validate username
    if (username === undefined) {
      return res.status(400)
        .json({
          errorMessage: 'Username is required'
        });
    }
    if (typeof username === 'number') {
      return res.status(400)
        .json({
          errorMessage: 'Numbers cannot be used as username'
        });
    }
    if (username === '') {
      return res.status(400)
        .json({
          errorMessage: 'Username cannot be empty'
        });
    }

    if (username.length < 2) {
      return res.status(400)
        .json({
          errorMessage: 'Username should be two or more characters'
        });
    }

    // Validate password
    if (password === undefined) {
      return res.status(400)
        .json({
          errorMessage: 'Password is required'
        });
    }
    if (password === '') {
      return res.status(400)
        .json({
          errorMessage: 'Password cannot be empty'
        });
    }

    if (password.length < 5) {
      return res.status(400)
        .json({
          errorMessage: 'Password should not be less than 5 characters'
        });
    }

    // Validate Email
    if (email === undefined) {
      return res.status(400)
        .json({
          errorMessage: 'Email is required'
        });
    }

    if (email === '') {
      return res.status(400)
        .json({
          errorMessage: 'Email cannot be empty'
        });
    }
    
    if (!validateEmail(email)) {
      return res.status(400)
        .json({
          errorMessage: 'Provided email is invalid'
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
          errorMessage: 'Email is required'
        });
    }

    if (typeof email === 'number') {
      return res.status(400)
        .json({
          errorMessage: 'Provide your valid email'
        });
    }

    if (!validateEmail(email)) {
      return res.status(400)
        .json({
          errorMessage: 'Provide your valid email'
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
          errorMessage: 'ISBN is required'
        });
    }

    if (isbn.toString().length !== 6) {
      return res.status(400)
        .json({
          errorMessage: 'ISBN number should be 6 digits'
        });
    }

    // Validate Author
    if (author === '') {
      return res.status(400)
        .json({
          errorMessage: 'Author is required'
        });
    }

    if (typeof author !== 'string') {
      return res.status(400)
        .json({
          errorMessage: 'Author should be a name'
        });
    }
    if (countMutipleSpace.test(author)) {
      return res.status(400)
        .json({
          errorMessage: 'Author name is not well formated'
        });
    }

    // Validate title
    if (title === '') {
      return res.status(400)
        .json({
          errorMessage: 'Title is required'
        });
    }
    if (typeof title !== 'string') {
      return res.status(400)
        .json({
          errorMessage: 'Invalid title'
        });
    }

    // Validate pages
    if (pages === '') {
      return res.status(400)
        .json({
          errorMessage: 'Book page(s) is required'
        });
    }

    // Validate pages
    if (year === '') {
      return res.status(400)
        .json({
          errorMessage: 'Year is required'
        });
    }
    if (year.toString().length > 4) {
      return res.status(400)
        .json({
          errorMessage: 'Book year can only be 4 digits or less'
        });
    }

    //  Validate descriptipn
    if (description === '') {
      return res.status(400)
        .json({
          errorMessage: 'Book description is required'
        });
    }
    if (countMutipleSpace.test(description)) {
      return res.status(400)
        .json({
          errorMessage: 'Description is not well formated'
        });
    }

    //  Validate quantity
    if (quantity === '') {
      return res.status(400)
        .json({
          errorMessage: 'Book quantity is required'
        });
    }

    //  Validate imageUrl
    if (imageUrl === '') {
      return res.status(400)
        .json({
          errorMessage: 'Book cover is required'
        });
    }
    if (checkSpace.test(imageUrl) || countMutipleSpace.test(imageUrl)) {
      return res.status(400)
        .json({
          errorMessage: 'Please select a valid book image'
        });
    }

    //  Validate pdfUrl
    if (pdfUrl === '') {
      return res.status(400)
        .json({
          errorMessage: 'Select a pdf to be uploaded'
        });
    }
    if (checkSpace.test(pdfUrl) || countMutipleSpace.test(pdfUrl)) {
      return res.status(400)
        .json({
          errorMessage: 'Invalid file selected'
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
    const category = req.body.category;
    const numberCheck = /((\d)+)/g;
    if (category === '') {
      return res.status(400)
        .json({
          errorMessage: 'Category field cannot be empty'
        });
    }

    if (category.length <= 2) {
      return res.status(400)
        .json({
          errorMessage: 'Category is too short'
        });
    }

    if (numberCheck.test(category)) {
      return res.status(400)
        .json({
          errorMessage: 'Category cannot contain numbers'
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
    console.log(parseInt(bookId, 10));
    console.log(typeof bookId === 'number');
    console.log(typeof req.body.bookId);
    if (typeof bookId !== 'number') {
      return res.status(400)
        .json({
          errorMessage: 'Please provide a valid book id'
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
      categoryid,
      pdfUrl,
    } = req.body;

    const checkSpace = /(\s){1}/;
    const countMutipleSpace = /(\s){2}/;
    
    // Validate Author
    if (author === '') {
      return res.status(400)
        .json({
          errorMessage: 'Author is required'
        });
    }

    if (typeof author !== 'string') {
      return res.status(400)
        .json({
          errorMessage: 'Author should be a name'
        });
    }
    if (countMutipleSpace.test(author)) {
      return res.status(400)
        .json({
          errorMessage: 'Author name is not well formated'
        });
    }

    // Validate title
    if (title === '') {
      return res.status(400)
        .json({
          errorMessage: 'Title is required'
        });
    }
    if (typeof title !== 'string') {
      return res.status(400)
        .json({
          errorMessage: 'Invalid title'
        });
    }

    // Validate pages
    if (pages === '') {
      return res.status(400)
        .json({
          errorMessage: 'Book page(s) is required'
        });
    }

    // Validate pages
    if (year === '') {
      return res.status(400)
        .json({
          errorMessage: 'Year is required'
        });
    }

    if (year.toString().length > 4) {
      return res.status(400)
        .json({
          errorMessage: 'Book year can only be 4 digits or less'
        });
    }

    //  Validate descriptipn
    if (description === '') {
      return res.status(400)
        .json({
          errorMessage: 'Book description is required'
        });
    }
    if (countMutipleSpace.test(description)) {
      return res.status(400)
        .json({
          errorMessage: 'Description is not well formatted'
        });
    }

    //  Validate quantity
    if (quantity === '') {
      return res.status(400)
        .json({
          errorMessage: 'Book quantity is required'
        });
    }

    //  Validate imageUrl

    if (checkSpace.test(imageUrl) || countMutipleSpace.test(imageUrl)) {
      return res.status(400)
        .json({
          errorMessage: 'Please select a valid book image'
        });
    }

    //  Validate pdfUrl
    if (checkSpace.test(pdfUrl) || countMutipleSpace.test(pdfUrl)) {
      return res.status(400)
        .json({
          errorMessage: 'Invalid file selected'
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
        categoryid };
    }
    return next();
  }
}

export default InputValidator;

