import style from './news-authored-info.module.scss';
import {IData_SnippetNews} from "../../../lib/types/news-types.ts";
import { Typography} from "antd";
import {GlobalOutlined, ReadOutlined, UserOutlined} from "@ant-design/icons";
import emojiFlags from 'emoji-flags';
import type { CountryData } from 'emoji-flags';


type Props = Pick<IData_SnippetNews, 'FAV' | 'DOM' | 'CNTR' |'LANG' |'AU' | 'CNTR_CODE' | 'URL'>;

const { Text, Link } = Typography;

const NewsAuthoredInfo = ({FAV, DOM, CNTR, LANG, AU, CNTR_CODE, URL}: Props) => {
	const country = (emojiFlags as unknown as Record<string, CountryData>)[CNTR_CODE.toUpperCase()];

	return (
		<div className={style.container}>

			<Text className={style.text}>
				<GlobalOutlined className={style.icon}/>

				{/*TODO: необходимо заменить на реальную картинку, тут битая*/}
				{/*{FAV && (*/}
				{/*	<img src={FAV} alt="favicon" className={style.favicon} />*/}
				{/*)}*/}

				<Link href={URL} type="secondary" className={style.link} >
					{DOM}
				</Link>
			</Text>


			<Text className={style.text}>
				{country.emoji &&
					<div className={style.icon}>
						{country.emoji}
					</div>
					}
				{CNTR}
			</Text>

			<Text className={style.text}>
				<ReadOutlined className={style.icon}/>
				{LANG.toUpperCase()}
			</Text>

			{AU.length > 0 &&
				<Text className={style.text}>
					<UserOutlined className={style.icon} />
					{AU.join(', ')}
				</Text>
			}
		</div>
	);
};

export default NewsAuthoredInfo;
