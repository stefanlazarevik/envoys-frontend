export default ({ app }, inject) => {

  /**
   * @type {{method: [{color: string, name: string, id: number, type: string},{color: string, name: string, id: number, type: string}], getType(*): *|T|undefined, kind: [{color: string, name: string, id: number, type: string},{color: string, name: string, id: number, type: string},{color: string, name: string, id: number, type: string},{color: string, name: string, id: number, type: string}], exchange: [{color: string, name: string, id: number, type: string},{color: string, name: string, id: number, type: string},{color: string, name: string, id: number, type: string}], getExchange(*): *|T|undefined, getMethod(*): *|T|undefined, getKind(*): *|T|undefined, type: [{color: string, name: string, id: number, type: string},{color: string, name: string, id: number, type: string}]}}
   */
  app.$stock = {
    exchange: [
      {id: 0, type: 'E_DIGITAL', name: 'Digital', color: 'lime lighten-4'},
      {id: 1, type: 'E_FREEDOM_FINANCE', name: 'Freedom finance', color: 'teal lighten-4'},
      {id: 2, type: 'E_EXANTE', name: 'Exante', color: 'blue lighten-4'},
    ],
    method: [
      {id: 0, type: 'M_COUNTER_BIDDING', name: 'Counter bidding', color: 'lime lighten-4'},
      {id: 1, type: 'M_FRANKFURT', name: 'Frankfurt', color: 'teal lighten-4'},
    ],
    kind: [
      {id: 0, type: 'K_SECURITIES', name: 'Securities', color: 'lime lighten-4'},
      {id: 1, type: 'K_FUNDS', name: 'Funds', color: 'teal lighten-4'},
      {id: 2, type: 'K_BONDS', name: 'Bonds', color: 'blue lighten-4'},
      {id: 3, type: 'K_BLOCKS', name: 'Blocks', color: 'purple lighten-4'},
    ],
    type: [
      {id: 0, type: 'T_ORDINARY_SHARES', name: 'Ordinary shares', color: 'lime lighten-4'},
      {id: 1, type: 'T_PREFERENCE_SHARES', name: 'Preference shares', color: 'teal lighten-4'},
    ],

    /**
     * @param type
     * @returns {{color: string, name: string, id: number, type: string} | {color: string, name: string, id: number, type: string} | {color: string, name: string, id: number, type: string}}
     */
    getExchange(type) {
      if (!type) {
        type = this.exchange[0].type;
      }

      return this.exchange.find((item) => item.type === type)
    },

    /**
     * @param type
     * @returns {{color: string, name: string, id: number, type: string} | {color: string, name: string, id: number, type: string}}
     */
    getMethod(type) {
      if (!type) {
        type = this.method[0].type;
      }

      return this.method.find((item) => item.type === type)
    },

    /**
     * @param type
     * @returns {{color: string, name: string, id: number, type: string} | {color: string, name: string, id: number, type: string} | {color: string, name: string, id: number, type: string} | {color: string, name: string, id: number, type: string}}
     */
    getKind(type) {
      if (!type) {
        type = this.kind[0].type;
      }

      return this.kind.find((item) => item.type === type)
    },

    /**
     * @param type
     * @returns {{color: string, name: string, id: number, type: string} | {color: string, name: string, id: number, type: string}}
     */
    getType(type) {
      if (!type) {
        type = this.type[0].type;
      }

      return this.type.find((item) => item.type === type)
    }
  };
  inject('stock', app.$stock);
};