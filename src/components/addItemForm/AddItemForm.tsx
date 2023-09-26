import style from './AddItemForm.module.scss'

type AddItemFormProps = {
    className?: string
    addItem?: () => void
}
export const AddItemForm = ({className, addItem}: AddItemFormProps) => {
    const addItemHandler = () => {
        if (addItem) addItem()
    }
    return (
        <div className={`${style.wrapper} ${className}`}>
            <input type="text" placeholder={'enter text'}/>
            <button onClick={addItemHandler}>+</button>
        </div>
    );
};