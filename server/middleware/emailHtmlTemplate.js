export const htmlTemplates = {
  resetPassword: (passUrl) => {
    return `<h1>RESET YOUR PASSWORD</h1>
      <p>You requested to reset your password</p>
      <p><a href="https://hellobooksapp.herokuapp.com/resetpassword/${passUrl}">Click here to reset your password</a></p>`;
  },

  borrowBookNotifier: (borrower, book) => {
    return `<h1>A BOOK WAS JUST BORRWED</h1>
      <p>A book has just been borrowed. Find details below</p>
      <ul><li>Borrower: ${borrower}</li><li>Book Borrowed: ${book}</li></ul>`;
  },
};

export const emailSubjects = {
  resetpasswordSubject: 'Password reset link',
  borrowNotifierSubject: 'NeW Book Borrowed'
};
