import Ember from 'ember';
import layout from '../templates/components/smd-month-selector';
import Setup from '../mixins/setup';

var set = Ember.set;
var get = Ember.get;

export default Ember.Component.extend(Setup, {

  layout: layout,
  classNames: ['smd-month-selector']

});
