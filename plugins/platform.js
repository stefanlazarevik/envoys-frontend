export default ({app}, inject) => {

  /**
   * @type {{getName(*): *, getType(*): {symbol: string, color: string, name: string, id: number, type: string}[], get(*): {symbol: string, color: string, name: string, id: number, type: string}, list: [{symbol: string, color: string, name: string, id: number, type: string},{symbol: string, color: string, name: string, id: number, type: string},{symbol: string, color: string, name: string, id: number, type: string},{symbol: string, color: string, name: string, id: number, type: string},{symbol: string, color: string, name: string, id: number, type: string}], getSymbol(*): *}}
   */
  app.$platform = {
    list: [
      {id: 0, type: 'CRYPTO', name: 'BITCOIN', symbol: 'BTC', color: 'lime lighten-4'},
      {id: 1, type: 'CRYPTO', name: 'ETHEREUM', symbol: 'ETH', color: 'teal lighten-4'},
      {id: 2, type: 'CRYPTO', name: 'TRON', symbol: 'TRX', color: 'green lighten-4'},
      {id: 3, type: 'FIAT', name: 'VISA', symbol: 'MULTI CURRENCY', color: 'blue lighten-4'},
      {id: 4, type: 'FIAT', name: 'MASTERCARD', symbol: 'MULTI CURRENCY', color: 'purple lighten-4'}
    ],

    /**
     * @param name
     * @returns {{symbol: string, color: string, name: string, id: number, type: string} | {symbol: string, color: string, name: string, id: number, type: string} | {symbol: string, color: string, name: string, id: number, type: string} | {symbol: string, color: string, name: string, id: number, type: string} | {symbol: string, color: string, name: string, id: number, type: string}}
     */
    get(name) {
      if (!name) {
        name = this.list[0].name;
      }

      return this.list.find((item) => item.name === name)
    },

    /**
     * @param name
     * @returns {*}
     */
    getSymbol(name) {
      if (!name) {
        name = this.list[0].name;
      }

      return this.list.find((item) => item.name === name).symbol
    },

    /**
     * @param id
     * @returns {*}
     */
    getName(id) {
      return this.list.find((item) => item.id === id).name
    },

    /**
     * @param type
     * @returns {({symbol: string, color: string, name: string, id: number, type: string}|{symbol: string, color: string, name: string, id: number, type: string}|{symbol: string, color: string, name: string, id: number, type: string}|{symbol: string, color: string, name: string, id: number, type: string}|{symbol: string, color: string, name: string, id: number, type: string})[]}
     */
    getType(type) {
      return this.list.filter((item) => item.type === type)
    }
  };
  inject('platform', app.$platform);
};