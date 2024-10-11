import React, { useCallback, useState } from 'react';
import { DropZone, LegacyStack, Modal, Text, TextField, Thumbnail } from '@shopify/polaris';
import { NoteIcon } from '@shopify/polaris-icons';

const AddProductModal = ({
    active,
    handleChange,
    productTitle,
    setProductTitle,
    productPrice,
    setProductPrice,
    productDesc,
    setProductDesc
}) => {
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({});

    const handleDropZoneDrop = useCallback(
        (_dropFiles = [], acceptedFiles = [], _rejectedFiles = []) =>
            setFiles((files) => [...files, ...acceptedFiles]),
        [],
    );

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    const fileUpload = !files.length && (
        <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />
    );

    const uploadedFiles = files.length > 0 && (
        <LegacyStack vertical>
            {files.map((file, index) => (
                <LegacyStack alignment="center" key={index}>
                    <Thumbnail
                        size="small"
                        alt={file.name}
                        source={
                            validImageTypes.includes(file.type)
                                ? window.URL.createObjectURL(file)
                                : NoteIcon
                        }
                    />
                    <div>
                        {file.name}{' '}
                        <Text variant="bodySm" as="p">
                            {file.size} bytes
                        </Text>
                    </div>
                </LegacyStack>
            ))}
        </LegacyStack>
    );

    const validateFields = () => {
        const newErrors = {};
        if (!productTitle) newErrors.productTitle = 'Title is required';
        if (!productPrice) newErrors.productPrice = 'Price is required';
        if (!productDesc) newErrors.productDesc = 'Description is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateFields()) {
            console.log('Product added:', {
                productTitle,
                productPrice,
                productDesc,
                files: files.map(file => ({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                })),
            });
            handleChange();
        }
    };

    return (
        <Modal
            open={active}
            onClose={handleChange}
            title="Add product"
            primaryAction={{
                content: 'Save',
                onAction: handleSave,
            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: handleChange,
                },
            ]}
        >
            <Modal.Section>
                <TextField
                    label="Title"
                    value={productTitle}
                    onChange={setProductTitle}
                    autoComplete="off"
                    error={errors.productTitle}
                />
                <TextField
                    label="Price"
                    value={productPrice}
                    onChange={setProductPrice}
                    autoComplete="off"
                    error={errors.productPrice}
                />
                <DropZone onDrop={handleDropZoneDrop} variableHeight label="Image">
                    {uploadedFiles}
                    {fileUpload}
                </DropZone>
                <TextField
                    label="Description"
                    value={productDesc}
                    onChange={setProductDesc}
                    multiline={4}
                    autoComplete="off"
                    error={errors.productDesc}
                />
            </Modal.Section>
        </Modal>
    );
};

export default AddProductModal;