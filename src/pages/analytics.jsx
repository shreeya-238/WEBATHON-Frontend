import React, { useRef, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Chart, ArcElement, Tooltip as ChartTooltip, Legend as ChartLegend } from 'chart.js';

// Register Chart.js components
Chart.register(ArcElement, ChartTooltip, ChartLegend);

// Static data for the dashboard
const dashboardData = {
  metrics: {
    totalComplaints: 12340,
    resolved: 9820,
    pending: 2520,
    avgResolutionTime: '3.2 days'
  },
  topPerformers: {
    companies: [
      { id: 1, name: 'TechGadgets Inc.', score: 4.8, complaints: 120 },
      { id: 2, name: 'FashionHub', score: 4.7, complaints: 98 },
      { id: 3, name: 'HomeEssentials', score: 4.5, complaints: 87 },
      { id: 4, name: 'ElectroWorld', score: 4.3, complaints: 76 },
      { id: 5, name: 'FoodieMart', score: 4.2, complaints: 65 },
    ],
    products: [
      { id: 1, name: 'Wireless Earbuds Pro', score: 4.9, complaints: 45 },
      { id: 2, name: 'Smart Watch X1', score: 4.7, complaints: 38 },
      { id: 3, name: 'Bluetooth Speaker', score: 4.6, complaints: 32 },
      { id: 4, name: 'Gaming Mouse', score: 4.5, complaints: 28 },
      { id: 5, name: 'Mechanical Keyboard', score: 4.4, complaints: 25 },
    ]
  },
  complaintCategories: [
    { name: 'Delivery', value: 35 },
    { name: 'Quality', value: 25 },
    { name: 'Billing', value: 20 },
    { name: 'Support', value: 15 },
    { name: 'Others', value: 5 },
  ],
  sentimentTrends: [
    { month: 'Jan', positive: 65, neutral: 25, negative: 10 },
    { month: 'Feb', positive: 68, neutral: 23, negative: 9 },
    { month: 'Mar', positive: 70, neutral: 22, negative: 8 },
    { month: 'Apr', positive: 72, neutral: 20, negative: 8 },
    { month: 'May', positive: 75, neutral: 18, negative: 7 },
    { month: 'Jun', positive: 73, neutral: 19, negative: 8 },
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Analytics = () => {
  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h1>
        
        {/* Overall Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Total Complaints</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {formatNumber(dashboardData.metrics.totalComplaints)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Resolved</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {formatNumber(dashboardData.metrics.resolved)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {formatNumber(dashboardData.metrics.pending)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Avg. Resolution Time</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {dashboardData.metrics.avgResolutionTime}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Chart.js Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Complaint Categories</h3>
            <div className="relative h-80 w-full">
              <canvas id="complaintChart" ref={(el) => {
                if (!el) return;
                
                const ctx = el.getContext('2d');
                if (el.chart) el.chart.destroy();
                
                const data = {
                  labels: dashboardData.complaintCategories.map(item => item.name),
                  datasets: [{
                    data: dashboardData.complaintCategories.map(item => item.value),
                    backgroundColor: [
                      'rgba(54, 162, 235, 0.7)',
                      'rgba(75, 192, 192, 0.7)',
                      'rgba(255, 206, 86, 0.7)',
                      'rgba(255, 99, 132, 0.7)',
                      'rgba(153, 102, 255, 0.7)'
                    ],
                    borderColor: [
                      'rgba(54, 162, 235, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(255, 99, 132, 1)',
                      'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1,
                    spacing: 5,
                    borderRadius: 4,
                    hoverOffset: 10
                  }]
                };

                const config = {
                  type: 'doughnut',
                  data: data,
                  options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          boxWidth: 12,
                          padding: 20
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${percentage}% (${value})`;
                          }
                        }
                      },
                      datalabels: {
                        display: false
                      }
                    },
                    cutout: '70%',
                    layout: {
                      padding: 10
                    },
                    animation: {
                      animateScale: true,
                      animateRotate: true
                    }
                  }
                };

                // Create the chart
                import('chart.js/auto').then(({ default: Chart }) => {
                  el.chart = new Chart(ctx, config);
                });
              }} />
            </div>
          </div>

          {/* Sentiment Trends Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Trends (Last 6 Months)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData.sentimentTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="positive" stroke="#10B981" strokeWidth={2} name="Positive %" />
                  <Line type="monotone" dataKey="neutral" stroke="#6B7280" strokeWidth={2} name="Neutral %" />
                  <Line type="monotone" dataKey="negative" stroke="#EF4444" strokeWidth={2} name="Negative %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Companies */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Companies</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaints</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboardData.topPerformers.companies.map((company, index) => (
                    <tr key={company.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{company.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {company.score}/5.0
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.complaints}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaints</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboardData.topPerformers.products.map((product, index) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.score}/5.0
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.complaints}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
