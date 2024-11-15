import React, {useEffect, useState} from 'react';
import CardProduct from '../CardProduct';
import { Grid2 } from '@mui/material';
import axios from 'axios';

const ListProduct = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);


  return (
    <>
    <Grid2 container sx={{display:'flex', justifyContent:'space-between', marginTop:4}}>
    {products.map((item) => (
   <CardProduct key={item.id} product={item}/>

    )) }
      </Grid2>
    </>
  )
}

export default ListProduct
