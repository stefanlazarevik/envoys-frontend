export default ({app, error}, inject) => {
  app.$error = {
    set(name) {
      return error(name)
    },
  };
  inject('error', app.$error);
};