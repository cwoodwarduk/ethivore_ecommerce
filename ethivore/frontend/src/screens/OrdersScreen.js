import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch, dispatch} from "react-redux";
import { signin } from '../actions/userActions';
import {listOrders, deleteOrder} from "../actions/orderActions";

function OrdersScreen (props) {

    const orderList = useSelector(state => state.orderList);
    const {loading, orders, error} = orderList;

    const orderDelete = useSelector(state => state.orderDelete);
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = orderDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrders());
        return () => {
            //
        }
    }, [successDelete]);

    const deleteHandler = (order) => {
        // e.preventDefault();
        dispatch(deleteOrder(order._id));
    };

    return loading ? <div>Loading...</div> :
    <div className="content content-margined" >
        <div className="order-header">
            <h3>Orders</h3>
        </div>

        <div className="order-list">
            <table className="orders-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total Price</th>
                    <th>User</th>
                    <th>Paid?</th>
                    <th>Paid At</th>
                    <th>Delivered?</th>
                    <th>Delivered At</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {orders.map(order => (<tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.replace("T", " ").slice(0,19)}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.user.name}</td>
                    <td>{order.isPaid ? 'Yes' : 'No'}</td>
                    <td>{order.paidAt ? order.paidAt.replace("T", " ").slice(0,19) : ''}</td>
                    <td>{order.isDelivered ? 'Yes' : 'No'}</td>
                    <td>{order.deliveredAt}</td>
                    <td>
                        <Link to={"/order/" + order._id} className="details-button">Details</Link>
                        {' '}
                        <button type="button" onClick={() => deleteHandler(order)} className="delete-button">Delete</button>
                    </td>
                </tr>))}

                </tbody>
            </table>
        </div>
    </div>



}

export default OrdersScreen;