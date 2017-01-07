import Ember from 'ember';
import layout from '../templates/components/smd-calendar';
import Setup from '../mixins/setup';

var set = Ember.set;
var get = Ember.get;

export default Ember.Component.extend(Setup, {

  layout: layout,
  classNames: ['smd-calendar-month'],

  weekCount: Ember.computed.alias('parent._weekCount'),

  nextMonth: Ember.computed.alias('parent._nextMonth')

});
