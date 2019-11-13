const controller = require('./../controllers/Tasks');
module.exports = (app) => {
  app.get('/tasks', controller.index);
  app.post('/tasks', controller.addTask);
  app.get('/tasks/:id', controller.find);
  app.put('/tasks/:id', controller.update);
  app.delete('/tasks/:id', controller.delete);
}