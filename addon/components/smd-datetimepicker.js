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

  _currentState: 'default',

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

  componentPartial: computed('_currentState', function(){

      var state = get(this, '_currentState');
      var state = 'default';
      var partial;

      alert('test')


      set(this, 'showCalendarPanel', false);
      set(this, 'showMonthSelector', false);
      set(this, 'showYearSelector', false);
      set(this, 'showTimeSelector', false);

      switch(state) {
        case 'default':
        alert('test')
          set(this, 'showCalendarPanel', true);
          partial = 'smd-calendar-panel';
          break;
        case 'selectMonth':
          set(this, 'showMonthSelector', true);
          partial = 'smd-month-selector';
          break;
        case 'selectYear':
          set(this, 'showYearSelector', true);
          partial = 'smd-year-selector';
          break;
        case 'selectTime':
          set(this, 'showTimeSelector', true);
          partial = 'smd-time-selector';
          break;
      }

      return partial;

  }),

  initialState: on('init', function(){

    var d = new Date();
    var displayDate = DateTime.getFirstDayOfMonth(d);
    var nextMonth;

    this.setProperties({
      _displayDate: displayDate,
      _selectedDate: d,
      _weekCount: DateTime.getWeekArray(displayDate),
      _currentState: 'default'
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

      this.changeState('default');
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

    var currentState = get(this, '_currentState');
    set(this, '_previousState', currentState);
    set(this, '_currentState', state);

  }

});
