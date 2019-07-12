// @flow strict
import React from 'react';
import { act } from 'react-dom/test-utils';
// $FlowFixMe
import { cleanup, render } from '@testing-library/react';

import ImgLoader from './ImgLoader';

afterEach(cleanup);

describe('ImgLoader', () => {
  const imgUrl = 'https://static.street-beat.ru/upload/resize_cache/iblock/d69/450_450_1/d699afc7b3428f2f51c2f2de6665b506.jpg';
  /**
   * @link https://stackoverflow.com/questions/44462665/how-do-you-use-jest-to-test-img-onerror
   */
  beforeAll(() => {
    // Mocking Image.prototype.src to call the onload or onerror
    // $FlowIgnoreMe
    Object.defineProperty(global.Image.prototype, 'src', {
      // Define the property setter
      set(src) {
        if (src === undefined) {
          // Call with setTimeout to simulate async loading
          setTimeout(() => this.onerror(new Error('mocked error')));
        } else if (src === imgUrl) {
          setTimeout(() => this.onload());
        }
      },
    });
  });

  it('calls onError when there\'s not "src"', (done) => {
    const onError = (evt) => {
      expect(evt).toBeInstanceOf(Error);
      done();
    };
    // $FlowIgnore - just for testing
    render(<ImgLoader onError={onError} />);
  });

  const containerParent = document.createElement('div');

  it('should render <Spinner/> while loading', () => {
    const { container } = render(<ImgLoader src={imgUrl} />, {
      container: document.body && document.body.appendChild(containerParent),
    });

    const spinner = container.firstChild;

    expect(spinner.className).toEqual('imgLoader__spinner');
  });
});
