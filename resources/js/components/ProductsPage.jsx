import React from 'react';

export default function ProductsPage() {
    const [productsList, setProductsList] = React.useState([]);

    React.useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="ProductsPage">
            <h1>Liste des ingrédients</h1>
            <div className="ProductsPage__product ProductsPage__product--header">
                <div>Nom</div>
                <div>Cal.</div>
                <div>Actions</div>
            </div>
            {productsList.map((product) => {
                return (
                    <div className="ProductsPage__product">
                        <div>{product.name}</div>
                        <div>{product.carbsPerHundred}</div>
                    </div>
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
