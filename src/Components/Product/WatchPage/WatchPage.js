// WatchPage.js
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const WatchPage = ({ cartItems, setCartItems }) => {
    const [watches, setWatches] = useState([]);

    useEffect(() => {
        // Fetch watches from the API
        fetch('https://fakestoreapi.com/products/category/jewelery') // Assuming watches fall under 'jewelery'
            .then(response => response.json())
            .then(data => setWatches(data))
            .catch(error => console.error('Error fetching watches:', error));
    }, []);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const handleBuyNow = (product) => {
        addToCart(product);

        Swal.fire({
            title: `${product.title} added to cart`,
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    return (
        <div className="container my-5">
            <h2 className="fw-semibold mb-3">Watches</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {watches.map(watch => (
                    <div className="col" key={watch.id}>
                        <div className="card border-0 rounded-3 h-100 products">
                            <img src={watch.image} className="card-img-top" alt={watch.title} />
                            <div className="card-body text-center">
                                <h5 className="card-title fw-semibold">{watch.title}</h5>
                                <p className="card-text mt-4">{watch.description.slice(0, 50)}...</p>
                                <h5 className="price fw-semibold">{formatCurrency(watch.price)}</h5>
                            </div>
                            <div className="mb-4 mx-auto">
                                <button type="button" className="btn-buy-now" onClick={() => handleBuyNow(watch)}>
                                    Buy Now <i className="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WatchPage;
