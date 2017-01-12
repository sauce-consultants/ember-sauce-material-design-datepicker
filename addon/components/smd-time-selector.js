import Ember from 'ember';
import layout from '../templates/components/smd-time-selector';
import DateTime from '../utils/date-time';
import Setup from '../mixins/setup';

const {
  observer,
  get: get
} = Ember;

export default Ember.Component.extend(Setup, {

  layout: layout,

  tagName: 'div',
  classNames: ['smd-time-selector'],

  hours: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ],

  minutes: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
    47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59
  ],

  setSelected: observer('parent._selectedDate', function(){

    var date = get(this, 'parent._selectedDate');
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var period = hours >= 12 ? 'pm' : 'am';
    // hours = hours;
    // hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;

    this.setProperties({
      selectedHour: hours,
      selectedMinute: minutes,
      selectedPeriod: period
    });

  }),

  actions: {

    scrollToSelectedHour: function(id) {
      var myOffset = this.$().offset().top;
      var hourOffset = this.$("#" + id).offset().top;
      var topOffset = hourOffset - myOffset;
      this.$(".time-options--hours").scrollTop(topOffset  - 125);
    },

    scrollToSelectedMinute: function(id) {
      var myOffset = this.$().offset().top;
      var minuteOffset = this.$("#" + id).offset().top;
      var topOffset = minuteOffset - myOffset;
      console.log(minuteOffset);
      console.log(myOffset);
      console.log(topOffset);
      this.$(".time-options--minutes").scrollTop(topOffset - 125);
    },

    setHour: function(value) {
      get(this, 'parent').send('changeHour', value);
    },

    setMinute: function(value) {
      get(this, 'parent').send('changeMinute', value);
    },

    changePeriod: function() {
      get(this, 'parent').send('changePeriod');
    }

  }

});
