import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    confirm: function(date) {
      alert('confirm clicked, selected date passed as parameter: ' + date);
    },

    cancel: function() {
      alert('cancel clicked');
    }

  }
});
