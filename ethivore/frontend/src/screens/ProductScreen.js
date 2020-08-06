import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {detailsForProduct, saveProductReview} from "../actions/productActions";
import Rating from "../components/Rating";
import {PRODUCT_REVIEW_SAVE_RESET} from "../constants/productConstants";

function ProductScreen (props) {

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [quantity, setQuantity] = useState(1);

    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails;

    const productSaveReview = useSelector(state => state.productSaveReview);
    const {success: productSaveReviewSuccess} = productSaveReview;

    const dispatch = useDispatch();

    useEffect(() => {
        if(productSaveReviewSuccess){
            alert("Review submitted successfully");
            setRating(0);
            setComment('');
            dispatch({type: PRODUCT_REVIEW_SAVE_RESET})
        }
        dispatch(detailsForProduct(props.match.params.id));
        return () => {
            //
        }
    }, [productSaveReviewSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProductReview(props.match.params.id, {
            name: userInfo.name,
            rating: rating,
            comment: comment
        }));
    };

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + quantity);
    };

    return <div>
        <div className="back-to-result">
            <Link to="/">&#8592; Back to products</Link>
        </div>
        {
            loading? <div>Loading...</div>:
            error? <div>{error}</div>:
            (
                <>
                <div className="details">
                    <div className="details-image">
                        <img src={product.image} alt="product" />
                    </div>

                    <div className="details-info">
                        <ul>
                            <li>
                                <h3>{product.name}</h3>
                            </li>
                            <li>
                                {product.author}
                            </li>
                            <li>
                                Price: <b>£{product.price}</b>
                            </li>
                            <li>
                                <a href="#reviews">
                                    <Rating value={product.rating} text={product.no_of_reviews + ' reviews'}/>
                                    {/*<Rating value={3.5} text={20 + ' reviews'}/>*/}
                                </a>

                            </li>
                        </ul>
                    </div>
                    <div className="details-action">
                        <ul>
                            <li>
                                Price: £{product.price}
                            </li>
                            <li>
                                Status: {product.count_in_stock > 0 ? "In Stock" : "Out of Stock"}
                            </li>
                            {product.count_in_stock > 0 &&
                                <li>
                                    Quantity:
                                    <select value={quantity} onChange={(e) => {setQuantity(e.target.value)}}>
                                        {[...Array(product.count_in_stock).keys()].map(x =>
                                            <option value={x + 1}>{x + 1}</option>
                                        )}
                                    </select>
                                </li>
                            }
                            <li>
                                {product.count_in_stock > 0 &&
                                    <button onClick={handleAddToCart} className="action-button">Add to Cart</button>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
                    <div className="content-margined">
                        <h2>Reviews</h2>
                        {!product.reviews.length && <div>There have been no reviews for this product yet.</div>}
                        <ul className="review" id="reviews">
                            {product.reviews.map(review =>
                                <li key={review._id}>
                                    <div>
                                        {review.name}
                                    </div>
                                    <div>
                                        <Rating value={review.rating}/>
                                    </div>
                                    <div>
                                        {review.createdAt.substring(0,10)}
                                    </div>
                                    <div>
                                        {review.comment}
                                    </div>
                                </li>
                            )}
                            <li>
                                <h3>Write a customer review</h3>
                                {userInfo ?
                                    <form onSubmit={submitHandler}>
                                        <ul className="form-container">
                                            <li>
                                                <label htmlFor="rating">Rating</label>
                                                <select name="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                                                    <option value={1}>1 = Poor</option>
                                                    <option value={2}>2 = Below Expectation</option>
                                                    <option value={3}>3 = Good</option>
                                                    <option value={4}>4 = Very Good</option>
                                                    <option value={5}>5 = Excellent</option>
                                                </select>
                                            </li>
                                            <li>
                                                <label htmlFor="comment">Comment</label>
                                                <textarea name="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                            </li>
                                            <li>
                                                <button type="submit" className="action-button">Submit</button>
                                            </li>
                                        </ul>
                                    </form>
                                    :
                                    <div>You must be <Link to="/signin">logged in</Link> to leave a review.</div>
                                }
                            </li>
                        </ul>
                    </div>
                </>
            )
        }

    </div>
}

export default ProductScreen;