import Ember from 'ember';
import layout from '../templates/components/smd-time-selector';
import Setup from '../mixins/setup';

var set = Ember.set;
var get = Ember.get;

export default Ember.Component.extend(Setup, {

  layout: layout,
  classNames: ['smd-time-selector']

});
