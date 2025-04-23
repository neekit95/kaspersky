import style from './news-highlights.module.scss';
import {IData_SnippetNews} from "../../../lib/types/news-types.ts";
import {Space, Tag, Typography} from "antd";
import {v4 as uuidv4} from "uuid";
import { useState } from "react";
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

type Props = Pick<IData_SnippetNews, 'HIGHLIGHTS' | 'AB' |'KW'>;

const NewsHighlights = ({HIGHLIGHTS, AB, KW}:Props) => {
	const [showAll, setShowAll] = useState(false);
	const visibleHighlights = showAll ? HIGHLIGHTS : HIGHLIGHTS.slice(0, 1);

	const parseHighlights = (text: string): (string | JSX.Element)[] => {
		const parts = text.split(/(<kw>.*?<\/kw>)/g);
		return parts.map((part, idx) => {
			if (part.startsWith('<kw>') && part.endsWith('</kw>')) {
				const clean = part.replace('<kw>', '').replace('</kw>', '');
				return <span key={idx} className={style.highlighted}>{clean}</span>;
			}
			return part;
		});
	};

	const renderHighlights = () => {
		return visibleHighlights.map((item, index) => (
			<Paragraph key={index} className={style.paragraph} ellipsis={{ rows: 3 }}>
				{parseHighlights(item)}
			</Paragraph>
		));
	};

	return (
		<div className={style.container}>
			{HIGHLIGHTS.length ? (
				<>
					{renderHighlights()}
					{HIGHLIGHTS.length > 1 && (
						<Text className={style.showMore} onClick={() => setShowAll(!showAll)}>
							{showAll ? 'Show less' : 'Show more'}
							{showAll ? <CaretUpFilled className={style.arrow} /> : <CaretDownFilled className={style.arrow} />}
						</Text>
					)}
				</>
			) : (
				<Paragraph className={style.paragraph} ellipsis={{ rows: 3 }}>{AB}</Paragraph>
			)}

			<Space wrap>
				{KW.map((tag) => (
					<Tag className={style.keywords} key={uuidv4()}>
						{tag.value}
						<span> {tag.count} </span>
					</Tag>
				))}
			</Space>
		</div>
	);
};

export default NewsHighlights;
