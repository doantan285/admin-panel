import React, { useCallback, useEffect, useState } from "react";
import {
    IndexTable,
    LegacyCard,
    IndexFilters,
    useSetIndexFiltersMode,
    useIndexResourceState,
    Text,
    useBreakpoints,
    Button,
    Badge,
    Thumbnail,
    Pagination,
} from '@shopify/polaris';
import {
    PlusIcon
} from '@shopify/polaris-icons';
import axios from "axios";

const ProductsTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const sleep = (ms) =>
        new Promise((resolve) => setTimeout(resolve, ms));
    const [itemStrings, setItemStrings] = useState([
        'All',
        'Active',
        'No rule',
    ]);

    const tabs = itemStrings.map((item, index) => ({
        content: item,
        index,
        onAction: () => { },
        id: `${item}-${index}`,
        isLocked: index === 0,
    }));

    const [selected, setSelected] = useState(0);
    const onCreateNewView = async (value) => {
        await sleep(500);
        setItemStrings([...itemStrings, value]);
        setSelected(itemStrings.length);
        return true;
    };
    const { mode, setMode } = useSetIndexFiltersMode();
    const onHandleCancel = () => { };

    const primaryAction = {
        type: 'save-as',
        onAction: onCreateNewView,
        disabled: false,
        loading: false,
    };

    const [queryValue, setQueryValue] = useState('');

    const handleFiltersQueryChange = useCallback(
        (value) => setQueryValue(value),
        [],
    );

    const filters = [];

    const appliedFilters = [];

    const orders = [
        {
            id: '1020',
            image: 'image',
            product: 'Bàn',
            rule: 1,
            lastUpdate: '19/02/2021',
            status: "Active",
        },
        {
            id: '1021',
            image: 'image',
            product: 'ghế',
            rule: 1,
            lastUpdate: '19/02/2021',
            status: "Active",
        },
    ];
    const resourceName = {
        singular: 'order',
        plural: 'orders',
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(orders);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    const rowMarkup = paginatedData.map((item, index,) => {
        const value = item.id % 2 === 0 ? 0 : Math.floor(Math.random() * 5);
        return (
            <IndexTable.Row
                id={item.id}
                key={item.id}
                selected={selectedResources.includes(item.id)}
                position={index}
            >
                <IndexTable.Cell>
                    <Thumbnail source={require('../assets/image/images.jpg')} alt="Product Image" />
                </IndexTable.Cell>
                <IndexTable.Cell>{item.title}</IndexTable.Cell>
                <IndexTable.Cell>{value}</IndexTable.Cell>
                <IndexTable.Cell>{item.title}</IndexTable.Cell>
                <IndexTable.Cell>
                    {value === 0 ? (
                        <Badge>No rule</Badge>
                    ) : (
                        <Badge tone="success">Active</Badge>
                    )}
                </IndexTable.Cell>
                <IndexTable.Cell><Button icon={PlusIcon} children={"Add Rule"} variant="primary" /></IndexTable.Cell>
            </IndexTable.Row>
        );
    });

    return (
        <LegacyCard>
            <IndexFilters
                queryValue={queryValue}
                queryPlaceholder="Searching in all"
                onQueryChange={handleFiltersQueryChange}
                onQueryClear={() => setQueryValue('')}
                primaryAction={primaryAction}
                cancelAction={{
                    onAction: onHandleCancel,
                    disabled: false,
                    loading: false,
                }}
                tabs={tabs}
                selected={selected}
                onSelect={setSelected}
                // onCreateNewView={onCreateNewView}
                filters={filters} // bỏ
                appliedFilters={appliedFilters}
                mode={mode}
                setMode={setMode}
            />
            <IndexTable
                condensed={useBreakpoints().smDown}
                resourceName={resourceName}
                itemCount={orders.length}
                selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                    { title: '' },
                    { title: 'Product', alignment: 'start' },
                    { title: 'Rule(s)', alignment: 'start' },
                    { title: 'Last update', alignment: 'start' },
                    { title: 'Status', alignment: 'start' },
                    { title: '' },
                ]}
            >
                {rowMarkup}
            </IndexTable>
            <Pagination
                hasPrevious={currentPage > 1}
                onPrevious={() => setCurrentPage(currentPage - 1)}
                hasNext={endIndex < data.length}
                onNext={() => setCurrentPage(currentPage + 1)}
            />
        </LegacyCard>
    );
}

export default ProductsTable;