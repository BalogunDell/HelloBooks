const { 
  hompageLogo,
  hompageIntro,
  userLoginData,
  userNavImage,
  userEditData
  } = require('./e2eMockData');


module.exports = {
  'It checks for home page elements': (client) => {
    client
      .url('http://localhost:3003')
      .waitForElementVisible('body', 3000)
      .assert.visible('div.home-bg')
      .assert.visible('h1')
      .assert.containsText('h1','Hellobooks Library')
      .assert.visible('p')
      .assert.containsText('p', hompageIntro)
      .assert.visible('a.btn.waves-effect.waves-ripple.about')
      .assert.containsText('a.btn.waves-effect.waves-ripple.about', 'GET TO KNOW MORE')
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
      .waitForElementVisible('body', 2000)
      .assert.visible('div.home-bg')
      .pause(2000)
  },

  'It should validate input on login': (client) => {
    client
      .url('http://localhost:3003/login')
      .waitForElementVisible('body', 2000)
      .assert.visible('div.home-bg')
      .pause(3000)
      .setValue('input[name=username]', 1)
      .setValue('input[name=password]', 'dsfdddccd')
      .click('#regBtn')
      .pause(3000)
      .waitForElementVisible('div.center.red-text', 3000)
      .assert.visible('div.center.red-text')
      .assert.containsText('div.center.red-text', 'Invalid username or password')
      .pause(2000)
  },

  'It should check for invalid data': (client) => {
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
      .setValue('input[name=username]', userLoginData.fakeData3.username)
      .setValue('input[name=password]', userLoginData.fakeData3.password)
      .click('#regBtn')
      .pause(3000)
      .assert.urlEquals('http://localhost:3003/user/books')
      
  },

  'It ensures that side-nav renders and user borrows a book': (client) => {
    client
      .url('http://localhost:3003/user/books')
      .waitForElementVisible('body', 4000)
      .assert.visible('#userprofile')
      .assert.visible('h5#hellobooksTitle')
      .assert.containsText('h5#hellobooksTitle', 'HELLO BOOKS')
      .assert.visible('span.white-text.username.password')
      .assert.containsText('span.white-text.username.password', 'Password:*****')
      .assert.visible('span.white-text.email')
      .assert.containsText('span.white-text.email', 'Membership: silver')
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
      client.expect.element('a').to.have.attribute('href')
        .which.contains('/user/profile');
      client.expect.element('a#secondLink')
        .to.have.attribute('href').which.contains('/user/books');
      client.expect.element('a#thirdLink')
        .to.have.attribute('href').which.contains('/user/history');
      client.expect.element('a#fourthLink')
        .to.have.attribute('href').which.contains('/user/borrowedbooks');
      client.click('a#bookdetail');
      client.assert.urlEquals('http://localhost:3003/user/bookdetails');
      client.assert.visible('img.responsive-img');
      client.assert.visible('div.bookInfo');
      client.assert.visible('p');
      client.assert.visible('button.btn.waves-teal.waves-effect');
      client.assert.containsText('button.btn.waves-teal.waves-effect', 'BORROW');
      client.click('.btn.waves-teal.waves-effect');
      client.pause(3000);
  },

  'It should render the user profile component': (client) => {
    client
      .url('http://localhost:3003/user/profile')
      .waitForElementVisible('body', 4000)
      .waitForElementVisible('img#image-target', 5000)
      .waitForElementVisible('div.userInfoDisplay', 5000)
      .assert.visible('div.userInfoDisplay')
      .assert.visible('p')
      .assert.visible('button.btn.waves-teal.waves-effect')
      .assert.containsText('button.btn.waves-teal.waves-effect', 'VIEW FULL PROFILE')
      .click('button.btn.waves-teal.waves-effect')
      .pause(4000)
      .assert.visible('div.change-password')
      .assert.visible('table')
      .assert.visible('b')
      .assert.containsText('b', 'Profile Details')
      .assert.visible('td#firstnameText')
      .assert.containsText('td#firstnameText', 'Firstname')
      .assert.visible('td#lastnameText')
      .assert.containsText('td#lastnameText', 'Lastname')
      .assert.visible('td#emailText')
      .assert.containsText('td#emailText', 'Email')
      .assert.visible('td#usernameText')
      .assert.containsText('td#usernameText', 'Username')
      .assert.visible('td#passwordText')
      .assert.containsText('td#passwordText', 'Password')
      .assert.visible('img#image-target');
      client.expect.element('td#firstname').to.be.present;
      client.expect.element('td#lastname').to.be.present;
      client.expect.element('td#email').to.be.present;
      client.expect.element('td#password').to.be.present;
      client.expect.element('td#username').to.be.present;
      client.click('#editProfile');
      client.assert.visible('form');
      client.expect.element('input#firstname').to.be.present;
      client.expect.element('input#lastname').to.be.present;
      client.expect.element('input#username').to.be.present;
      client.pause(3000);
      client.click('#cancelEdit');
      client.pause(3000);
  },

  'It checks if edit profile works': (client) => {
    client
      .url('http://localhost:3003/user/profile')
      .waitForElementVisible('body', 4000)
      .assert.containsText('button.btn.waves-teal.waves-effect', 'VIEW FULL PROFILE')
      .click('button.btn.waves-teal.waves-effect')
      .assert.visible('#editProfile')
      .pause(1000)
      .click('#editProfile')
      .waitForElementVisible('form', 2000)
      .assert.visible('form')
      .assert.visible('input#firstname')
      .assert.visible('input#lastname')
      .assert.visible('input#username')
      .pause(2000)
      .clearValue('input[name=firstname]')
      .setValue('input[name=firstname]', userEditData.firstname)
      .pause(200)
      .clearValue('input[name=lastname]')
      .setValue('input[name=lastname]', userEditData.lastname)
      .pause(300)
      .click('#saveBtn')
      .pause(3000)
  },

  'It should render history component and logout': (client) => {
    client
      .url('http://localhost:3003/user/borrowedbooks')
      .waitForElementVisible('body', 3000)
      .assert.visible('h1')
      .assert.containsText('h1', 'Recently Borrowed')
      .pause(3000)
      .click('.custom')
      .pause(2000)
      .click('.red-text')
      .assert.urlEquals('http://localhost:3003/login');  
  },
}