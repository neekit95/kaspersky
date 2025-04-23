import { combineReducers } from '@reduxjs/toolkit';
import newsSlice from './slices/news-slice.ts';

export const rootReducer = combineReducers({
    news: newsSlice,
});
