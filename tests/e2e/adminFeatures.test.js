const path = require('path');
const { 
    hompageLogo,
    hompageIntro,
    userLoginData,
    userNavImage,
    userEditData,
    fakeBookData,
    fakeEditBookData
    } = require('./e2eMockData');
  
  
  module.exports = {
  
    'Admin should see homepage': (client) => {
      client
      .url('http://localhost:3003')
      .waitForElementVisible('body', 3000)
      .assert.visible('div.home-bg')
      .assert.visible('h1')
      .assert.containsText('h1','Hellobooks Library')
      .assert.visible('p')
      .assert.containsText('p', hompageIntro)
      .assert.visible('a.btn.waves-effect.waves-ripple.about')
      .assert.containsText('a.btn.waves-effect.waves-ripple.about',
      'GET TO KNOW MORE')
      .assert.visible('a.btn.waves-effect.waves-ripple.signup')
      .assert.containsText('a.btn.waves-effect.waves-ripple.signup', 'SIGNUP')
      .pause(2000)
      .waitForElementVisible('div.container.home-books', 3000)
      .assert.visible('div.container.home-books')
      .assert.visible('h1.trending')
      .assert.containsText('h1.trending','Trending Books')
      .assert.visible('button.btn.waves-effect.waves-teal')
      .pause(600);
    },

    'Admin can log in': (client) => {
      client
        .url('http://localhost:3003/login')
        .waitForElementVisible('body', 3000)
        .assert.visible('div.home-bg')
        .assert.visible('div.user-form')
        .assert.visible('input#username')
        .assert.visible('input#password')
        .assert.visible('input#loginBtn')
        .pause(2000)
    },
  
    'It should validate admin login credentials when admin tries to login':
    (client) => {
      client
        .url('http://localhost:3003/login')
        .waitForElementVisible('body', 2000)
        .assert.visible('div.home-bg')
        .pause(3000)
        .setValue('input[name=username]', 'dfv')
        .setValue('input[name=password]', 'sdy')
        .click('#loginBtn')
        .pause(3000)
        .waitForElementVisible('div.toast.red.rounded', 3000)
        .assert.visible('div.toast.red.rounded')
        .assert.containsText('div.toast.red.rounded',
          'Password should not be less than 5 characters')
        .pause(2000)
        .url('http://localhost:3003/login')
        .waitForElementVisible('body', 2000)
        .assert.visible('div.home-bg')
        .pause(3000)
        .setValue('input[name=username]', userLoginData.fakeData4.username)
        .setValue('input[name=password]', userLoginData.fakeData4.password)
        .click('#loginBtn')
    },
  
  
    'Admin should be redirected to library': (client) => {
      client
        .pause(3000)
        .assert.urlEquals('http://localhost:3003/user/books')
        .url('http://localhost:3003/user/books')
        .waitForElementVisible('body', 4000)
        .assert.visible('#userprofile')
        .assert.visible('h5#hellobooksTitle')
        .assert.containsText('h5#hellobooksTitle', 'HELLO BOOKS')
        .waitForElementVisible('img.responsive-img.center', 3000)
        .assert.visible('img.responsive-img.center')
        .assert.visible('a#firstLink')
        .assert.visible('a#secondLink')
        .assert.visible('a#thirdLink')
        .assert.visible('div.col.s12.books-holder-title.center')
        .assert.visible('h1')
        .assert.containsText('h1', 'All Books')
        .waitForElementVisible('div.books-holder.center', 3000)
        .waitForElementVisible('button#bookdetail', 3000)
        .assert.visible('div.books-holder.center');
        client.expect.element('div.book-holder-prot').to.be.present;
        client.expect.element('div.item.book-title.center').to.be.present;
        client.expect.element('h6').to.be.present;
        client.expect.element('strong').to.be.present;
        client.expect.element('div.dets').to.be.present;
        client.expect.element('img.responsive-img.center')
        .to.have.attribute('src').which.contains(userNavImage);
        client.expect.element('a#firstLink')
         .to.have.attribute('href').which.contains('/user/dashboard');
        client.expect.element('a#secondLink').to.have.attribute('href')
          .which.contains('/user/books');
        client.expect.element('a#thirdLink')
          .to.have.attribute('href').which.contains('/user/upload');
          client.click('button#bookdetail');
      },

      'Admin can view book details,': (client) => { 
        client.assert.urlEquals('http://localhost:3003/user/bookdetails');
        client.assert.visible('img.responsive-img');
        client.assert.visible('div.bookInfo');
        client.assert.visible('p');
        client.waitForElementVisible('img.responsive-img', 4000);
        client.assert.visible('img.responsive-img');
        client.assert.visible('th#bookTitle');
        client.assert.containsText('th#bookTitle', 'React for Beginners');
        client.assert.visible('td#bookAuthor');
        client.assert.containsText('td#bookAuthor', 'Nelson Brook');
        client.assert.visible('td#bookCategory');
        client.assert.containsText('td#bookCategory', 'Health');
        client.assert.visible('td#bookIsbn');
        client.assert.containsText('td#bookIsbn', '#111111');
        client.assert.visible('td#bookYear');
        client.assert.containsText('td#bookYear', 2010);
        client.assert.visible('td#bookPages');
        client.assert.containsText('td#bookPages', 1080);
        client.assert.visible('td#bookQuantity');
        client.assert.containsText('td#bookQuantity', 3);
        client.assert.visible('p#bookDescription');
        client.assert.containsText('p#bookDescription',
        'the books does this and that');
        client.assert.visible('a.btn.waves-teal.waves-effect');
        client.assert.containsText('a.btn.waves-teal.waves-effect', 'BACK');
        client.pause(3000);
    },

    'Admin can edit a book': (client) => {
      client 
        .url('http://localhost:3003/user/dashboard')
        .waitForElementVisible('body', 3000)
        .assert.visible('h4.center')
        .assert.containsText('h4.center', 'ADMIN DASHBOARD')
        .waitForElementVisible('table.summary-table', 3000)
        .assert.visible('table.summary-table')
        .assert.visible('thead')
        .assert.visible('th')
        .assert.containsText('th', 'SUMMARY')
        .pause(3000)
        .assert.visible('td#totalBooksText')
        .assert.containsText('td#totalBooksText', 'Total Books in Library')
        .assert.visible('td#returnedBooksText')
        .assert.containsText('td#returnedBooksText', 'Books Returned')
        .assert.visible('td#pendingBooksText')
        .assert.containsText('td#pendingBooksText', 'Pending Return')
        .assert.visible('td#totalBooks')
        .assert.visible('#edit')
        .pause(3000)
        .click('#edit')
        .pause(5000)
        .waitForElementVisible('body', 3000)
        .setValue('input[name=isbn]', fakeBookData.isbn)
        .setValue('input[name=title]', fakeBookData.title)
        .setValue('input[name=author]', fakeBookData.author)
        .setValue('input[name=pages]', fakeBookData.pages)
        .setValue('input[name=year]', fakeBookData.year)
        .setValue('textarea[name=description]', fakeBookData.description)
        .setValue('input[name=quantity]', fakeBookData.quantity)
        .pause(3000)
        .waitForElementPresent('#editBook', 3000)
        .click('#editBook')
        .waitForElementVisible('body', 3000)
        .url('http://localhost:3003/user/dashboard')
        .waitForElementVisible('body', 3000)
        .assert.visible('h4.center')
        .assert.containsText('h4.center', 'ADMIN DASHBOARD')
        .waitForElementVisible('table.summary-table', 3000)
        .assert.visible('table.summary-table')
        .assert.visible('thead')
        .assert.visible('th')
        .assert.containsText('th', 'SUMMARY')
        .pause(3000)
        .assert.visible('td#totalBooksText')
        .assert.containsText('td#totalBooksText', 'Total Books in Library')
        .assert.visible('td#returnedBooksText')
        .assert.containsText('td#returnedBooksText', 'Books Returned')
        .assert.visible('td#pendingBooksText')
        .assert.containsText('td#pendingBooksText', 'Pending Return')
        .assert.visible('td#totalBooks')
        .assert.visible('a.modal-trigger')
        .waitForElementVisible('tr:nth-child(1)', 5000)
        .assert.containsText('tr:nth-child(1) td:nth-child(3)',
        'React for Beginners')
        .pause(5000)
    },
    'Admin can delete a book': (client) => {
      client 
        .url('http://localhost:3003/user/dashboard')
        .waitForElementVisible('body', 3000)
        .assert.visible('h4.center')
        .assert.containsText('h4.center', 'ADMIN DASHBOARD')
        .waitForElementVisible('table.summary-table', 3000)
        .assert.visible('table.summary-table')
        .assert.visible('thead')
        .assert.visible('th')
        .assert.containsText('th', 'SUMMARY')
        .pause(3000)
        .assert.visible('td#totalBooksText')
        .assert.containsText('td#totalBooksText', 'Total Books in Library')
        .assert.visible('td#returnedBooksText')
        .assert.containsText('td#returnedBooksText', 'Books Returned')
        .assert.visible('td#pendingBooksText')
        .assert.containsText('td#pendingBooksText', 'Pending Return')
        .assert.visible('td#totalBooks')
        .assert.visible('a.modal-trigger')
        .pause(3000)
        .click('.modal-trigger')
        .waitForElementVisible('div#confirmationModal', 3000)
        .assert.visible('div#confirmationModal')
        .assert.visible('button.btn.red.modal-close')
        .assert.containsText('button.btn.red.modal-close','CANCEL')
        .assert.visible('button.btn.green')
        .assert.containsText('button.btn.green','DELETE')
        .assert.visible('h6')
        .assert.visible('h6', 'Are you sure you want to delete this book?')
        .click('.btn.green')
        .pause(5000)
        .waitForElementNotPresent('#deleted', 5000)
        .assert.elementNotPresent('tr:nth-child(1)')
        .pause(5000)
    },
    'Admin can logout': (client) => {
      client
        .waitForElementVisible('body', 3000)
        .assert.visible('a.red-text')
        .pause(2000)
        .click('a.red-text')
        .assert.urlEquals('http://localhost:3003/login')
        .waitForElementVisible('body', 3000)
        .assert.visible('div.home-bg')
        .assert.visible('div.user-form')
        .assert.visible('input#username')
        .assert.visible('input#password')
        .assert.visible('input#loginBtn')
        .pause(2000)
        .end();
    }
  }

