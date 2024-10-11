import React from 'react';
import { Page } from '@shopify/polaris';
import ProductsTable from '../components/ProductsTable';

const Products = () => {
  return (
    <Page
      title="Dashboard"
      fullWidth
      // secondaryActions={<Button>Add Product</Button>}
      secondaryActions={[{ content: 'Add Product' }]}
    >
      <ProductsTable />
    </Page>
  );
};

export default Products;
