const { 
    hompageLogo,
    hompageIntro,
    userLoginData,
    userNavImage,
    userEditData
    } = require('./e2eMockData');
  
  
  module.exports = {
  
    'It should display login page': (client) => {
      client
        .url('http://localhost:3003/login')
        .waitForElementVisible('body', 2000)
        .assert.visible('div.home-bg')
        .pause(2000)
    },
  
    'It should display error message when no login details are provided': (client) => {
      client
        .url('http://localhost:3003/login')
        .waitForElementVisible('body', 2000)
        .assert.visible('div.home-bg')
        .pause(3000)
        .setValue('input[name=username]', '')
        .setValue('input[name=password]', '')
        .click('#regBtn')
        .pause(3000)
        .waitForElementVisible('div.center.red-text', 3000)
        .assert.visible('div.center.red-text')
        .assert.containsText('div.center.red-text', 'Provide your username and password to login')
        .pause(2000)
    },
  
    'It should display error message when invalid login details are provided': (client) => {
      client
        .url('http://localhost:3003/login')
        .waitForElementVisible('body', 2000)
        .assert.visible('div.home-bg')
        .pause(3000)
        .setValue('input[name=username]', userLoginData.fakeData1.username)
        .setValue('input[name=password]', userLoginData.fakeData1.password)
        .click('#regBtn')
        .pause(3000)
        .waitForElementVisible('div.center.red-text', 3000)
        .assert.visible('div.center.red-text')
        .assert.containsText('div.center.red-text', 'Invalid username or password')
        .pause(2000)
    },
  
    'It should display error message when username is correct and password is wrong': (client) => {
      client
        .url('http://localhost:3003/login')
        .waitForElementVisible('body', 2000)
        .assert.visible('div.home-bg')
        .pause(3000)
        .setValue('input[name=username]', userLoginData.fakeData2.username)
        .setValue('input[name=password]', userLoginData.fakeData2.password)
        .click('#regBtn')
        .pause(3000)
        .waitForElementVisible('div.center.red-text', 3000)
        .assert.visible('div.center.red-text')
        .assert.containsText('div.center.red-text', 'Invalid username or password')
        .pause(2000)
    },
  
    'It should log user in when they provide valid login details': (client) => {
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
  
    'It should ensure that side nav renders all components and borrow a book': (client) => {
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
        client.expect.element('img.responsive-img.center').to.have.attribute('src').which.contains(userNavImage);
        client.expect.element('a#firstLink').to.have.attribute('href').which.contains('/user/dashboard');
        client.expect.element('a#secondLink').to.have.attribute('href').which.contains('/user/books');
        client.expect.element('a#thirdLink').to.have.attribute('href').which.contains('/user/upload');
        client.expect.element('a#fourthLink').to.have.attribute('href').which.contains('/user/deletedbooks');
        client.click('a#bookdetail');
        client.assert.urlEquals('http://localhost:3003/user/bookdetails');
        client.assert.visible('img.responsive-img');
        client.assert.visible('div.bookInfo');
        client.assert.visible('p');
        client.assert.visible('a.btn.waves-teal.waves-effect');
        client.assert.containsText('a.btn.waves-teal.waves-effect', 'BACK');
        client.pause(3000);
    },

    'It should render admin dashboard': (client) => {
      client 
        .url('http://localhost:3003/user/dashboard')
        .waitForElementVisible('body', 3000)
        .assert.visible('h1.center')
        .assert.containsText('h1.center', 'ADMIN DASHBOARD')
        .waitForElementVisible('table.summary-table', 3000)
        .assert.visible('table.summary-table')
        .assert.visible('thead')
        .assert.visible('th')
        .assert.containsText('th', 'SUMMARY')
        .pause(3000)
        // .assert.visible('td#totalBooksText')
        // .asserrt.containsText('td#totalBooksText', 'Total Books in Library')
        // .assert.visible('td#returnedBooksText')
        // .asserrt.containsText('td#returnedBooksText', 'Books Returned')
        // .assert.visible('td#pendingBooksText')
        // .asserrt.containsText('td#pendingBooksText', 'Pending Return')
        // .assert.visible('td#totalBooks')
        // .asserrt.containsText('td#totalBooks', /([0-9])+/)
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