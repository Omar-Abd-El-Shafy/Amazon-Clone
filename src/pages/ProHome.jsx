import React from 'react';
import '../index.css';
import Loading from '../Components/Loading/Loading';
import Error from '../Components/Error/Error';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Rating from '../Components/Rating/Rating';
import { addToCart } from '../Redux/cartSlice';
import { useDispatch } from 'react-redux';
import { useGetAllProdactsQuery } from '../Redux/prodactsApi';
function ProHome() {
  const {
    data: products,
    error,
    isLoading: loading,
  } = useGetAllProdactsQuery();

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <>
      
      
      <Helmet>
        <title>Amazon</title>
      </Helmet>
      <h1>Feather Products</h1>
      <div className="products">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error variant="danger">{error}</Error>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.id} sm={6} md={4} lg={3} className="mb-3 ">
                <Card className="shadow border-0" style={{ height: '100%' }}>
                  <Link to={`/product/${product.id}`}>
                    <img
                      className="card-img-top"
                      src={product.image}
                      alt={product.title}
                    />
                  </Link>
                  <Card.Body
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'center',
                      borderRadius: '18px',
                    }}
                  >
                    <Link to={`/product/${product.id}`}>
                      <Card.Title>{product.title}</Card.Title>
                    </Link>
                    <Rating
                      rating={product.rating.rate}
                      Reviews={product.rating.count}
                    />
                    <Card.Text
                      style={{
                        fontSize: '28px',
                        fontWeight: '400',
                      }}
                    >
                      ${product.price}
                    </Card.Text>
                    {product.rating.count > 0 ? (
                      <Button
                        variant="warning"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
}

export default ProHome;
