import Ember from 'ember';
import layout from '../templates/components/smd-month-selector';
import DateTime from '../utils/date-time';
import Setup from '../mixins/setup';

var get = Ember.get;
var set = Ember.set;

export default Ember.Component.extend(Setup, {

  layout: layout,

  tagName: 'div',
  classNames: ['smd-month-selector'],

  year: Ember.computed('parent._displayDate', function(){
    var year = get(this, 'parent._displayDate').getFullYear();
    return year;
  }),

  selectedMonth: Ember.computed('parent._selectedDate', 'parent._displayDate', function(){

    var selectedDate = get(this, 'parent._selectedDate');
    var displayDate = get(this, 'parent._displayDate');

    if(displayDate.getFullYear() === selectedDate.getFullYear()) {
      var selectedMonth = selectedDate.getMonth();
      var item = get(this, 'months').objectAt(selectedMonth);
      set(item, 'isSelected', true);
    } else {
      this.resetMonths();
    }

  }),

  formatDate: function(date) {
    return date.getMonth() + '/' + date.getFullYear();
  },

  resetMonths: function() {
    get(this, 'months').forEach(function(item){
      set(item, 'isSelected', false);
    });
  },

  months: null,

  setupMonths: Ember.on('init', function(){
    var months = Ember.A();

    months.pushObject(Ember.Object.create({id: 0, name: 'Jan'}));
    months.pushObject(Ember.Object.create({id: 1, name: 'Feb'}));
    months.pushObject(Ember.Object.create({id: 2, name: 'Mar'}));
    months.pushObject(Ember.Object.create({id: 3, name: 'Apr'}));
    months.pushObject(Ember.Object.create({id: 4, name: 'May'}));
    months.pushObject(Ember.Object.create({id: 5, name: 'Jun'}));
    months.pushObject(Ember.Object.create({id: 6, name: 'Jul'}));
    months.pushObject(Ember.Object.create({id: 7, name: 'Aug'}));
    months.pushObject(Ember.Object.create({id: 8, name: 'Sep'}));
    months.pushObject(Ember.Object.create({id: 9, name: 'Oct'}));
    months.pushObject(Ember.Object.create({id: 10, name: 'Nov'}));
    months.pushObject(Ember.Object.create({id: 11, name: 'Dec'}));

    set(this, 'months', months);
  }),

  actions: {

    setMonth: function(params) {

      console.log('month-view setMonth');
      get(this, 'parent').send('setMonth', params);

    }

  }

});
