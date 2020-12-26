import variables from '../../styles/element-variables.scss'
import defaultSettings from '../../settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo,routesRole } = defaultSettings
const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  showPanel:false,
  routesRole:routesRole
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGE_Panel: (state,show) => {
    state.showPanel = !state.showPanel
  }

}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

