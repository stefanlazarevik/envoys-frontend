export default ({app}, inject) => {

  /**
   * @type {{get(*): *, list: [{name: string, id: number},{name: string, id: number},{name: string, id: number},{name: string, id: number},{name: string, id: number},null,null]}}
   */
  app.$tag = {
    list: [
      {id: 0, name: 'C_NONE'},
      {id: 1, name: 'C_BITCOIN'},
      {id: 2, name: 'C_ETHEREUM'},
      {id: 3, name: 'C_BINANCE'},
      {id: 4, name: 'C_TRON'},
      {id: 5, name: 'C_POLYGON'},
      {id: 6, name: 'C_CRONOS'},
      {id: 7, name: 'C_FANTOM'},
      {id: 8, name: 'C_AVALANCHE'},
    ],

    get(name) {
      if (!name) {
        name = this.list[0].name;
      }

      return this.list.find((item) => item.name === name)
    },
  };
  inject('tag', app.$tag);
};