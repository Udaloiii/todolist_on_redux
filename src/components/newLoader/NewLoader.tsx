import style from './new-loader.module.scss'

export const NewLoader = () => {
    return (
        <div>
            <div className={style.dots}>
                <div className={style.dot}></div>
                <div className={style.dot}></div>
                <div className={style.dot}></div>
                <div className={style.dot}></div>
                <div className={style.dot}></div>
                <div className={style.dot}></div>
                <div className={style.dot}></div>
                <div className={style.dot}></div>
                <div className={style.dot}></div>
                <div className={style.dot}></div>
            </div>
            <div className={style.dots2}>
                <div className={style.dot2}></div>
                <div className={style.dot2}></div>
                <div className={style.dot2}></div>
                <div className={style.dot2}></div>
                <div className={style.dot2}></div>
                <div className={style.dot2}></div>
                <div className={style.dot2}></div>
                <div className={style.dot2}></div>
                <div className={style.dot2}></div>
                <div className={style.dot2}></div>
            </div>
            <div className={style.circle}></div>
        </div>
    );
};