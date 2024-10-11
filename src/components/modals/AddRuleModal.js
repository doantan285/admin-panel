import React from 'react';
import { Modal } from '@shopify/polaris';

const AddProductModal = ({
    active,
    handleChange,
    
}) => {

    return (
        <Modal
            open={active}
            onClose={handleChange}
            title="Add product"
            primaryAction={{
                content: 'Save',
                onAction: () => {},
            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: handleChange,
                },
            ]}
        >
            <Modal.Section>
                
            </Modal.Section>
        </Modal>
    );
};

export default AddProductModal;