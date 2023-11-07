import style from './login.module.scss'
import {useFormik} from "formik";
import {AppStateType, useAppCustomDispatch} from "@/state/state.ts";
import {logInTC} from "@/state/reducers/auth-reducer.ts";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

export type FormikValuesType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = () => {
    const dispatch = useAppCustomDispatch()
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikValuesType = {}
            if (!values.email) {
                errors.email = "Email required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address"
            }

            if (values.password.length < 4) {
                errors.password = "Password must be at least 4 characters"
            } else if (!values.password) {
                errors.password = "Password required"
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(logInTC(values))
            formik.resetForm()
        }
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }
    return (
        <div className={style.wrapper}>
            <div className={style.box}>
                <div className={style.text}>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> click here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: <span style={{color: "lightsalmon"}}>free@samuraijs.com</span></p>
                    <p>Password: <span style={{color: "lightsalmon"}}>free</span></p>
                </div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className={style.inputsBlock}>
                        <input placeholder="email" className={style.email}
                               {...formik.getFieldProps("email")}/>
                        {formik.touched.email && formik.errors.email &&
                            <span className={style.error}>{formik.errors.email}</span>}

                        <input type="password" placeholder="password" className={style.password}
                               {...formik.getFieldProps("password")}/>
                        {formik.touched.password && formik.errors.password &&
                            <span className={style.error}>{formik.errors.password}</span>}
                    </div>
                    <div className={style.rememberWrapper}>
                        <input type="checkbox" id="remember" name="rememberMe" checked={formik.values.rememberMe}
                               onChange={formik.handleChange}/>
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <div className={style.submitWrapper}>
                        <input className={style.submit} value="submit" type="submit"/>
                    </div>
                </form>
                <div className={style.forgotWrapper}>
                    <a className={style.forgot} href="">Forgot password?</a>
                </div>
            </div>
        </div>
    )
}