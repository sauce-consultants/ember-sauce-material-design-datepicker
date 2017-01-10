import Ember from 'ember';
import layout from '../templates/components/smd-datepicker';
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
  classNameBindings: ['isSelectingDate:smd-datepicker--selecting-date:smd-datepicker--selecting-time'],

  // delete me later
  selectedTime: computed('_selectedDate', function(){

    var d = get(this, '_selectedDate');
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    // hours = hours % 12;
    // hours = hours ? hours : 12;
    hours = hours < 10 ? '0'+hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    // var strTime = hours + ':' + minutes + ' ' + ampm;
    var strTime = hours + ':' + minutes;
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

  isSelectingDate: true,

  selectedDateTime: null,

  setSelected: Ember.observer('_selectedDate', function(){

    var date = get(this, '_selectedDate');

    this.setProperties({
      selectedDay: date.getDate(),
      selectedMonth: DateTime.getShortMonth(date),
      selectedDate: DateTime.getDayOfWeek(date),
      selectedYear: date.getFullYear()
    });

    set(this, 'selectedDateTime', date);

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
      this.sendAction('confirmAction', get(this, '_selectedDate'));
    },

    cancel: function() {
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
      newDate.setHours(delta);

      this.setProperties({
        _selectedDate: newDate
      });

    },

    changeMinute: function(delta) {

      var newDate = DateTime.clone(get(this, '_selectedDate'));
      newDate.setMinutes(delta);

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

    showCalendarPanel: function() {
      set(this, 'isSelectingDate', true);
      this.changeState('showCalendarPanel');
    },

    showTimeSelector: function() {
      set(this, 'isSelectingDate', false);
      this.changeState('selectTime');
    },

    toggleTimeSelector: function() {
      if(get(this, 'showTimeSelector')) {
        this.changeState('showCalendarPanel');
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
      case 'selectYear':
        set(this, 'showYearSelector', true);
        break;
      case 'selectTime':

        set(this, 'showTimeSelector', true);
        break;
    }

  }

});
