import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Swal from 'sweetalert2';

const ShoesPage = ({ cartItems, setCartItems }) => {
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        // Fetch shoes from the API
        fetch('https://fakestoreapi.com/products/category/shoes') // Assuming shoes category exists
            .then(response => response.json())
            .then(data => setShoes(data))
            .catch(error => console.error('Error fetching shoes:', error));
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
            <h2 className="fw-semibold mb-3">Shoes</h2>
            {shoes.length === 0 ? (
                <div className="text-center">
                    <p>No products available. Please check back later or return to the <Link to="/">home page</Link>.</p>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {shoes.map(shoe => (
                        <div className="col" key={shoe.id}>
                            <div className="card border-0 rounded-3 h-100 products">
                                <img src={shoe.image} className="card-img-top" alt={shoe.title} />
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-semibold">{shoe.title}</h5>
                                    <p className="card-text mt-4">{shoe.description.slice(0, 50)}...</p>
                                    <h5 className="price fw-semibold">{formatCurrency(shoe.price)}</h5>
                                </div>
                                <div className="mb-4 mx-auto">
                                    <button type="button" className="btn-buy-now" onClick={() => handleBuyNow(shoe)}>
                                        Buy Now <i className="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShoesPage;
