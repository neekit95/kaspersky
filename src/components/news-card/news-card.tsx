import style from './news-card.module.scss';
import { Card, Typography, Tag, Space, Button } from 'antd';
import { IData_SnippetNews } from '../../lib/types/news-types.ts';
import NewsStats from "./news-stats/news-stats.tsx";
import { v4 as uuidv4 } from 'uuid';
import NewsAuthoredInfo from "./news-authored-info/news-authored-info.tsx";
import NewsHighlights from "./news-highlights/news-highlights.tsx";

const { Title, Text, Paragraph, Link } = Typography;

type Props = {
    data: IData_SnippetNews;
};

const NewsCard = ({ data }: Props) => {
    const {
        TI, DP, REACH, DOM, CNTR, LANG, AU, AB, KW, URL, SENT, FAV, HIGHLIGHTS, TRAFFIC, CNTR_CODE, ID
    } = data;


    return (
        <Card className={style.card}>
            <Space direction="vertical" size="small" >

                <NewsStats DP={DP} REACH={REACH} TRAFFIC={TRAFFIC} SENT={SENT} />

                <Title level={5}  className={style.title}>{TI}</Title>

                <NewsAuthoredInfo AU={AU} DOM={DOM} CNTR={CNTR} FAV={FAV} LANG={LANG} CNTR_CODE={CNTR_CODE} URL={URL}/>

                <NewsHighlights HIGHLIGHTS={HIGHLIGHTS} AB={AB} KW={KW}/>

                {/* Ключевые слова */}


                {/* Нижняя панель: ссылка и дубликаты */}
                <div className={style.footer}>
                    <Link href={URL} target="_blank">Original Source</Link>
                    <div className={style.duplicates}>
                        <Text type="secondary">Duplicates: 192</Text>
                        <Button type="default" size="small">View Duplicates</Button>
                    </div>
                </div>
            </Space>
        </Card>
    );
};

export default NewsCard;