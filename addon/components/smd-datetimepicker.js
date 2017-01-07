import Ember from 'ember';
import layout from '../templates/components/smd-datetimepicker';
import DateTime from '../utils/date-time';

const {
  computed,
  get: get,
  set: set,
  on
} = Ember;

export default Ember.Component.extend({

  layout: layout,

  tagName: 'div',
  classNames: ['smd-datepicker'],

  // delete me later
  selectedTime: computed('_selectedDate', function(){

    var d = get(this, '_selectedDate');
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;

  }),

  // private vars
  _displayDate: null,
  _selectedDate: null,
  _weekCount: null,

  _prevMonth: null,
  _nextMonth: null,

  _currentState: null,

  showCalendarPanel: true,
  showMonthSelector: false,
  showYearSelector: false,
  showTimeSelector: false,

  setSelected: Ember.observer('_selectedDate', function(){

    var date = get(this, '_selectedDate');

    this.setProperties({
      selectedDay: date.getDate(),
      selectedMonth: DateTime.getShortMonth(date),
      selectedDate: DateTime.getDayOfWeek(date),
      selectedYear: date.getFullYear()
    });

  }),

  initialState: on('init', function(){

    var d = new Date();
    var displayDate = DateTime.getFirstDayOfMonth(d);
    var nextMonth;

    this.setProperties({
      _displayDate: displayDate,
      _selectedDate: d,
      _weekCount: DateTime.getWeekArray(displayDate)
    });

  }),

  actions: {

    confirm: function() {
      console.log('confirm');
      this.sendAction('confirmAction', get(this, '_selectedDate'));
    },

    cancel: function() {
      console.log('cancel');
      this.sendAction('cancelAction');
    },

    setYear: function(year) {
      var newDate = DateTime.clone(get(this, '_displayDate'));
      newDate.setYear(year);

      this.setProperties({
        _displayDate: DateTime.getFirstDayOfMonth(newDate),
        _weekCount: DateTime.getWeekArray(newDate),
      });

      this.changeState('selectMonth');
    },

    setMonth: function(params) {

      var newDate = DateTime.clone(get(this, '_displayDate'));
      newDate.setMonth(params.id);

      this.setProperties({
        _displayDate: DateTime.getFirstDayOfMonth(newDate),
        _weekCount: DateTime.getWeekArray(newDate),
      });

      this.changeState('showCalendarPanel');
    },

    changeMonth: function(delta) {

      console.log('changeMonth', delta);

      var newDate = DateTime.clone(get(this, '_displayDate'));
      newDate.setMonth(newDate.getMonth() + delta);

      this.setProperties({
        _displayDate: DateTime.getFirstDayOfMonth(newDate),
        _weekCount: DateTime.getWeekArray(newDate)
      });

    },

    changeYearRange: function(delta) {
      var newDate = DateTime.clone(get(this, '_displayDate'));

      if(delta > 0) {
        newDate.setYear(newDate.getFullYear() + 12);
      } else {
        newDate.setYear(newDate.getFullYear() - 12);
      }

      this.setProperties({
        _displayDate: DateTime.getFirstDayOfMonth(newDate),
        _weekCount: DateTime.getWeekArray(newDate)
      });
    },

    changeHour: function(delta) {

      var newDate = DateTime.clone(get(this, '_selectedDate'));
      newDate.setHours(newDate.getHours() + delta);

      this.setProperties({
        _selectedDate: newDate
      });

    },

    changeMinute: function(delta) {

      var newDate = DateTime.clone(get(this, '_selectedDate'));
      newDate.setMinutes(newDate.getMinutes() + delta);

      set(this, '_selectedDate', newDate);

    },

    changePeriod: function(delta) {

      var newDate = DateTime.clone(get(this, '_selectedDate'));
      var hours = newDate.getHours();

      hours = hours > 12 ? hours - 12 : hours + 12;
      newDate.setHours(hours);

      set(this, '_selectedDate', newDate);

    },

    changeYear: function(delta) {

      var newDate = DateTime.clone(get(this, '_displayDate'));
      newDate.setYear(newDate.getFullYear() + delta);

      this.setProperties({
        _displayDate: DateTime.getFirstDayOfMonth(newDate),
        _weekCount: DateTime.getWeekArray(newDate)
      });

    },

    toggleMonthView: function() {
      this.changeState('selectMonth');
    },

    toggleMonthSelector: function() {
      this.changeState('selectYear');
    },

    toggleTimeSelector: function() {
      var _this = this;
      var currentState = get(this, '_currentState');
      if(currentState === 'selectTime') {
        var previousState = get(this, '_previousState');
        set(this, '_currentState', previousState);
      } else {
        this.changeState('selectTime');
      }
    }

  },

  _previousState: null,

  changeState: function(state) {
    set(this, 'showCalendarPanel', false);
    set(this, 'showMonthSelector', false);
    set(this, 'showYearSelector', false);
    set(this, 'showTimeSelector', false);

    switch (state) {
      case 'showCalendarPanel':
        set(this, 'showCalendarPanel', true);
        break;
      case 'selectMonth':
        set(this, 'showMonthSelector', true);
        break;
      case 'showCalendarPanel':
        set(this, 'showCalendarPanel', true);
        break;
      case 'showCalendarPanel':
        set(this, 'showCalendarPanel', true);
        break;
    }

  }

});
