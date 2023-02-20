export default ({app}, inject) => {

  /**
   * @type {{get(*): {color: string, name: string, id: number}, list: [{color: string, name: string, id: number, tag: string},{color: string, name: string, id: number, tag: string},{color: string, name: string, id: number, tag: string},{color: string, name: string, id: number, tag: string},{color: string, name: string, id: number, tag: string},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]}}
   */
  app.$protocol = {
    list: [

      // Ethereum.
      {id: 1, name: 'ERC20', tag: 'C_ETHEREUM', color: 'deep-purple lighten-4'},
      {id: 2, name: 'ERC721', tag: 'C_ETHEREUM', color: 'pink lighten-4'},
      {id: 3, name: 'ERC1155', tag: 'C_ETHEREUM', color: 'purple lighten-4'},
      {id: 4, name: 'ERC998', tag: 'C_ETHEREUM', color: 'red lighten-4'},
      {id: 5, name: 'ERC223', tag: 'C_ETHEREUM', color: 'cyan lighten-4'},

      // Binance smart chain.
      {id: 6, name: 'BEP20', tag: 'C_BINANCE', color: 'blue lighten-4'},
      {id: 7, name: 'BEP721', tag: 'C_BINANCE', color: 'teal lighten-4'},
      {id: 8, name: 'BEP1155', tag: 'C_BINANCE', color: 'green lighten-4'},

      // Tron.
      {id: 9, name: 'TRC20', tag: 'C_TRON', color: 'lime lighten-4'},
      {id: 10, name: 'TRC721', tag: 'C_TRON', color: 'amber lighten-4'},

      // Binance smart chain.
      {id: 11, name: 'BEP998', tag: 'C_BINANCE', color: 'light-blue lighten-5'},
      {id: 12, name: 'BEP223', tag: 'C_BINANCE', color: 'blue lighten-5'},

      // Polygon.
      {id: 13, name: 'PRC20', tag: 'C_POLYGON', color: 'lime lighten-5'},
      {id: 14, name: 'PRC721', tag: 'C_POLYGON', color: 'amber lighten-5'},
      {id: 15, name: 'PRC1155', tag: 'C_POLYGON', color: 'cyan lighten-5'},
      {id: 16, name: 'PRC998', tag: 'C_POLYGON', color: 'red lighten-5'},
      {id: 17, name: 'PRC223', tag: 'C_POLYGON', color: 'green lighten-5'},

      // Cronos.
      {id: 18, name: 'CRC20', tag: 'C_CRONOS', color: 'purple lighten-5'},
      {id: 19, name: 'CRC721', tag: 'C_CRONOS', color: 'teal lighten-5'},
      {id: 20, name: 'CRC1155', tag: 'C_CRONOS', color: 'green lighten-5'},
      {id: 21, name: 'CRC998', tag: 'C_CRONOS', color: 'light-green lighten-5'},
      {id: 22, name: 'CRC223', tag: 'C_CRONOS', color: 'yellow lighten-5'},

      // Fantom.
      {id: 23, name: 'FRC20', tag: 'C_FANTOM', color: 'amber lighten-5'},
      {id: 24, name: 'FRC721', tag: 'C_FANTOM', color: 'deep-orange lighten-3'},
      {id: 25, name: 'FRC1155', tag: 'C_FANTOM', color: 'light-blue lighten-3'},
      {id: 26, name: 'FRC998', tag: 'C_FANTOM', color: 'red lighten-3'},
      {id: 27, name: 'FRC223', tag: 'C_FANTOM', color: 'teal lighten-3'},

      // Avalanche.
      {id: 28, name: 'ARC20', tag: 'C_AVALANCHE', color: 'blue lighten-3'},
      {id: 29, name: 'ARC721', tag: 'C_AVALANCHE', color: 'cyan lighten-3'},
      {id: 30, name: 'ARC1155', tag: 'C_AVALANCHE', color: 'purple lighten-3'},
      {id: 31, name: 'ARC998', tag: 'C_AVALANCHE', color: 'pink lighten-3'},
      {id: 32, name: 'ARC223', tag: 'C_AVALANCHE', color: 'deep-purple lighten-3'},
    ],

    /**
     * @param name
     * @returns {{color: string, name: string, id: number, tag: string} | {color: string, name: string, id: number, tag: string} | {color: string, name: string, id: number, tag: string} | {color: string, name: string, id: number, tag: string} | {color: string, name: string, id: number, tag: string}}
     */
    get(name) {
      if (!name) {
        name = this.list[0].name;
      }

      return this.list.find((item) => item.name === name)
    },

    /**
     * @param id
     * @returns {string|*}
     */
    getNameById(id) {
      if (!id) {
        return "UNKNOWN"
      }

      return this.list.find((item) => item.id === id).name
    },

    /**
     * @param tag
     * @returns {({color: string, name: string, id: number, tag: string}|{color: string, name: string, id: number, tag: string}|{color: string, name: string, id: number, tag: string}|{color: string, name: string, id: number, tag: string}|{color: string, name: string, id: number, tag: string})[]}
     */
    getTag(tag) {
      return this.list.filter((item) => item.tag === tag)
    }
  };
  inject('protocol', app.$protocol);
};