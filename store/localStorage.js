export const state = () => ({
  dark: false,
  i18n: null,
  screen: false,
  url: null,
  drawer: false,
})

export const mutations = {
  setTheme(state, payload) {
    state.dark = payload;
  },
  setScreen(state, payload) {
    state.screen = payload;
  },
  setLanguage(state, payload) {
    state.i18n = payload;
  },
  setUrl(state, payload) {
    state.url = payload;
  },
  setDrawer(state, payload) {
    console.log('set drawer', payload)
    state.drawer = payload;
  },
}
