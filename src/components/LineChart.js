import React from 'react';
import { Layout, LegacyCard } from '@shopify/polaris';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.day),
        datasets: [
            {
                label: 'Subscription',
                data: data.map(item => item.subscribers),
                borderColor: '#FF00CC',
                backgroundColor: '#FF00CC',
                fill: true,
                tension: 0,
            },
        ],
    };

    const totalSubscribers = data.reduce((total, item) => total + item.subscribers, 0);

    return (
        <div className='w-1/3'>
            <Layout >
                <Layout.Section>
                    <LegacyCard title="Subscription" sectioned>
                        <div className="flex flex-col w-full">
                            <h1 className='text-xl font-bold'>{totalSubscribers}</h1>
                            <Line data={chartData} height={50} width={100} />
                        </div>
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </div>
    );
};

export default LineChart;