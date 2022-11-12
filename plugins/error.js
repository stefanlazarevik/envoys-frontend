export default ({app, error}, inject) => {
  // this.$nuxt.error({ statusCode: 404, message: 'Pairs not found' });
  app.$error = {
    set(name) {
      return error(name)
    },
  };
  inject('error', app.$error);
};