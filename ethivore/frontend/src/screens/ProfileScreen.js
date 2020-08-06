import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {logout, update} from '../actions/userActions';
import {useDispatch, useSelector} from "react-redux";
import {listMyOrders} from "../actions/orderActions";

function ProfileScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userSignin = useSelector(state =>state.userSignin);
    const {userInfo} = userSignin;

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/signin");
    };

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(update({userId: userInfo._id, email, name, password}))
    };

    const myOrderList = useSelector(state => state.myOrderList);
    const {loading: loadingOrders, orders, errorOrders} = myOrderList;

    const userUpdate = useSelector(state => state.userUpdate);
    const {loading, success, error} = userUpdate;

    useEffect(() => {
        if(userInfo){
            setEmail(userInfo.email);
            setName(userInfo.name);
            setPassword(userInfo.password);
        }

        dispatch(listMyOrders());

        return () => {

        }
    }, []);

    return <div className="profile">
        <div className="profile-info">
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>User Profile</h2>
                        </li>
                        <li>
                            {loading && <div>Loading...</div>}
                            {error && <div>{error}</div>}
                            {success && <div>Profile saved successfully.</div>}
                        </li>
                        <li>
                            <label htmlFor="name">
                                Name
                            </label>
                            <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="email">
                                Email
                            </label>
                            <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input value={password} type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                        </li>
                        <li>
                            <button type="submit" className="action-button">Update Account</button>
                        </li>
                        <li>
                            <button type="button" className="signup-button text-center full-width" onClick={() => handleLogout()}>Logout</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>

        <div className="profile-orders content-margined">
            {
                loadingOrders ? <div>Loading...</div>:
                errorOrders ? <div>{errorOrders}</div>:
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total Price</th>
                            <th>Order Paid?</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order =>
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.replace("T", " ").slice(0,19)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid}</td>
                                <td>
                                    <Link to={"/order/" + order._id}>Details</Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
        </div>
    </div>

}

export default ProfileScreen;