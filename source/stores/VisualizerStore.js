// var Fluxxor = require('fluxxor'),
//           _ = require('lodash');

// var Guid = require('../helpers/Guid.js');

// var messages = {
//   AddVisualizer:    'store.visualizer.add',
//   RemoveVisualizer: 'store.visualizer.delete',
//   UpdateVisualizer: 'store.visualizer.update'
// };

// module.exports = Fluxxor.createStore({
//   initialize: function() {
//     this.visualizers = {};
//     this.messages = messages;
//     this.actions = {
//       addVisualizer: function(visualizer) {
//         visualizer = visualizer || {};
//         this.dispatch(events.Add, {
//           type: visualizer.type,
//           settings: visualizer.settings || {}
//         });
//       },
//       removeVisualizer: function(id) {
//         this.dispatch(events.Remove, id);
//       },
//       updateVisualizer: function(visualizer) {
//         visualizer = visualizer || {};
//         this.dispatch(events.Update, {
//           type: visualizer.type,
//           settings: visualizer.settings || {}
//         });
//       }
//     };

//     this.bindActions(
//       messages.AddVisualizer,    this.onAddVisualizer,
//       messages.RemoveVisualizer, this.onRemoveVisualizer,
//       messages.UpdateVisualizer, this.onUpdateVisualizer
//     );
//   },

//   onAddVisualizer: function(visualizer) {
//     var id = Guid.generate();
//     this.visualizers[visualizer.id] = _.extend({}, visualizer, { id: id });;
//     this.emit('change');
//   },
//   onRemoveVisualizer: function(id) {
//     delete this.visualizers[id];
//     this.emit('change');
//   },
//   onUpdateVisualizer: function(visualizer) {
//     this.visualizers[visualizer.id] = visualizer;
//     this.emit('change');
//   }
// });
