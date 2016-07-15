
// TODO: move to npm package

exports.mixAndBind =
function mixAndBind(source, target, bind) {
  Object.getOwnPropertyNames(source)
    .filter(prop => prop !== 'constructor')
    .forEach(prop => {
      target[prop] = source[prop].bind(bind);
    });
}


class Context {
  constructor(fields, actors, models) {
    fields.forEach((field, idx) => {

      this[field] = {};
      mixAndBind(actors[idx].prototype, this[field], models[idx]);
    });
  }
}

exports.context =
function context(fields, ...actors) {
  return Class => {
    Class.create = function(...models) {
      const ctx = new Context(fields, actors, models);

      // Mix object methods/props
      mixAndBind(Class.prototype, ctx.__proto__, ctx);

      return ctx;
    };
  };
}
