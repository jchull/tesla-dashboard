import React from 'react';
import {ProductListItem} from './ProductListItem';
import {QueryService} from '../../service/QueryService';
import {IVehicle} from '../../type/Vehicle';
import {VehicleView} from '../view/VehicleView';
import './ProductList.css';

interface ProductListState {
    products?: Array<IVehicle>;
    selectedProductId?: string;
}

export const ProductList: React.SFC<ProductListState> = (props: ProductListState) => {
    const [products, setProducts] = React.useState(props.products);
    const queryService = new QueryService();

    const [selectedProduct, setSelectedProduct] = React.useState({} as IVehicle);

    const productSelectionHandler = (product: IVehicle) => setSelectedProduct(Object.assign({}, product));

    React.useEffect( () => {
        const fetchProductList = async () => {
            const productList = await queryService.getProducts();
            setProducts(productList);
            if(productList && productList.length){
                setSelectedProduct(productList[0]);

            }
        };

        fetchProductList();
    }, []);

    React.useEffect(() => {
        if (selectedProduct) {
            // @ts-ignore
            console.log(`selected product: ${selectedProduct && selectedProduct.name || 'none'}`);
        }
    }, [selectedProduct]);

    return (
        <div className="products">
                {products && products.map(product => <ProductListItem product={product}
                    key={product.id_s}
                    handleSelection={productSelectionHandler}
                    selected={selectedProduct && selectedProduct.id_s === product.id_s}/>)}
            {products && <VehicleView vehicle={selectedProduct}/> ||
            <span>No Products</span>
            }

        </div>

    );
};

