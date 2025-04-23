import style from './news-card.module.scss';
import { Typography } from 'antd';
import { IData_SnippetNews } from '../../lib/types/news-types.ts';
import NewsStats from "./news-stats/news-stats.tsx";

import NewsAuthoredInfo from "./news-authored-info/news-authored-info.tsx";
import NewsHighlights from "./news-highlights/news-highlights.tsx";
import {mockNews} from "../../mock/news.ts";

const { Title, Text, Link } = Typography;

type Props = {
    data: IData_SnippetNews;
    isOrigin: boolean;
    index: number;
};

const NewsCard = ({ data, isOrigin }: Props) => {
    const {
        TI, DP, REACH, DOM, CNTR, LANG, AU, AB, KW, URL, SENT, FAV, HIGHLIGHTS, TRAFFIC, CNTR_CODE
    } = data;


    return (
        <div className={style.container}>
            <div className={`${!isOrigin ? style.nonOrigin : style.card }`}>

                <NewsStats DP={DP} REACH={REACH} TRAFFIC={TRAFFIC} SENT={SENT} isOrigin={isOrigin}/>

                <Title level={5}  className={style.title}>{TI}</Title>

                <NewsAuthoredInfo AU={AU} DOM={DOM} CNTR={CNTR} FAV={FAV} LANG={LANG} CNTR_CODE={CNTR_CODE} URL={URL}/>



                {isOrigin && (
                    <div>
                        <NewsHighlights HIGHLIGHTS={HIGHLIGHTS} AB={AB} KW={KW}/>

                        <div className={style.footer}>
                            <Link href={URL}  className={style.link}>
                                Original Source
                            </Link>

                            <div className={style.duplicates}>
                                <Text type="secondary" className={style.text}>
                                    Duplicates: {mockNews.length - 1}
                                </Text>
                            </div>
                        </div>
                    </div>

                )}

            </div>
        </div>
    );
};

export default NewsCard;