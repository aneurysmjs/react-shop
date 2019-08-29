// @flow strict
import * as types from '@/store/ActionTypes';

import { makeActionCreator } from '@/store/helpers/makeActionCreator';

export default makeActionCreator(types.FOOTER_DATA, 'footer');
