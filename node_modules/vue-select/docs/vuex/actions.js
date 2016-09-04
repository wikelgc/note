export const setSelected = ({ dispatch }, selected) => {
  dispatch('SET_SELECTED', selected)
}

export const toggleOptionType = ({ dispatch }) => {
  dispatch('TOGGLE_OPTION_TYPE')
}

export const setPlaceholder = ({ dispatch }, placeholder) => {
  dispatch('SET_PLACEHOLDER', placeholder)
}

export const toggleMultiple = ({ dispatch }) => {
  dispatch('TOGGLE_MULTIPLE')
}