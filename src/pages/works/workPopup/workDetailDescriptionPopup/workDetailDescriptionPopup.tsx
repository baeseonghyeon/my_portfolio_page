import styles from "./workDetailDescriptionPopup.module.scss";
import cb from "classnames/bind";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import { WorkData } from "interface/dto/work";
import Popup from "components/popup/popup";
const cn = cb.bind(styles);

export interface WorkDetailDescriptionPopupProps {
    workData: WorkData;
}

const WorkDetailDescriptionPopup = (props: WorkDetailDescriptionPopupProps) => {
    const { workData } = props;
    const language = useRecoilValue(languageState);

    if (workData) {
        return (
            <Popup
                title={workData.title[language]}
                idx={1}
                className={cn("container")}
            >
                <p>
                    {workData.description[language]}{" "}
                    {workData.description.link?.map((item, idx, { length }) => {
                        return (
                            <a href={item.url} target="_blank">
                                {idx === 0 && "("}
                                {item.common ? item.common : item[language]}
                                {idx !== length - 1 ? ", " : ")"}
                            </a>
                        );
                    })}
                </p>

                {workData.link?.map((item) => {
                    return (
                        <a
                            href={item.url}
                            target="_blank"
                            className={cn("link")}
                        >
                            Visit the {item.type} →
                        </a>
                    );
                })}
            </Popup>
        );
    } else {
        return null;
    }
};

export default WorkDetailDescriptionPopup;
