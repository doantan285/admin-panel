import React, { useState } from 'react';
import { Button, FormLayout, InlineError, Modal, TextField } from '@shopify/polaris';
import { PlusIcon, DeleteIcon } from '@shopify/polaris-icons';

const AddProductModal = ({
    active,
    handleChange,
}) => {
    const [rules, setRules] = useState([{
        titleCampaign: '',
        startDate: '',
        endDate: '',
        buyFrom: '',
        buyTo: '',
        discount: '',
        errors: {}
    }]);

    const handleRuleChange = (index, field, value) => {
        const newRules = [...rules];
        newRules[index][field] = value;
        newRules[index].errors[field] = '';
        setRules(newRules);
    };

    const handleAddRule = () => {
        setRules([...rules, {
            titleCampaign: '',
            startDate: '',
            endDate: '',
            buyFrom: '',
            buyTo: '',
            discount: '',
            errors: {}
        }]);
    };

    const handleDeleteRule = (index) => {
        const newRules = rules.filter((_, i) => i !== index);
        setRules(newRules);
    };

    const validateRules = () => {
        let isValid = true;
        const newRules = rules.map(rule => {
            const errors = [
                { field: 'titleCampaign', message: 'Title campaign is required' },
                { field: 'startDate', message: 'Start date is required' },
                { field: 'endDate', message: 'End date is required' },
                { field: 'buyFrom', message: 'Buy from is required' },
                { field: 'buyTo', message: 'Buy to is required' },
                { field: 'discount', message: 'Discount is required' },
            ].reduce((acc, { field, message }) => {
                if (!rule[field]) {
                    acc[field] = message;
                    isValid = false;
                }
                return acc;
            }, {});
            if (rule.buyFrom && rule.buyTo && parseFloat(rule.buyTo) <= parseFloat(rule.buyFrom)) {
                errors.buyTo = '"Buy to" must be greater than "Buy from"';
                isValid = false;
            }
            if (rule.startDate && rule.endDate && new Date(rule.endDate) <= new Date(rule.startDate)) {
                errors.endDate = '"End date" must be greater than "Start date"';
                isValid = false;
            }
            return { ...rule, errors };
        });
        setRules(newRules);
        return isValid;
    };

    const handleSave = () => {
        if (validateRules()) {
            console.log('Rules added: ', rules);
            handleChange();
        }
    };

    return (
        <Modal
            open={active}
            onClose={handleChange}
            title="Add rule"
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
                <FormLayout>
                    {rules.map((rule, index) => (
                        <div key={index} className='flex flex-row gap-2'>
                            <div className='flex flex-col gap-2'>
                                {rule.errors.endDate &&
                                    <InlineError message={rule.errors.endDate} fieldID={`endDate-${index}`} />
                                }
                                <FormLayout.Group condensed>
                                    <TextField
                                        type="text"
                                        label="Title campaign"
                                        value={rule.titleCampaign}
                                        onChange={(value) => handleRuleChange(index, 'titleCampaign', value)}
                                        autoComplete="off"
                                        error={rule.errors.titleCampaign}
                                    />
                                    <TextField
                                        type="number"
                                        label="Start date"
                                        value={rule.startDate}
                                        onChange={(value) => handleRuleChange(index, 'startDate', value)}
                                        autoComplete="off"
                                        error={rule.errors.startDate}
                                    />
                                    <TextField
                                        type="number"
                                        label="End date"
                                        value={rule.endDate}
                                        onChange={(value) => handleRuleChange(index, 'endDate', value)}
                                        autoComplete="off"
                                    // error={rule.errors.endDate}
                                    />

                                </FormLayout.Group>

                                {rule.errors.buyTo &&
                                    <InlineError message={rule.errors.buyTo} fieldID={`buyTo-${index}`} />
                                }
                                <FormLayout.Group condensed>
                                    <TextField
                                        type="number"
                                        label="Buy from"
                                        value={rule.buyFrom}
                                        onChange={(value) => handleRuleChange(index, 'buyFrom', value)}
                                        autoComplete="off"
                                        error={rule.errors.buyFrom}
                                    />
                                    <TextField
                                        type="number"
                                        label="Buy to"
                                        value={rule.buyTo}
                                        onChange={(value) => handleRuleChange(index, 'buyTo', value)}
                                        autoComplete="off"
                                    // error={rule.errors.buyTo}
                                    />

                                    <TextField
                                        type="number"
                                        label="Discount per item(%)"
                                        value={rule.discount}
                                        onChange={(value) => handleRuleChange(index, 'discount', value)}
                                        autoComplete="off"
                                    />
                                </FormLayout.Group>

                            </div>
                            <div className='self-end'>
                                <Button
                                    icon={DeleteIcon}
                                    accessibilityLabel="Delete rule"
                                    variant="monochromePlain"
                                    onClick={() => handleDeleteRule(index)}
                                />
                            </div>
                        </div>
                    ))}
                    <Button
                        icon={PlusIcon}
                        children={"Add"}
                        variant="primary"
                        onClick={handleAddRule}
                    />
                </FormLayout>
            </Modal.Section>
        </Modal>
    );
};

export default AddProductModal;