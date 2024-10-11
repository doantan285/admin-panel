import React from 'react';
import { Layout, LegacyCard } from '@shopify/polaris';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const fakeSubscriptionData = [
    { day: 'Day 1', subscribers: 35 },
    { day: 'Day 2', subscribers: 100 },
    { day: 'Day 3', subscribers: 85 },
    { day: 'Day 4', subscribers: 16 },
    { day: 'Day 5', subscribers: 10 },
    { day: 'Day 6', subscribers: 60 },
];

const LineChart = () => {
    const data = {
        labels: fakeSubscriptionData.map(data => data.day),
        datasets: [
            {
                label: 'Subscription',
                data: fakeSubscriptionData.map(data => data.subscribers),
                borderColor: '#FF00CC',
                backgroundColor: '#FF00CC',
                fill: true,
                tension: 0,
            },
        ],
    };

    const totalSubscribers = fakeSubscriptionData.reduce((total, item) => total + item.subscribers, 0);

    return (
        <div className='w-1/3'>
            <Layout >
                <Layout.Section>
                    <LegacyCard title="Subscription" sectioned>
                        <div className="flex flex-col w-full">
                            <h1 className='text-xl font-bold'>{totalSubscribers}</h1>
                            <Line data={data} height={50} width={100} />
                        </div>
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </div>
    );
};

export default LineChart;