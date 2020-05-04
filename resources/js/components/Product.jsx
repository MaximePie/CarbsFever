import React from 'react';
import Loading from "./Loading";

export default function Product(props) {
    const [isEditMode, setIsEditMode] = React.useState(false);
    const {deleteProduct} = props;
    const [isLoading, setIsLoading] = React.useState(false);

    const [product, setProduct] = React.useState(props.product);

    const [productName, setProductName] = React.useState(product.name);
    const [carbsPerPortion, setCarbsPerPortion] = React.useState(product.carbsPerPortion);
    const [carbsPerHundred, setCarbsPerHundred] = React.useState(product.carbsPerHundred);
    const [gramsPerPortion, setGramsPerPortion] = React.useState(product.gramsPerPortion);

    return (
        <div className="Product">
            <Loading isHidden={!isLoading}/>
            {!isEditMode && (
                <>
                    <div>{product.name}</div>
                    <div>{product.carbsPerPortion}</div>
                    <span className="Product-actions">
                        <i className="fas fa-trash" onClick={() => deleteProduct(product.id)}/>
                        <i className="fas fa-edit" onClick={() => setIsEditMode(true)}/>
                    </span>
                </>
            )}
            {isEditMode && (
                <form className="Product__form">
                    <label className="Product__label">
                        Nom
                        <input
                            className="Product__input-field"
                            value={productName}
                            placeholder="Aliment"
                            type="text"
                            onChange={(event) => setProductName(event.target.value)}
                        />
                    </label>
                    <label className="Product__label">
                        Calories par portion
                        <input
                            className="Product__input-field--number"
                            placeholder="Calories par portion"
                            value={carbsPerPortion}
                            type="text"
                            onChange={(event) => setCarbsPerPortion(event.target.value)}
                        />
                    </label>
                    <span className="Product__form-text">Où</span>
                    <label className="Product__label">
                        Calories pour 100g
                        <input
                            className="Product__input-field"
                            placeholder="Calories pour 100g"
                            value={carbsPerHundred}
                            type="text"
                            onChange={
                                (event) => setCarbsPerHundred(event.target.value)
                            }
                        />
                    </label>
                    <label className="Product__label">
                        Grammes par portion
                        <input
                            className="Product__input-field"
                            placeholder="Grammes par portion"
                            value={gramsPerPortion}
                            type="text"
                            onChange={
                                (event) => setGramsPerPortion(event.target.value)
                            }
                        />
                    </label>
                    <span className="Product-actions">
                        <i className="fas fa-check" onClick={saveProduct}/>
                    </span>
                </form>
            )}
        </div>
    );

    function saveProduct() {
        setIsLoading(true);
        axios.post('/api/product/' + product.id, {
            product: productName,
            carbsPerPortion: carbsPerPortion || undefined,
            carbsPerHundred: carbsPerHundred || undefined,
            gramsPerPortion: gramsPerPortion || undefined,
        }).then(response => {
            setIsEditMode(false);
            setIsLoading(false);
            setProduct(response.data);
        }).catch(err => {
            console.log(err)
        })
    }
}
