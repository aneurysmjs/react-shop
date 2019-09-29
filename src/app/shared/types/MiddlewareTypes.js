// @flow strict
import type { State } from '@/shared/types/State';
import type { Actions } from '@/shared/types/Actions';

export type ApiMiddlewareType = Middleware<State, Actions>;
