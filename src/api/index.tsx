// src/api/index.ts
import { USE_MOCK_API } from './config';
import { mockApi } from './mockApi';
import { realApi } from './realApi';

export * from './types';

export const api = USE_MOCK_API ? mockApi : realApi;
