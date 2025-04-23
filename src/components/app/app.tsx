import { selectNews } from '../../redux/selectors/news-selector.ts';
import { useAppSelector } from '../../redux/hooks/use-app-selector.ts';
import { useLoadNews } from '../../lib/hooks/use-load-news.ts';
import style from './app.module.scss';
import AllNews from '../all-news/all-news.tsx';

function App() {
    const loading = useLoadNews();

    const news = useAppSelector(selectNews);

    return (
        <div className={style.container}>
            {loading && <div className={style.loading}>Загрузка...</div>}

            {!loading && <AllNews news={news} />}
        </div>
    );
}

export default App;
