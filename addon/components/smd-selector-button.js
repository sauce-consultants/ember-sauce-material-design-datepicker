import Ember from 'ember';
import layout from '../templates/components/smd-selector-button';
import Setup from '../mixins/setup';

var get = Ember.get;

export default Ember.Component.extend(Setup, {

  layout: layout,

  tagName: 'button',
  classNames: ['datetime-picker-button'],
  classNameBindings: ['selected'],

  selected: Ember.computed('selectedValue', 'params', function(){
    return get(this, 'selectedValue') == get(this, 'params');
  }),

  click: function() {
    get(this, 'for').send(get(this, 'action'), get(this, 'params'));
  },

  displayValue: Ember.computed('label', function() {
    console.log('test');
    var label = get(this, 'label');
    var leftPad = get(this, 'leftPad');
    if (label < 10 && leftPad) {
      return '0' + label;
    } else {
      return label;
    }
  }),

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
