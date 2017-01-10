import Ember from 'ember';
import layout from '../templates/components/smd-calendar-toolbar';
// import DateTime from './utils/date-time';
import Setup from '../mixins/setup';

var get = Ember.get;

export default Ember.Component.extend(Setup, {

  layout: layout,

  tagName: 'div',
  classNames: ['smd-calendar-toolbar'],

  actions: {

    changeYear: function(delta) {
      get(this, 'parent').send('changeYear', delta);
    },

    changeYearRange: function(delta) {
      get(this, 'parent').send('changeYearRange', delta);
    },

    changeMonth: function(delta) {
      get(this, 'parent').send('changeMonth', delta);
    },

    toggleMonthView: function() {
      get(this, 'parent').send('toggleMonthView');
    },

    toggleMonthSelector: function() {
      get(this, 'parent').send('toggleMonthSelector');
    }

  }

});
