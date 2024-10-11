import React from 'react';
import { Layout, LegacyCard } from '@shopify/polaris';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.day),
        datasets: [
            {
                label: 'Revenue',
                data: data.map(item => item.revenue),
                backgroundColor: '#FF00CC',
            },
        ],
    };

    const totalRevenues = data.reduce((total, item) => total + item.revenue, 0);

    return (
        <div className='w-1/3'>
            <Layout >
                <Layout.Section>
                    <LegacyCard title="Revenue" sectioned>
                        <div className="flex flex-col w-full">
                            <h1 className='text-xl font-bold'>${totalRevenues}</h1>
                            <Bar data={chartData} height={50} width={100} />
                        </div>
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </div>
    );
};

export default BarChart;
