import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {register} from "../actions/userActions";

function RegisterScreen (props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const {loading, userInfo, error} = userRegister;

    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
        return () => {
            //
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password, rePassword));
    };

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Register</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="rePassword">
                        Re-Enter Password
                    </label>
                    <input type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)} />
                </li>
                <li>
                    <button type="submit" className="action-button">Register Account</button>
                </li>
                <li>
                    Already have an account?
                    <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="signup-button text-center" >Sign-in</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default RegisterScreen;