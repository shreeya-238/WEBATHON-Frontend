import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart, ArcElement, Tooltip as ChartTooltip, Legend as ChartLegend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';

// Register Chart.js components
Chart.register(
  ArcElement, 
  ChartTooltip, 
  ChartLegend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  BarElement
);

// Sample data
const dashboardData = {
  // KPI Data
  kpis: {
    totalComplaints: 1247,
    avgResolutionTime: '2.5 days',
    positiveReviewPercentage: 78,
    totalReviews: 892,
    complaintsChange: 12.5,
    resolutionChange: -3.2,
    reviewChange: 5.7,
  },
  
  // Complaints Over Time (Weekly)
  complaintsOverTime: [
    { week: 'Week 1', complaints: 45 },
    { week: 'Week 2', complaints: 52 },
    { week: 'Week 3', complaints: 48 },
    { week: 'Week 4', complaints: 60 },
    { week: 'Week 5', complaints: 55 },
  ],
  
  // Resolution Time by Category
  resolutionTimeByCategory: [
    { category: 'Delivery', avgDays: 1.8 },
    { category: 'Quality', avgDays: 3.2 },
    { category: 'Billing', avgDays: 2.5 },
    { category: 'Support', avgDays: 1.2 },
    { category: 'Others', avgDays: 4.0 },
  ],
  
  // Complaint Categories
  complaintCategories: [
    { name: 'Delivery', value: 35 },
    { name: 'Quality', value: 25 },
    { name: 'Billing', value: 20 },
    { name: 'Support', value: 15 },
    { name: 'Others', value: 5 },
  ],
  
  // Sentiment Analysis
  sentimentAnalysis: {
    positive: 65,
    neutral: 25,
    negative: 10
  },
  
  // Sentiment Trends
  sentimentTrends: [
    { month: 'Jan', positive: 62, neutral: 27, negative: 11 },
    { month: 'Feb', positive: 65, neutral: 25, negative: 10 },
    { month: 'Mar', positive: 68, neutral: 23, negative: 9 },
    { month: 'Apr', positive: 70, neutral: 21, negative: 9 },
    { month: 'May', positive: 72, neutral: 20, negative: 8 },
    { month: 'Jun', positive: 75, neutral: 18, negative: 7 },
  ]
};

const CompanyAnalytics = () => {
  const navigate = useNavigate();
  const complaintsChartRef = useRef(null);
  const resolutionChartRef = useRef(null);
  const sentimentTrendsChartRef = useRef(null);
  const sentimentPieRef = useRef(null);

  useEffect(() => {
    // Dynamically import Chart.js to avoid SSR issues
    const initCharts = async () => {
      const { Chart } = await import('chart.js/auto');
      
      // Destroy existing charts if they exist
      [complaintsChartRef, resolutionChartRef, sentimentTrendsChartRef, sentimentPieRef].forEach(ref => {
        if (ref.current && ref.current.chart) {
          ref.current.chart.destroy();
        }
      });
      
      // 1. Complaints Over Time (Line Chart)
      if (complaintsChartRef.current) {
        const ctx = complaintsChartRef.current.getContext('2d');
        complaintsChartRef.current.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: dashboardData.complaintsOverTime.map(item => item.week),
            datasets: [{
              label: 'Number of Complaints',
              data: dashboardData.complaintsOverTime.map(item => item.complaints),
              borderColor: 'rgba(59, 130, 246, 1)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.3,
              fill: true,
              pointBackgroundColor: 'white',
              pointBorderColor: 'rgba(59, 130, 246, 1)',
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: 'white',
                titleColor: '#1F2937',
                bodyColor: '#4B5563',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                padding: 12,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                callbacks: {
                  label: (context) => {
                    return `${context.parsed.y} complaints`;
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(229, 231, 235, 0.5)'
                },
                ticks: {
                  stepSize: 10
                }
              },
              x: {
                grid: {
                  display: false
                }
              }
            }
          }
        });
      }

      // 2. Resolution Time by Category (Bar Chart)
      if (resolutionChartRef.current) {
        const ctx = resolutionChartRef.current.getContext('2d');
        resolutionChartRef.current.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: dashboardData.resolutionTimeByCategory.map(item => item.category),
            datasets: [{
              label: 'Average Days to Resolve',
              data: dashboardData.resolutionTimeByCategory.map(item => item.avgDays),
              backgroundColor: [
                'rgba(99, 102, 241, 0.7)',
                'rgba(59, 130, 246, 0.7)',
                'rgba(16, 185, 129, 0.7)',
                'rgba(245, 158, 11, 0.7)',
                'rgba(239, 68, 68, 0.7)'
              ],
              borderColor: [
                'rgba(99, 102, 241, 1)',
                'rgba(59, 130, 246, 1)',
                'rgba(16, 185, 129, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(239, 68, 68, 1)'
              ],
              borderWidth: 1,
              borderRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    return `${context.parsed.y} days average`;
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(229, 231, 235, 0.5)'
                },
                ticks: {
                  callback: function(value) {
                    return value + ' days';
                  }
                }
              },
              x: {
                grid: {
                  display: false
                }
              }
            }
          }
        });
      }

      // 3. Sentiment Trends (Line Chart)
      if (sentimentTrendsChartRef.current) {
        const ctx = sentimentTrendsChartRef.current.getContext('2d');
        sentimentTrendsChartRef.current.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: dashboardData.sentimentTrends.map(item => item.month),
            datasets: [
              {
                label: 'Positive',
                data: dashboardData.sentimentTrends.map(item => item.positive),
                borderColor: 'rgba(16, 185, 129, 1)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.3,
                fill: true
              },
              {
                label: 'Neutral',
                data: dashboardData.sentimentTrends.map(item => item.neutral),
                borderColor: 'rgba(156, 163, 175, 1)',
                backgroundColor: 'rgba(156, 163, 175, 0.1)',
                tension: 0.3,
                fill: true
              },
              {
                label: 'Negative',
                data: dashboardData.sentimentTrends.map(item => item.negative),
                borderColor: 'rgba(239, 68, 68, 1)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.3,
                fill: true
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    return `${context.dataset.label}: ${context.parsed.y}%`;
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                grid: {
                  color: 'rgba(229, 231, 235, 0.5)'
                },
                ticks: {
                  callback: function(value) {
                    return value + '%';
                  }
                }
              },
              x: {
                grid: {
                  display: false
                }
              }
            }
          }
        });
      }

      // 4. Sentiment Pie Chart
      if (sentimentPieRef.current) {
        const ctx = sentimentPieRef.current.getContext('2d');
        sentimentPieRef.current.chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Positive', 'Neutral', 'Negative'],
            datasets: [{
              data: [
                dashboardData.sentimentAnalysis.positive,
                dashboardData.sentimentAnalysis.neutral,
                dashboardData.sentimentAnalysis.negative
              ],
              backgroundColor: [
                'rgba(16, 185, 129, 0.7)',
                'rgba(156, 163, 175, 0.7)',
                'rgba(239, 68, 68, 0.7)'
              ],
              borderColor: [
                'rgba(16, 185, 129, 1)',
                'rgba(156, 163, 175, 1)',
                'rgba(239, 68, 68, 1)'
              ],
              borderWidth: 1,
              borderRadius: 4,
              spacing: 5,
              hoverOffset: 10
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  padding: 15,
                  usePointStyle: true,
                  pointStyle: 'circle',
                  font: {
                    size: 12
                  }
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.label}: ${context.raw}%`;
                  }
                }
              }
            },
            animation: {
              animateScale: true,
              animateRotate: true
            }
          }
        });
      }
    };

    initCharts();

    // Cleanup function
    return () => {
      [complaintsChartRef, resolutionChartRef, sentimentTrendsChartRef, sentimentPieRef].forEach(ref => {
        if (ref.current && ref.current.chart) {
          ref.current.chart.destroy();
        }
      });
    };
  }, []);

  // Helper function to render trend indicator
  const renderTrendIndicator = (value) => {
    const isPositive = value >= 0;
    return (
      <span className={`inline-flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
        {Math.abs(value)}%
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Company Analytics</h1>
            <p className="text-sm text-gray-500 mt-1">Track and analyze your company's performance</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Dashboard
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Complaints */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Complaints</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.kpis.totalComplaints}</p>
                <p className="text-xs text-gray-500 mt-1">
                  <span className={dashboardData.kpis.complaintsChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {renderTrendIndicator(dashboardData.kpis.complaintsChange)}
                  </span>{' '}
                  vs last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-indigo-50">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Average Resolution Time */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Resolution Time</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.kpis.avgResolutionTime}</p>
                <p className="text-xs text-gray-500 mt-1">
                  <span className={dashboardData.kpis.resolutionChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {renderTrendIndicator(dashboardData.kpis.resolutionChange)}
                  </span>{' '}
                  vs last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Positive Review Percentage */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Positive Reviews</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.kpis.positiveReviewPercentage}%</p>
                <p className="text-xs text-gray-500 mt-1">
                  <span className={dashboardData.kpis.reviewChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {renderTrendIndicator(dashboardData.kpis.reviewChange)}
                  </span>{' '}
                  vs last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-50">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Reviews */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.kpis.totalReviews}</p>
                <p className="text-xs text-gray-500 mt-1">
                  <span className={dashboardData.kpis.reviewChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {renderTrendIndicator(dashboardData.kpis.reviewChange)}
                  </span>{' '}
                  vs last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Complaints Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Complaints Over Time */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Complaints Over Time</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs bg-indigo-50 text-indigo-700 rounded-md">Weekly</button>
                <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-md">Monthly</button>
              </div>
            </div>
            <div className="h-64">
              <canvas ref={complaintsChartRef}></canvas>
            </div>
          </div>

          {/* Complaint Categories */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Complaint Categories</h2>
            <div className="h-64">
              <canvas ref={sentimentPieRef}></canvas>
            </div>
          </div>
        </div>

        {/* Resolution Time by Category */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Average Resolution Time by Category</h2>
          <div className="h-80">
            <canvas ref={resolutionChartRef}></canvas>
          </div>
        </div>

        {/* Reviews Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Sentiment Analysis Summary */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Analysis</h2>
            <div className="space-y-4">
              {[
                { label: 'Positive', value: dashboardData.sentimentAnalysis.positive, color: 'bg-green-500' },
                { label: 'Neutral', value: dashboardData.sentimentAnalysis.neutral, color: 'bg-gray-400' },
                { label: 'Negative', value: dashboardData.sentimentAnalysis.negative, color: 'bg-red-500' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${item.color}`} 
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sentiment Trends */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Trends</h2>
            <div className="h-64">
              <canvas ref={sentimentTrendsChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAnalytics;
