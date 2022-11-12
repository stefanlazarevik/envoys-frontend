export default ({ app }, inject) => {

  /**
   * @type {{get(*): boolean}}
   */
  app.$broker = {

    market: {
      type: [
        {name: 'M-IOC', value: "marketIOC", title: 'Market IOC', type: "IOC", color: 'lime lighten-4'},
        {name: 'M-FOK', value: "marketFOK", title: 'Market FOK', type: "FOK", color: 'teal lighten-4'},
        {name: 'L-IOC', value: "limitIOC", title: 'Limit IOC', type: "IOC", color: 'green lighten-4'},
        {name: 'L-FOK', value: "limitFOK", title: 'Limit FOK', type: "FOK", color: 'blue lighten-4'}
      ]
    },

    /**
     * @param value
     * @returns {{color: string, name: string, title: string, type: string, value: string} | {color: string, name: string, title: string, type: string, value: string} | {color: string, name: string, title: string, type: string, value: string} | {color: string, name: string, title: string, type: string, value: string}}
     */
    getType(value) {
      if (!value) {
        value = this.market.type[0].value;
      }

      return this.market.type.find((item) => item.value === value)
    }
  };
  inject('broker', app.$broker);
};
