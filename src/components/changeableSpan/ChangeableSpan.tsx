import React, {ChangeEvent, useState} from "react";
import style from './changeableSpan.module.scss'


type ChangeableSpanProps = {
    text: string
    changeText: (newTitle: string) => void
    className?: string
    setShowButton?: (showDeleteButton: boolean) => void
    todoDisabled?: boolean
    taskDisabled?: boolean
}
export const ChangeableSpan = React.memo(({
                                              text,
                                              changeText,
                                              className,
                                              setShowButton,
                                              todoDisabled,
                                              taskDisabled
                                          }: ChangeableSpanProps) => {
    const [changeOn, setChangeOn] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(text)

    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const changeOnHandler = () => {
        if (!todoDisabled && !taskDisabled) {
            setChangeOn(true)
            if (setShowButton) setShowButton(false)
        }
    }

    const changeOffHandler = () => {
        if (title.trim() !== '') {
            changeText(title)
            setChangeOn(false)
            if (setShowButton) setShowButton(true)
        } else {
            changeText(text)
            setTitle(text)
            setChangeOn(false)
            if (setShowButton) setShowButton(true)
        }
    }

    // для отработки события onDoubleClick на мобильной версии
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        if (clicked) {
            changeOnHandler();
            setClicked(false);
        } else {
            setClicked(true);

            setTimeout(() => {
                setClicked(false);
            }, 300);
        }
    }

    const disableStyle = todoDisabled || taskDisabled ? style.disabled : ""
    return (
        changeOn ?
            <input className={`${style.input} ${className}`} type="text" value={title} autoFocus
                   onBlur={changeOffHandler}
                   onChange={onChangeText}/>
            : <span className={`${style.text} ${className} ${disableStyle}`} onDoubleClick={changeOnHandler}
                    onTouchEnd={handleClick}>
                {text}
        </span>
    )
})