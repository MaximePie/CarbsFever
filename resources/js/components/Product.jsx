import React from 'react';

export default function Product(props) {
    const [isEditMode, setIsEditMode] = React.useState(false);
    const { product, deleteProduct } = props;

    return (
        <div className="Product">
            <div>{product.name}</div>
            <div>{product.carbsPerPortion}</div>
            <span className="ProductsPage__product-actions">
                <i className="fas fa-trash" onClick={() => deleteProduct(product.id)}/>
                <i className="fas fa-edit" onClick={() => setIsEditMode(true)}/>
            </span>
        </div>
    );
}
