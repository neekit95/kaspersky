import style from './all-news.module.scss';
import {IData_SnippetNews} from "../../lib/types/news-types.ts";
import NewsCard from "../news-card/news-card.tsx";

type Props = {
	news: IData_SnippetNews[];
}

const AllNews = ({news} : Props) => {
	return (
		<div className={style.container}>
			{news.map((item: IData_SnippetNews) => (
				<NewsCard key={item.ID} data={item} isOrigin={item.ID === news[0].ID} />
			))}
		</div>
	);
};

export default AllNews;
