import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IData_SnippetNews } from '../../lib/types/news-types.ts';

interface NewsState {
	list: IData_SnippetNews[];
}

const initialState: NewsState = {
	list: [],
};

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		setNews(state, action: PayloadAction<IData_SnippetNews[]>) {
			state.list = action.payload;
		},
	},
});

export const { setNews } = newsSlice.actions;
export default newsSlice.reducer;