// @flow strict
import React from 'react';
import { act } from 'react-dom/test-utils';
// $FlowFixMe
import { cleanup, render } from '@testing-library/react';

import ImgLoader from './ImgLoader';

afterEach(cleanup);

const mockedError = new Error('mocked error');

describe('ImgLoader', () => {
  const imgUrl = 'https://static.street-beat.ru/upload/resize_cache/iblock/d69/450_450_1/d699afc7b3428f2f51c2f2de6665b506.jpg';
  /**
   * @link https://stackoverflow.com/questions/44462665/how-do-you-use-jest-to-test-img-onerror
   */
  beforeAll(() => {
    // Mocking Image.prototype.src to call the onload or onerror
    // $FlowIgnoreMe
    Object.defineProperties(global.Image.prototype, {
      onerror: {
        value: function onerror() {
        },
        writable: true,
      },
      onload: {
        value: function onload() {
        },
        writable: true,
      },
      src: {
      // Define the property setter
        set(src) {
          if (src === undefined) {
            // Call with setTimeout to simulate async loading
            setTimeout(() => this.onerror(mockedError));
          } else if (src === imgUrl) {
            setTimeout(() => this.onload());
          }
        },
      },
    });
  });

  it('calls onError when there\'s not "src" and', () => {
    jest.useFakeTimers();
    let testRenderer = {};

    const onError = jest.fn();

    act(() => {
      // $FlowIgnore - just for testing
      testRenderer = render(<ImgLoader onError={onError} />);
    });

    const { container } = testRenderer;
    const spinner = container.firstChild;

    expect(spinner).toBeInstanceOf(HTMLSpanElement);
    expect(spinner.className).toEqual('imgLoader__spinner');

    act(() => {
      jest.runAllTimers();
    });

    const img = container.firstChild;

    expect(onError).toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(mockedError);
    expect(img).toBeInstanceOf(HTMLImageElement);
    expect(img.className).toEqual('imgLoader');
    expect(img.src).toEqual('http://localhost/no-image.png');
  });

  it('should render <Spinner/> while loading and then <img />', () => {
    jest.useFakeTimers();
    let testRenderer = {};

    act(() => {
      testRenderer = render(<ImgLoader src={imgUrl} />);
    });

    const { container } = testRenderer;
    const spinner = container.firstChild;

    expect(spinner).toBeInstanceOf(HTMLSpanElement);
    expect(spinner.className).toEqual('imgLoader__spinner');

    act(() => {
      jest.runAllTimers();
    });

    const img = container.firstChild;

    expect(img.className).toEqual('imgLoader');
    expect(img).toBeInstanceOf(HTMLImageElement);
  });
});
