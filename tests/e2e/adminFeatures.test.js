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
  
    'It should display homepage': (client) => {
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
        .setValue('input[name=password]', 'sdy')
        .click('#regBtn')
        .pause(3000)
        .waitForElementVisible('div.center.red-text', 3000)
        .assert.visible('div.center.red-text')
        .assert.containsText('div.center.red-text',
          'Password should not be less than 5 characters')
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
  
    'It should ensure all elements are rendered and show book details':
    (client) => {
      client
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
        .assert.visible('div.settings.white-text')
        .assert.visible('h6.white-text.username.password')
        .assert.containsText('h6.white-text.username.password',
        'Password:*****')
        .assert.visible('i.material-icons.editPass')
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
        client.click('a#bookdetail');
        client.assert.urlEquals('http://localhost:3003/user/bookdetails');
        client.assert.visible('img.responsive-img');
        client.assert.visible('div.bookInfo');
        client.assert.visible('p');
        client.assert.visible('a.btn.waves-teal.waves-effect');
        client.assert.containsText('a.btn.waves-teal.waves-effect', 'BACK');
        client.pause(3000);
    },

    'It should create a book': (client) => {
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
        .click('#thirdLink')
        .pause(2000)
        .assert.urlEquals('http://localhost:3003/user/upload')
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
        .click('#Education')
        .pause(4000)
        .setValue('input[type="file"]', path.resolve('./gitCheat.jpeg'))
        .setValue('input[type="file"]', path.resolve('./tesbook.pdf'))
        .pause(4000)
        .waitForElementVisible('input[type=submit]', 5000)
        .click('input[type=submit]')
        .pause(10000)
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
        .waitForElementVisible('#Health', 3000)
        .click('#Health')
        .pause(4000)
        .waitForElementPresent('#editBook', 3000)
        .click('#editBook')
        .pause(5000)
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

