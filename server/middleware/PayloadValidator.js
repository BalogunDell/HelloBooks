import bcrypt from 'bcrypt';
import validateEmail from './validateEmail';


/**
 * 
 * @param { object } req - Request object
 * @param { object } res - Response object
 * 
 * @returns { object } - returns an object
 */
class PayloadValidator {
/** 
 * @param { object } req request object
 * @param { object } res response object
 * @param { object } next passes action to following controller
 * 
 * @returns { object } req
 */
  static loginValidator(req, res, next) {
    console.log(req.body);
    const {
      username,
      password
    } = req.body;

    if (username === undefined || password === undefined) {
      return res.status(400)
        .json({
          error: 'Username and password are both required'
        });
    }
    if (username === '' || password === '' || !req.body) {
      return res.status(401)
        .json({ error: 'Provide your username and password to login'
        });
    }
    if (username.length < 2) {
      return res.status(400)
        .json({
          error: 'Username should be two or more characters'
        });
    }
    if (password.length < 5) {
      return res.status(400)
        .json({
          error: 'Password should not be less than 5 characters'
        });
    }
    if (typeof username === 'number') {
      return res.status(400)
        .json({
          error: 'Invalid Username'
        });
    }
    req.body = {
      username: username.toLowerCase(),
      password
    };
    return next();
  }

  /** 
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
          error: 'Firstname is required'
        });
    }
    if (firstname.length < 2) {
      return res.status(400)
        .json({
          error: 'Firstname should be two or more characters'
        });
    }
    if (typeof firstname === 'number') {
      return res.status(400)
        .json({
          error: 'Firstname should only contain alphabets'
        });
    }
    // Validate lastname
    if (!lastname) {
      return res.status(400)
        .json({
          error: 'Lastname is required'
        });
    }
    if (lastname.length < 2) {
      return res.status(400)
        .json({
          error: 'Lastname should be two or more characters'
        });
    }
    if (typeof lastname === 'number') {
      return res.status(400)
        .json({
          error: 'Lastname should only contain alphabets'
        });
    }

    // Validate username
    if (username === undefined) {
      return res.status(400)
        .json({
          error: 'Username is required'
        });
    }
    if (typeof username === 'number') {
      return res.status(400)
        .json({
          error: 'Numbers cannot be used as username'
        });
    }
    if (username === '') {
      return res.status(400)
        .json({
          error: 'Username cannot be empty'
        });
    }

    // Validate password
    if (password === undefined) {
      return res.status(400)
        .json({
          error: 'Password is required'
        });
    }
    if (password === '') {
      return res.status(400)
        .json({
          error: 'Password cannot be empty'
        });
    }

    if (password.length < 5) {
      return res.status(400)
        .json({
          error: 'Password should not be less than 5 characters'
        });
    }

    // Validate Email
    if (email === undefined) {
      return res.status(400)
        .json({
          error: 'Email is required'
        });
    }

    if (email === '') {
      return res.status(400)
        .json({
          error: 'Email cannot be empty'
        });
    }
    
    if (!validateEmail(email)) {
      return res.status(400)
        .json({
          error: 'Provided email is invalid'
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
          error: 'Email is required'
        });
    }

    if (!validateEmail(email)) {
      return res.status(400)
        .json({
          error: 'Provide your valid email'
        });
    }

    return next();
  }

/** 
 * @param { object } req request object
 * @param { object } res response object
 * @param { object } next passes action to following controller
 * 
 * @returns { object } resquest body
 */
 static resetPassVerifier(req, res, next) {
    const resetUrl = req.params.resetUrl;
    const newPassword = req.body.password;
    if ((!newPassword) || (newPassword === '')) {
      res.status(400).json({ message: 'Please type in your new password' });
    } else if (newPassword.length < 6) {
      res.status(400).json({ message: 'Password should not be less than 5 characters' });
    } else {
      const hashP = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
      req.body.password = hashP;
      req.body.passwordResetUrl = resetUrl;
      next();
    }
  }

/** 
 * @param { object } req request object
 * @param { object } res response object
 * @param { object } next passes action to following controller
 * 
 * @returns { object } resquest body
 */
 static bookPayloadVerifier(req, res, next) {
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
 * @param { object } req request object
 * @param { object } res response object
 * @param { object } next passes action to following controller
 * 
 * @returns { object } resquest body
 */
  static verifyBorrowPayload(req, res, next) {
    console.log(req.body);
    const { bookId } = parseInt(req.body.bookId, 10);
    const id = parseInt(bookId, 10);
    console.log(id);
    if (typeof id !== 'number') {
      return res.status(400)
        .json({
          errorMessage: 'Please provide a valid book id'
        });
    }
    return next();
  }

  /** 
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

export default PayloadValidator;

