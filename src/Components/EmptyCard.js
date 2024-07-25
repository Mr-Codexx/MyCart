import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCard = () => {
    return (
        <div className="container text-center my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <img 
                        src='https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png' 
                        alt='Empty Cart'
                        className=" mb-4"
                        style={{ width: '100%', maxWidth: '600px', height: 'auto' }} // Ensures responsiveness and large size
                    />
                    <h2 className="mb-4">
                        Your cart is <span style={{ fontWeight: 'bold', color: 'red' }}>empty.</span>
                    </h2>
                    <Link to="/" className="d-block">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg"
                        >
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EmptyCard;
