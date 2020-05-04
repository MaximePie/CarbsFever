import React from 'react';
import Loading from "./Loading"
import Product from "./Product"

export default function ProductsPage() {
    const [productsList, setProductsList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="ProductsPage">
            <Loading isHidden={!isLoading}/>
            <h1>Liste des ingrédients</h1>
            <div className="Product Product--header">
                <div>Nom</div>
                <div>Cal.</div>
                <div>Actions</div>
            </div>
            {productsList.map((product) => <Product product={product} onDelete={deleteProduct}/>)}
        </div>
    );


    /**
     * Fetch the data of the ticket
     */
    function fetchData() {
        setIsLoading(true);
        axios.get('/api/products')
            .then(response => {
                setProductsList(response.data)
                setIsLoading(false);
            }).catch(err => {
            console.log(err)
        })
    }


    /**
     * Delete the product
     */
    function deleteProduct(productId) {
        setIsLoading(true);
        axios.get('/api/products/delete/' + productId)
            .then(response => {
                fetchData();
            }).catch(err => {
            console.log(err)
        })
    }
}
