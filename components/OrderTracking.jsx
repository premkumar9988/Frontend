import { useState, useEffect } from 'react';

const OrderTracking = ({ orderId, initialStatus = 'pending' }) => {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const trackingSteps = [
    { id: 1, status: 'pending', title: 'Order Received', icon: '📩' },
    { id: 2, status: 'processing', title: 'Processing', icon: '⚙️' },
    { id: 3, status: 'shipped', title: 'Shipped', icon: '🚚' },
    { id: 4, status: 'in_transit', title: 'In Transit', icon: '📦' },
    { id: 5, status: 'delivered', title: 'Delivered', icon: '✅' }
  ];

  // Simulate API call for tracking
  const fetchTrackingData = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/track-order/${orderId}`);
      const data = await response.json();
      setTrackingData(data);
      setCurrentStatus(data.currentStatus || 'pending');
    } catch (error) {
      console.error('Tracking fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchTrackingData();
    }
  }, [orderId]);

  const getStatusClass = (stepStatus) => {
    if (stepStatus === currentStatus) return 'current';
    if (trackingSteps.findIndex(step => step.status === stepStatus) < 
        trackingSteps.findIndex(step => step.status === currentStatus)) {
      return 'completed';
    }
    return 'pending';
  };

  return (
    <div className="order-tracking-container max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
        <h2 className="text-2xl font-bold text-gray-800">Order Tracking</h2>
        {loading && (
          <div className="ml-auto">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      <div className="order-id mb-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">Order ID: <span className="font-semibold text-gray-900">#{orderId}</span></p>
        {trackingData?.estimatedDelivery && (
          <p className="text-sm text-gray-600">
            Estimated Delivery: <span className="font-semibold">{trackingData.estimatedDelivery}</span>
          </p>
        )}
      </div>

      <div className="tracking-steps">
        {trackingSteps.map((step, index) => (
          <div key={step.id} className="tracking-step flex items-center mb-8 last:mb-0">
            <div className={`step-circle ${getStatusClass(step.status)} w-12 h-12 flex items-center justify-center rounded-full text-lg font-semibold mr-4 flex-shrink-0`}>
              {step.icon}
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold ${getStatusClass(step.status) === 'current' ? 'text-blue-600' : 'text-gray-900'}`}>
                {step.title}
              </h3>
              {trackingData?.timestamps?.[step.status] && (
                <p className="text-sm text-gray-500">
                  {new Date(trackingData.timestamps[step.status]).toLocaleString()}
                </p>
              )}
            </div>
            
            {/* Connector line */}
            {index < trackingSteps.length - 1 && (
              <div className={`connector w-px h-16 bg-gray-300 mx-6 flex-shrink-0 ${getStatusClass(step.status) === 'completed' ? 'bg-green-400' : ''}`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={fetchTrackingData}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Refreshing...' : 'Refresh Tracking'}
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;