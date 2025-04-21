import style from './news-card.module.scss';
import { Card, Typography, Tag, Space, Button, Tooltip } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { IData_SnippetNews } from '../../lib/types/news-types.ts';

const { Title, Text, Paragraph, Link } = Typography;

type Props = {
    data: IData_SnippetNews;
};

const NewsCard = ({ data }: Props) => {
    const {
        TI, DP, REACH, DOM, CNTR, LANG, AU, AB, KW, URL, SENT, FAV, HIGHLIGHTS
    } = data;

    const date = new Date(DP).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    const renderHighlights = () => {
        return HIGHLIGHTS.map((item, index) => (
            <Paragraph key={index} className={style.highlight} ellipsis={{ rows: 3 }}>
        <span
            dangerouslySetInnerHTML={{
                __html: item.replace(/<kw>(.*?)<\/kw>/g, '<mark>$1</mark>'),
            }}
        />
            </Paragraph>
        ));
    };

    return (
        <Card className={style.card}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                {/* Дата и охват */}
                <Text type="secondary" className={style.title}>{date} · {REACH.toLocaleString()} Reach</Text>

                {/* Заголовок */}
                <Title level={4} className={style.title}>{TI}</Title>

                {/* Источник, язык, страна, авторы */}
                <Space wrap>
                    <img src={FAV} alt="favicon" className={style.favicon} />
                    <Text type="secondary"><GlobalOutlined /> {DOM}</Text>
                    <Tag>{CNTR}</Tag>
                    <Tag>{LANG.toUpperCase()}</Tag>
                    {AU.length > 0 && <Text>{AU.join(', ')}</Text>}
                </Space>

                {/* Подсвеченные фрагменты */}
                {HIGHLIGHTS.length ? renderHighlights() : (
                    <Paragraph ellipsis={{ rows: 3 }}>{AB}</Paragraph>
                )}

                {/* Ключевые слова */}
                <Space wrap>
                    {KW.map((tag) => (
                        <Tag key={tag.value}>{tag.value}</Tag>
                    ))}
                </Space>

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