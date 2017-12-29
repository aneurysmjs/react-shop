export default function searchTerm(state, action) {
  return Object.assign({}, state, {
    searchTerm: action.searchTerm
  });
}