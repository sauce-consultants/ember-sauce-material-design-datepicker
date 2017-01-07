import Ember from 'ember';
import layout from '../templates/components/smd-year-selector';
import DateTime from '../utils/date-time';
import Setup from '../mixins/setup';

var get = Ember.get;
var set = Ember.set;

export default Ember.Component.extend(Setup, {

  layout: layout,

  tagName: 'div',
  classNames: ['smd-year-selector'],

  yearsArray: null,

  yearRange: Ember.computed('years', function(){
    return get(this, 'years.firstObject.year') + '-' + get(this, 'years.lastObject.year');
  }),

  years: Ember.computed('parent._displayDate', function(){

    var year = get(this, 'parent._displayDate').getFullYear();
    var selectedYear = get(this, 'parent._selectedDate').getFullYear();
    var yearsLowerBound = year-5;
    var yearsUpperBound = year+7;
    var years = Ember.A();

    for(var i = yearsLowerBound; i < yearsUpperBound; i++ ) {
      if(i === selectedYear) {
        years.pushObject(Ember.Object.create({year: i, isSelected: true}));
      } else {
        years.pushObject(Ember.Object.create({year: i}));
      }
    }

    set(this, 'yearsArray', years);

    return years;

  }),

  actions: {

    setYear: function(params) {

      get(this, 'parent').send('setYear', params.year);

    }

  }

});
