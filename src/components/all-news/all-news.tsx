import { useState } from 'react';
import style from './all-news.module.scss';
import { IData_SnippetNews } from "../../lib/types/news-types.ts";
import NewsCard from "../news-card/news-card.tsx";
import { Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

type Props = {
	news: IData_SnippetNews[];
}

const AllNews = ({ news }: Props) => {
	const [newsList, setNewsList] = useState(news);
	const [showDuplicates, setShowDuplicates] = useState(false);

	const toggleDuplicates = () => {
		setShowDuplicates(prev => !prev);
	};

	const visibleNews = showDuplicates ? newsList : newsList.slice(0, 2);

	return (
		<div className={style.container}>
			{visibleNews.map((item: IData_SnippetNews, index: number) => (
				<NewsCard
					key={item.ID}
					data={item}
					isOrigin={item.ID === newsList[0].ID}
					index={index}
					onClick={() => {
						if (index !== 0) {
							const newList = [item, ...newsList.filter(n => n.ID !== item.ID)];
							setNewsList(newList);
							setShowDuplicates(false);
						}
					}}
				/>
			))}

			<div className={style.footer}>
				<Button
					type="default"
					size="small"
					className={style.button}
					onClick={toggleDuplicates}
					block
					icon={showDuplicates ? <UpOutlined /> : <DownOutlined />}
				>
					{showDuplicates ? 'Hide Duplicates' : 'View Duplicates'}
				</Button>
			</div>
		</div>
	);
};

export default AllNews;