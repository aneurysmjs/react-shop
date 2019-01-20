/**
 * @module localStorage
 * persist the state of the application in the localStorage using browser localStorage API.
 */

/**
 * @desc Look into localStorage by key, retrieve a string, and try to parse it as JSON.
 *
 * @return {JSON}
 */
export const loadState = () => {
  /**
   * It's important that we wrap this code into try/catch because calls to localStorage.getItem can fail
   * if the user privacy mode does not allow the use of localStorage.
   */
  try {
    const serializedState = localStorage.getItem('state');
    // If serializedState is null it means that the key doesn't exist so I'll return undefined to let the reducers initialize the state instead.
    if (serializedState === null) {
      return undefined;
    }
    // If the serializedState string exists I'm going to use JSON.parse in order to turn it into the state object.
    return JSON.parse(serializedState);
  } catch (err) {
    // In case of any errors return undefined to let reducers initialize the application.
    return undefined;
  }

};

/**
 * Sets an item on localStorage
 * @param {Object} state
 * @return {void}
 */
export const saveState = (state) => {
  /**
   * Serializes it to string by using JSON.stringify. This will only work if the state is serializable,
   * but this is the general recommendation in Redux. The state SHOULD be serializable.
   */
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error('localStorage shit: ', err);
  }

};