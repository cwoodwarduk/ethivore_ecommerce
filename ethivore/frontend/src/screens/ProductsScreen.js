import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { signin } from '../actions/userActions';
import {listProducts, saveProduct, deleteProduct} from "../actions/productActions";
import Axios from "axios";

function ProductsScreen (props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [count_in_stock, setCountInStock] = useState('');
    const [uploading, setUploading] = useState(false);

    const productList = useSelector(state => state.productList);
    const {loading, products, error} = productList;

    const productDelete = useSelector(state => state.productDelete);
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = productDelete;

    const productSave = useSelector(state => state.productSave);
    const {loading: loadingSave, success: successSave, error: errorSave} = productSave;

    const dispatch = useDispatch();

    useEffect(() => {
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {
            //
        }
    }, [successSave, successDelete]);

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setCategory(product.category);
        setName(product.name);
        setImage(product.image);
        setAuthor(product.author);
        setPrice(product.price);
        setCountInStock(product.count_in_stock);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({_id: id, category, name, image, author, price, count_in_stock}));
    };

    const deleteHandler = (product) => {
        // e.preventDefault();
        dispatch(deleteProduct(product._id));
    };

    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);
        Axios.post('/api/uploads', bodyFormData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setImage(response.data);
            setUploading(false);
        }).catch(error => {
            console.log(error);
            setUploading(false);
        })
    };

    return <div className="content content-margined" >
        <div className="product-header">
            <h3>Products</h3>
            <button className="action-button" onClick={() => openModal({})}>Create Product</button>
        </div>

        {modalVisible &&
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Create New Product</h2>
                    </li>
                    <li>
                        {loadingSave && <div>Loading...</div>}
                        {errorSave && <div>{errorSave}</div>}
                    </li>
                    <li>
                        <label htmlFor="category">
                            Category
                        </label>
                        <input type="text" name="category" value={category} id="category" onChange={(e) => setCategory(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="image">
                            Image
                        </label>
                        <input type="file" onChange={uploadFileHandler}/>
                        {uploading && <div>Uploading...</div>}
                    </li>
                    <li>
                        <label htmlFor="author">
                            Author/Description
                        </label>
                        <input type="text" name="author" value={author} id="author" onChange={(e) => setAuthor(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="price">
                            Price
                        </label>
                        <input type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="count_in_stock">
                            Number in Stock
                        </label>
                        <input type="text" name="count_in_stock" value={count_in_stock} id="count_in_stock" onChange={(e) => setCountInStock(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="action-button">{id ? "Update" : "Create"}</button>
                    </li>
                    <li>
                        <button type="submit" onClick={() => setModalVisible(false)} className="action-button">Close</button>
                    </li>
                </ul>
            </form>
        </div>
        }


        <div className="product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Author/Description</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                {products.map(product => (<tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.category}</td>
                    <td>{product.name}</td>
                    <td>{product.author}</td>
                    <td>{product.price}</td>
                    <td>
                        <button className="secondary-button" onClick={() => openModal(product)}>Edit</button>
                        {''}
                        <button className="secondary-button" onClick={() => deleteHandler(product)}>Delete</button>
                    </td>
                </tr>))}

                </tbody>
            </table>
        </div>
        </div>



}

export default ProductsScreen;