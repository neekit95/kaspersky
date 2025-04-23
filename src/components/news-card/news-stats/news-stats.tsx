import style from './news-stats.module.scss';
import { IData_SnippetNews } from '../../../lib/types/news-types.ts';
import { Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { InfoOutlined } from '@ant-design/icons';

const { Text } = Typography;
type Props = Pick<IData_SnippetNews, 'DP' | 'REACH' | 'TRAFFIC' | 'SENT'> & {
    isOrigin: boolean;
};

const NewsStats = ({ DP, REACH, TRAFFIC, SENT, isOrigin }: Props) => {
    const date = new Date(DP).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    const day = date.split(' ')[0];
    const rest = date.split(' ').slice(1).join(' ');

    const shortReach = Math.floor(REACH / 1000) + 'K';

    return (
        <div className={style.container}>
            <div className={style.left}>
                <Text type="secondary" className={style.title}>
                    <div className={style.element}>
                        <span className={style.white}>{day}</span>
                        {rest}
                    </div>

                    <div className={style.element}>
                        <span className={style.white}>{shortReach}</span> Reach
                    </div>

                    {isOrigin && (
                        <div className={style.element}>
                            Top Traffic:
                            {TRAFFIC.filter((item) => item.count >= 0.1).map(
                                (item) => (
                                    <div
                                        className={style.element}
                                        key={uuidv4()}
                                    >
                                        {item.value}
                                        <span className={style.white}>
                                            {item.count.toFixed(1)}%
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </Text>
            </div>

            <div className={style.right}>
                {isOrigin && (
                    <>
                        {SENT === 'positive' && (
                            <div className={style.positive}>Positive</div>
                        )}

                        {SENT === 'negative' && (
                            <div className={style.negative}>Negative</div>
                        )}
                    </>
                )}

                <button className={style.icons}>
                    <InfoOutlined />
                </button>

                <button className={style.icons} />
            </div>
        </div>
    );
};

export default NewsStats;
