import style from './AddItemForm.module.scss'
import {ChangeEvent, useState} from "react";

type AddItemFormProps = {
    className?: string
    addItem: (text: string) => void
}
export const AddItemForm = ({className, addItem}: AddItemFormProps) => {
    const [text, setText] = useState<string>("")

    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value)
    const addItemHandler = () => {
        if(text.trim() !== "") {
            addItem(text.trim())
            setText('')
        }
    }
    return (
        <div className={`${style.wrapper} ${className}`}>
            <input type="text" placeholder={'enter text'} value={text} onChange={onChangeTextHandler}/>
            <button onClick={addItemHandler}>+</button>
        </div>
    );
};