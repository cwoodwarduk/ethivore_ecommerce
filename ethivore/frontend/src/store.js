import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {
    productListReducer,
    productDetailsReducer,
    productSaveReducer,
    productDeleteReducer,
    productSaveReviewReducer,
} from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers";
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {
    userRegisterReducer,
    userSigninReducer,
    userUpdateReducer
} from "./reducers/userReducers";
import {
    myOrderListReducer,
    orderCreateReducer,
    orderDeleteReducer,
    orderDetailsReducer,
    orderListReducer,
    orderPayReducer
} from "./reducers/orderReducers";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = { cart: {cartItems, shipping: {}, payment: {}}, userSignin:{userInfo}};
const reducer =  combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productSaveReview: productSaveReviewReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer
});


const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;