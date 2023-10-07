import style from './AddItemForm.module.scss'
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormProps = {
    className?: string
    addItem: (text: string) => void
    todoDisabled?: boolean
}
export const AddItemForm = React.memo(({className, addItem, todoDisabled}: AddItemFormProps) => {
        const [text, setText] = useState<string>("")

        const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value)
        const addItemHandler = () => {
            if (text.trim() !== "") {
                addItem(text.trim())
                setText('')
            }
        }
        const onEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                addItemHandler()
                event.currentTarget.blur()
            }
        }

        return (
            <div className={`${style.wrapper} ${className}`}>
                <input type="text" placeholder={'enter text'} value={text} onChange={onChangeTextHandler}
                       onKeyDown={onEnterPress} disabled={todoDisabled}/>
                <button onClick={addItemHandler} disabled={todoDisabled}>+</button>
            </div>
        );
    }
)