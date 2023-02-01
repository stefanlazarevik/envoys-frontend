export const state = () => ({
  dark: false,
  i18n: null,
  screen: false
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
}
