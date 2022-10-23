export default ({app}, inject) => {

  /**
   * @type {{getScale(*): *, list: [{scales: number[], decimal: number},{scales: number[], decimal: number},{scales: number[], decimal: number},{scales: number[], decimal: number}]}}
   */
  app.$scale = {
    list: [
      {decimal: 2, scales: [0, 0.001, 0.01, 0.1, 1, 10, 50, 100]},
      {decimal: 4, scales: [0, 10, 50, 100, 500, 1000]},
      {decimal: 6, scales: [0, 100, 5000, 10000, 500000]},
      {decimal: 8, scales: [0, 1000, 50000, 100000, 5000000, 10000000]},
    ],

    /**
     * @param decimal
     * @returns {*}
     */
    getScale(decimal) {
      return this.list.find((item) => item.decimal === decimal).scales
    }
  };
  inject('scale', app.$scale);
};