import Ember from 'ember';
import layout from '../templates/components/smd-selector-button';
import Setup from '../mixins/setup';

var get = Ember.get;

export default Ember.Component.extend(Setup, {

  layout: layout,

  tagName: 'button',
  classNames: ['datetime-picker-button'],
  classNameBindings: ['selected'],

  click: function() {
    get(this, 'for').send(get(this, 'action'), get(this, 'params'));
  },

  actions: {

    changeYear: function(delta) {
      get(this, 'parent').send('changeYear', delta);
    },

    changeMonth: function(delta) {
      get(this, 'parent').send('changeMonth', delta);
    },

    toggleMonthView: function() {
      get(this, 'parent').send('toggleMonthView')
    }

  }

});
