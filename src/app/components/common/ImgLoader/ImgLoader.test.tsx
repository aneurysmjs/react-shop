/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { cleanup, render, RenderResult, act } from '@testing-library/react';

import ImgLoader from './ImgLoader';

afterEach(cleanup);

const mockedError = new Error('mocked error');

describe('ImgLoader', () => {
  const imgUrl =
    'https://static.street-beat.ru/upload/resize_cache/iblock/d69/450_450_1/d699afc7b3428f2f51c2f2de6665b506.jpg';
  /**
   * @link https://stackoverflow.com/questions/44462665/how-do-you-use-jest-to-test-img-onerror
   */
  beforeAll(() => {
    // Mocking Image.prototype.src to call the onload or onerror
    Object.defineProperties(global.Image.prototype, {
      onerror: {
        value: function onerror(): void {},
        writable: true,
      },
      onload: {
        value: function onload(): void {},
        writable: true,
      },
      src: {
        // Define the property setter
        set(src): void {
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
    let testRenderer = {} as RenderResult;

    const onError = jest.fn();

    act(() => {
      testRenderer = render(<ImgLoader onError={onError} />);
    });

    const { container } = testRenderer;
    const spinner = container.firstChild as HTMLDivElement;

    expect(spinner).toBeInstanceOf(HTMLSpanElement);
    expect(spinner.className).toEqual('imgLoader__spinner');

    act(() => {
      jest.runAllTimers();
    });

    const img = container.firstChild as HTMLImageElement;

    expect(onError).toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(mockedError);
    expect(img).toBeInstanceOf(HTMLImageElement);
    expect(img.className).toEqual('imgLoader');
    expect(img.src).toEqual('http://localhost/no-image.png');
  });

  it('should render <Spinner/> while loading and then <img />', () => {
    jest.useFakeTimers();
    let testRenderer = {} as RenderResult;

    act(() => {
      testRenderer = render(<ImgLoader src={imgUrl} />);
    });

    const { container } = testRenderer;
    const spinner = container.firstChild as HTMLDivElement;

    expect(spinner).toBeInstanceOf(HTMLSpanElement);
    expect(spinner.className).toEqual('imgLoader__spinner');

    act(() => {
      jest.runAllTimers();
    });

    const img = container.firstChild as HTMLImageElement;

    expect(img.className).toEqual('imgLoader');
    expect(img).toBeInstanceOf(HTMLImageElement);
  });
});
