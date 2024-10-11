import React, { useCallback, useState } from 'react';
import { DropZone, LegacyStack, Modal, Page, Text, TextField, Thumbnail } from '@shopify/polaris';
import { NoteIcon } from '@shopify/polaris-icons';
import ProductsTable from '../components/ProductsTable';
import AddProductModal from '../components/modals/AddProductModal';

const Products = () => {
  const [active, setActive] = useState(false);
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState('');

  const handleChange = useCallback(() => setActive(!active), [active]);

  return (
    <Page
      title="Dashboard"
      fullWidth
      secondaryActions={[{ content: 'Add Product', onAction: handleChange }]}
    >
      <ProductsTable />
      <AddProductModal
        active={active}
        handleChange={handleChange}
        productTitle={productTitle}
        setProductTitle={setProductTitle}
        productPrice={productPrice}
        setProductPrice={setProductPrice}
        productDesc={productDesc}
        setProductDesc={setProductDesc}
      />
    </Page>
  );
};

export default Products;
