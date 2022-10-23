export const state = () => ({
  dark: false,
  i18n: null
})

export const mutations = {
  setTheme(state, payload) {
    state.dark = payload;
  },
  setLanguage(state, payload) {
    state.i18n = payload;
  },
}
