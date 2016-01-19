import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember'; // added for the run look pn line 30

moduleForComponent('edit-note', {
  // Specify the other units that are require for this test
  needs: ['component:markdown-to-html'] // so the test knows to use the markdown-to-html class
});

test('it renders', function(assert) { // this code differed from the boilerplate code below
  assert.expect(2);
  
  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');
  
  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it saves', function(assert) {
  var component = this.subject(); // create instance of the object
  this.render(); // render it to the screen
  var saveTarget = { // create a mock object to act in the role of a model
    save: function() { // need just one method
      assert.ok(true,'saved the note'); // put the assertion in the method to verify that it is properly called by the component
    } // if the method is called, the referenced message will be printed and the test will pass
  };
  Ember.run(() => {
    component.set('note', saveTarget); // wrap this since the re-reder caused by the model change will happen asynchronously
  });
  this.$().find('#save').click(); // forces saveNote to fire, which runs the save function on the mock object
});

test('it closes', function(assert) {
  var component = this.subject();
  this.render();
  var closeTarget = { // create a mock object with the method we want to run
    closeAction: function() {
      assert.ok(true,'closed the window');
    }
  }; //Ember.run loop not needed because there are no side-effects
  component.set('close', 'closeAction'); // set the value of the close parameter to the function we're running from the mock object
  component.set('targetObject', closeTarget); // set targetObject to our mock object
  this.$().find('#close').click(); // calls the closeAction in the mock object
});

// moduleForComponent('edit-note', 'Integration | Component | edit note', {
//   integration: true
// });
// 
// test('it renders', function(assert) {
//   
//   // Set any properties with this.set('myProperty', 'value');
//   // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
// 
//   this.render(hbs`{{edit-note}}`);
// 
//   assert.equal(this.$().text().trim(), '');
// 
//   // Template block usage:" + EOL +
//   this.render(hbs`
//     {{#edit-note}}
//       template block text
//     {{/edit-note}}
//   `);
// 
//   assert.equal(this.$().text().trim(), 'template block text');
// });
