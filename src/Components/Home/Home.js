import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { useCart } from './CartContext'; // Import CartContext
import Header from '../Header';
import './Home.css';
import Cart from '../Cart';

const Home = ({ cartItems, setCartItems }) => {
    const [products, setProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(3); // Display initial 3 products
    const [categories, setCategories] = useState([]); // State to store categories
    const [searchQuery, setSearchQuery] = useState(''); // State to manage search query

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

    useEffect(() => {
        // Fetch products from the API
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data); // Set products array
                // Extract unique categories from products
                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories); // Set categories array
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleBuyNow = (product) => {
        // console.log('Product data:', product); 
        addToCart(product);
        // console.log(product.title);

        Swal.fire({
            title: `${product.title} added to cart`,
            icon: 'success',
            toast: true,
            position: 'bottom-start',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        });
    };


    const handleSeeAll = () => {
        setVisibleCount(prevCount => prevCount + 6); // Increment by 6 (2 rows)
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    return (
        <div>
            {/* Header */}
            <header>
                <div className="container mt-3 mb-5">
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner rounded-3">
                            <div className="carousel-item active">
                                <div className="row panda-bg-info p-5 d-flex align-items-center">
                                    <div className="col-lg-7 ps-5">
                                        <h1 className="fw-bold mb-3">Mega LCD TV For Sports</h1>
                                        <p className="mb-4">
                                            This is the best TV in the world for people who just want to waste time in front of TV.
                                            We've recommended screens of at least 65 inches (though other sizes are available), and that feature refresh rates of 60Hz and 120Hz so that they can accommodate the motion of fast-paced games.
                                        </p>
                                        <h1 className="price fw-semibold">{formatCurrency(21999)}</h1>
                                        <button type="button" className="btn-buy-now-banner" onClick={() => handleBuyNow({ id: 1, title: 'Mega LCD TV For Sports', price: 1200, image: '/images/banner-images/tv.png' })}>
                                            Buy Now <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                    <div className="col-lg-4">
                                        <img src="images/banner-images/tv.png" className="d-block w-100 mt-4 mt-md-0" alt="TV" />
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row panda-bg-info p-5 d-flex align-items-center">
                                    <div className="col-lg-7 ps-5">
                                        <h1 className="fw-bold mb-3">Cool Dude Headphone</h1>
                                        <p className="mb-4">
                                            This is the best headphone in the world for people who just want to waste time in front of funky world. Find Cool Dude Headphones stock images in HD and millions of other royalty-free stock photos, illustrations and vectors in the Shutterstock collection.
                                        </p>
                                        <h1 className="price fw-semibold">{formatCurrency(699)}</h1>
                                        <button type="button" className="btn-buy-now-banner" onClick={() => handleBuyNow({ id: 2, title: 'Cool Dude Headphone', price: 699, image: '/images/banner-images/headphone.png' })}>
                                            Buy Now <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                    <div className="col-lg-4">
                                        <img src="images/banner-images/headphone.png" className="d-block w-100 mt-4 mt-lg-0" alt="Headphone" />
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row panda-bg-info p-5 d-flex align-items-center">
                                    <div className="col-lg-7 ps-5">
                                        <h1 className="fw-bold mb-3">X-Box for your living room</h1>
                                        <p className="mb-4">
                                            This is the best X-Box in the world for people who just want to waste time in front of fake sports. For a lot of people, the living room is the ideal place to keep your video game system. Everyone can access it, there is probably at least one big couch to sit on while you play, and this is often the room where the biggest T.V. is located.
                                        </p>
                                        <h1 className="price fw-semibold">{formatCurrency(999)}</h1>
                                        <button type="button" className="btn-buy-now-banner" onClick={() => handleBuyNow({ id: 3, title: 'X-Box for your living room', price: 999, image: '/images/banner-images/xbox.png' })}>
                                            Buy Now <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                    <div className="col-lg-4">
                                        <img src="images/banner-images/xbox.png" className="d-block w-100" alt="X-Box" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-control-prev" type="" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </div>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>
                <div className="container my-5">
                    <h2 className="fw-semibold mb-3">Categories</h2>
                    <div className="row g-4">
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <Link to="/watches">
                                <div className="p-3 border bg-primary text-light d-flex align-items-center justify-content-around rounded-3">
                                    <h2 className="fw-semibold">Watch</h2>
                                    <img className="w-25" src="images/categories/watch.png" alt="Watch" />
                                </div>

                            </Link>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <Link to="/bags">
                                <div className="p-3 border bg-success text-light d-flex align-items-center justify-content-around rounded-3">
                                    <h2 className="fw-semibold">Bag</h2>
                                    <img className="w-25" src="images/categories/bag.png" alt="Bag" />
                                </div>
                            </Link>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <Link to="Shoes">
                            <div className="p-3 border bg-warning text-light d-flex align-items-center justify-content-around rounded-3">
                                <h2 className="fw-semibold">Shoes</h2>
                                <img className="w-25" src="images/categories/shoes.png" alt="Shoes" />
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {categories.map(category => (
                    <section key={category} id={category} className="container">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="fw-semibold mb-3">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                            <button onClick={handleSeeAll} className="fw-semibold text-warning btn">See All</button>
                        </div>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {products.filter(product => product.category === category).slice(0, visibleCount).map(product => (
                                <div className="col" key={product.id}>
                                    <div className="card border-0 rounded-3 h-100 products">
                                        <img src={product.image} className="card-img-top" alt={product.title} />
                                        <div className="card-body text-center">
                                            <h5 className="card-title fw-semibold">{product.title}</h5>
                                            <p className="card-text mt-4">{product.description.slice(0, 50)}...</p>
                                            <h5 className="price fw-semibold">{formatCurrency(product.price)}</h5>
                                        </div>
                                        <div className="mb-4 mx-auto">
                                            <button type="button" className="btn-buy-now" onClick={() => handleBuyNow(product)}>
                                                Buy Now <i className="fa-solid fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

                <section id="subscribe" style={{ height: '450px' }} className="container my-5 panda-bg-info rounded-3 d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        <h3 className="fw-bold">LET'S STAY IN TOUCH</h3>
                        <h6 className="text-secondary">Get updates on sales, specials and more</h6>
                        <div className="input-group mt-4 mb-3">
                            <input type="text" className="form-control fs-5 ps-4 pe-5 py-2" placeholder="Enter your email" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <button className="btn-buy-now mt-0 px-5 text-capitalize" type="button" id="button-addon2">Send</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
