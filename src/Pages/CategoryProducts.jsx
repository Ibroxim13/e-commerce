import React, { useEffect, useRef, useState } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import { useLocation, Link } from 'react-router-dom'
import { Carousel, Rate } from 'antd';
import { FaRegEye } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios'

export default function CategoryProducts() {
    const location = useLocation()
    const swiperNavPrevRef = useRef(null);
    const swiperNavNextRef = useRef(null);
    const [categoryProducts, setCategoryProducts] = useState([])

    useEffect(() => {
        axios(`https://dummyjson.com/products/category/${location.pathname.slice(13)}`)
            .then(res => setCategoryProducts
                (res.data.products))
    }, [])

    return (
        <>
            <BreadCrumb page={location.pathname.slice(13)} />
            <div className="container">
                <section className='new-products-wrapper'>
                    <h2 className="wrapper-title"><span style={{ textTransform: "capitalize" }}>{location.pathname.slice(13)}</span> Products</h2>
                    <main>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={36}
                            className='new-products-content'
                            modules={[Autoplay, Navigation]}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            navigation={{
                                prevEl: swiperNavPrevRef.current,
                                nextEl: swiperNavNextRef.current,
                                prevEl: 'swiperNavPrev',
                                nextEl: 'swiperNavNext',
                            }}
                            onInit={(swiper) => {
                                swiper.params.navigation.prevEl = swiperNavPrevRef.current;
                                swiper.params.navigation.nextEl = swiperNavNextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }}
                        >
                            {
                                categoryProducts.map(product =>
                                    <SwiperSlide key={product.id}>
                                        <div className="new-product-card">
                                            <span className="new-product-card-discount-percentage">-{Math.round(product.discountPercentage)}%</span>
                                            <div className="new-product-card-img">
                                                <img src={product.images[0]} alt={product.title} />
                                            </div>
                                            <div className="new-product-card-content">
                                                <h5>{product.category} {product.brand}</h5>
                                                <h4>{product.title}</h4>
                                                <div className='new-product-card-price'>{product.price}$ <span>{(product.price * (100 + Math.round(product.discountPercentage)) / 100).toFixed()}$</span></div>
                                                <Rate disabled defaultValue={Math.round(product.rating)} className='new-product-card-rate' />
                                                <div className="new-product-card-actions">
                                                    <span><IoIosHeartEmpty /></span>
                                                    <span><Link to={`/product/:${product.id}`}><FaRegEye /></Link></span>
                                                </div>
                                            </div>
                                            <div className="new-product-card-add-cart">
                                                <button className='new-product-card-btn-add'><IoCart /><span>add to cart</span></button>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            }


                            <div className={'swiperNavPrev'} ref={swiperNavPrevRef}><FaArrowLeft /></div>
                            <div className={'swiperNavNext'} ref={swiperNavNextRef}><FaArrowRight /></div>
                        </Swiper>
                    </main>
                </section>
            </div>
        </>
    )
}