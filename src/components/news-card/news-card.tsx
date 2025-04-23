import style from './news-card.module.scss';
import { Typography, Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { IData_SnippetNews } from '../../lib/types/news-types.ts';
import NewsStats from "./news-stats/news-stats.tsx";

import NewsAuthoredInfo from "./news-authored-info/news-authored-info.tsx";
import NewsHighlights from "./news-highlights/news-highlights.tsx";
import { useState } from 'react';

const { Title, Link } = Typography;

type Props = {
    data: IData_SnippetNews;
    isOrigin: boolean;
    index: number;
    onClick?: () => void;
};

const NewsCard = ({ data, isOrigin, onClick }: Props) => {
    const {
        TI, DP, REACH, DOM, CNTR, LANG, AU, AB, KW, URL, SENT, FAV, HIGHLIGHTS, TRAFFIC, CNTR_CODE
    } = data;

    const [selectedKey, setSelectedKey] = useState<string>('relevance');

    const duplicateSortMenu = (
        <Menu
            selectedKeys={[selectedKey]}
            onClick={(e) => setSelectedKey(e.key)}
            items={[
                { key: 'relevance', label: 'By relevance' },
                { key: 'date', label: 'By date' },
                { key: 'reach', label: 'By reach' },
            ]}
        />
    );

    return (
        <div className={style.container} onClick={onClick}>
            <div className={`${!isOrigin ? style.nonOrigin : style.card }`}>

                <NewsStats DP={DP} REACH={REACH} TRAFFIC={TRAFFIC} SENT={SENT} isOrigin={isOrigin}/>

                <Title level={5} className={style.title}>{TI}</Title>

                <NewsAuthoredInfo AU={AU} DOM={DOM} CNTR={CNTR} FAV={FAV} LANG={LANG} CNTR_CODE={CNTR_CODE} URL={URL}/>

                {isOrigin && (
                    <div>
                        <NewsHighlights HIGHLIGHTS={HIGHLIGHTS} AB={AB} KW={KW}/>

                        <div className={style.footer}>
                            <Link href={URL} className={style.link}>
                                Original Source
                            </Link>

                            <Dropdown overlay={duplicateSortMenu} trigger={['click']} className={style.dropdown}>
                                <Button size="small" className={style.dropButton}>
                                    {selectedKey === 'relevance' ? 'By relevance' : selectedKey === 'date' ? 'By date' : 'By reach'}
                                    <DownOutlined />
                                </Button>
                            </Dropdown>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default NewsCard;