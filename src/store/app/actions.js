const axios = require('axios');

export function getResource({ commit }, url) {
  return axios.get(url).then(({ data }) => {
    commit('setCurrentResource', data)
  });
}
