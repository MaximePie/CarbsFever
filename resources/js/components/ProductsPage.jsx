import React from 'react';

export default function ProductsPage() {
    const [productsList, setProductsList] = React.useState([]);

    React.useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="ProductsPage">
            <h1>Liste des ingrédients</h1>
            {productsList.map((product) => {
                return (
                    <>
                        <div>{product.name}</div>
                        <div>{product.carbsPerHundred}</div>
                    </>
                )
            })}
        </div>
    );


    /**
     * Fetch the data of the ticket
     */
    function fetchData() {
        axios.get('/api/products')
            .then(response => {
                setProductsList(response.data)
            }).catch(err => {
            console.log(err)
        })
    }
}
