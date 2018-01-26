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
  
    'It should display login page': (client) => {
      client
        .url('http://localhost:3003/login')
        .waitForElementVisible('body', 3000)
        .assert.visible('div.home-bg')
        .pause(2000)
    },
  
    'It should validate login credentials': (client) => {
      client
        .url('http://localhost:3003/login')
        .waitForElementVisible('body', 2000)
        .assert.visible('div.home-bg')
        .pause(3000)
        .setValue('input[name=username]', 'dfv')
        .setValue('input[name=password]', sdf)
        .click('#regBtn')
        .pause(3000)
        .waitForElementVisible('div.center.red-text', 3000)
        .assert.visible('div.center.red-text')
        .assert.containsText('div.center.red-text', 'Invalid username or password')
        .pause(2000)
    },
  
  
    'It should redirect to library on successful login': (client) => {
      client
        .url('http://localhost:3003/login')
        .waitForElementVisible('body', 2000)
        .assert.visible('div.home-bg')
        .pause(3000)
        .setValue('input[name=username]', userLoginData.fakeData4.username)
        .setValue('input[name=password]', userLoginData.fakeData4.password)
        .click('#regBtn')
        .pause(3000)
        .assert.urlEquals('http://localhost:3003/user/books')
        
    },
  
    'It should ensure all elements are rendered and show book details': (client) => {
      client
        .url('http://localhost:3003/user/books')
        .waitForElementVisible('body', 4000)
        .assert.visible('#userprofile')
        .assert.visible('h5#hellobooksTitle')
        .assert.containsText('h5#hellobooksTitle', 'HELLO BOOKS')
        .assert.visible('span.white-text.username.password')
        .assert.containsText('span.white-text.username.password', 'Password:*****')
        .assert.visible('div.col.s12.books-holder-title.center')
        .assert.visible('h1')
        .assert.containsText('h1', 'All Books')
        .waitForElementVisible('div.books-holder.center', 3000)
        .waitForElementVisible('a#bookdetail', 3000)
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
        client.expect.element('a#fourthLink')
          .to.have.attribute('href').which.contains('/user/deletedbooks');
        client.click('a#bookdetail');
        client.assert.urlEquals('http://localhost:3003/user/bookdetails');
        client.assert.visible('img.responsive-img');
        client.assert.visible('div.bookInfo');
        client.assert.visible('p');
        client.assert.visible('a.btn.waves-teal.waves-effect');
        client.assert.containsText('a.btn.waves-teal.waves-effect', 'BACK');
        client.pause(3000);
    },

    'It should render admin dashboard and delete a book': (client) => {
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
    },

    'It should edit a book': (client) => {
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
        .click('.browser-default')
        .click('#Health')
        .pause(4000)
        .waitForElementPresent('#bookImage', 3000)
        .setValue('#bookImageInput', path.resolve('../../../personal/myimage2.jpeg'))
        .pause(2000)
        .setValue('#pdfInput', path.resolve('../../../personal/Apprenticeship-Patternsbydave-hoover.pdf'))
        .click('#createBook')
        .pause(5000)
    },
  
    'It should render deleted books component': (client) => {
      client
        .url('http://localhost:3003/user/deletedbooks')
        .waitForElementVisible('body', 3000)
        .assert.visible('h1')
        .assert.containsText('h1', 'Deleted Books')
        .click('.custom')
        .waitForElementVisible('div#confirmationModal', 3000)
        .assert.visible('div#confirmationModal')
        .assert.visible('button.btn.red.modal-close')
        .assert.containsText('button.btn.red.modal-close','CANCEL')
        .click('.custom')
        .assert.visible('button.btn.green')
        .assert.containsText('button.btn.green','PUBLISH')
        .assert.containsText('h6.green-text', 'Publishing this book will make it available to all users, do you want to continue?')
        .click('.btn.red.modal-close')
        .pause(3000)
        .click('.custom')
        .pause(3000)
        .click('.btn.green')
        .waitForElementVisible('h6.green-text', 3000)
        .assert.visible('h6.green-text')
        .assert.containsText('h6.green-text', 'Book has been successfully pulished')
        .pause(3000)
    },
    'It should log user out of the application': (client) => {
      client
        .url('http://localhost:3003/user/books')
        .waitForElementVisible('body', 3000)
        .assert.visible('a.red-text')
        .pause(2000)
        .click('a.red-text')
        .assert.urlEquals('http://localhost:3003/login')
        .pause(2000)
        .end();
    }
  }

