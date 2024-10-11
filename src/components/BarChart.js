import React from 'react';
import { Layout, LegacyCard } from '@shopify/polaris';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const fakeRevenueData = [
    { month: '1', revenue: 1000 },
    { month: '2', revenue: 1500 },
    { month: '3', revenue: 2000 },
    { month: '4', revenue: 2500 },
    { month: '5', revenue: 3000 },
    { month: '6', revenue: 3500 },
    { month: '7', revenue: 4000 },
    { month: '8', revenue: 4500 },
    { month: '9', revenue: 5000 },
    { month: '10', revenue: 5500 },
    { month: '11', revenue: 6000 },
    { month: '12', revenue: 6500 },
];

const totalRevenues = fakeRevenueData.reduce((total, item) => total + item.revenue, 0);

const BarChart = () => {
    const data = {
        labels: fakeRevenueData.map(data => data.month),
        datasets: [
            {
                label: 'Revenue',
                data: fakeRevenueData.map(data => data.revenue),
                backgroundColor: '#FF00CC',
            },
        ],
    };

    return (
        <div className='w-1/3'>
            <Layout >
                <Layout.Section>
                    <LegacyCard title="Revenue" sectioned>
                        <div className="flex flex-col w-full">
                            <h1 className='text-xl font-bold'>{totalRevenues}</h1>
                            <Bar data={data} height={50} width={100} />
                        </div>
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </div>
    );
};

export default BarChart;
