/**
 * @link https://medium.com/@kilgarenone/use-jest-to-test-redux-async-action-creator-with-axios-in-a-create-react-app-app-d9c9b52eba5e
 */
const axiosMock = jest.genMockFromModule('axios');

// this is the key to fix the axios.create() undefined error!
axiosMock.create = jest.fn(() => axiosMock);

export default axiosMock;
