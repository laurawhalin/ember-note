import Ember from 'ember';
import { test } from 'qunit';
// import moduleForAcceptance from 'ember-note/tests/helpers/module-for-acceptance';
import startApp from 'ember-note/tests/helpers/start-app';

// moduleForAcceptance('Acceptance | register');

var application;

module('Acceptance | register', {
  beforeEach: function() {
    application = startApp(); // creates an instance of the full application
  },
  
  afterEach: function() {
    Ember.run(application, 'destroy'); // destroys app instance
  }
});

test('visiting /register', function(assert) { // navigate to the chosen URL
  visit('/register');

  fillIn('#name', 'test@laura.com'); // fill in the name field
  click('#register'); // click! of course

  andThen(function() { // wrap in andThen to respec any asynchronous functions that came before
    assert.equal(find('#message').text().trim(), // verify the correct message displays
      'A new user with the name "test@laura.com" was added!');
    assert.equal(currentURL(), '/register'); // verify the route is the same
  });
});
