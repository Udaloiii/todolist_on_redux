import style from './loader.module.scss'
export const Loader = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.bar}>
                <div className={style.ball}></div>
            </div>
        </div>
    );
};