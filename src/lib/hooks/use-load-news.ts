import {useEffect, useState} from 'react';
import { useAppDispatch } from '../../redux/hooks/use-app-dispatch.ts';
import { setNews } from '../../redux/slices/news-slice.ts';
import { mockNews } from '../../mock/news.ts';

export const useLoadNews = () => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			dispatch(setNews(mockNews));
			setLoading(false);
		}, 1200);
	}, [dispatch]);


	return loading;
};