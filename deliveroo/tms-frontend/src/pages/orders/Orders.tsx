import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { useOrdersQuery } from '@/http/orders.queries';
import {
  OverviewTab,
  IncomingRequestsTab,
  InTransitTab,
  DeliveredTab,
  PaymentsTab,
} from './transportation-orders';
import {
  mockIncomingRequests,
  mockInTransitOrders,
  mockDeliveredOrders,
  mockPayments,
} from '@/http/orders.mocks';

const Orders = () => {
  const navigate = useNavigate();
  const { data: orders = [], isLoading } = useOrdersQuery();
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-emerald-100 text-emerald-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      case 'returned': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getColumnColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing': return 'bg-blue-50 border-blue-200';
      case 'shipped': return 'bg-yellow-50 border-yellow-200';
      case 'delivered': return 'bg-green-50 border-green-200';
      case 'canceled': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const handleViewDetails = (orderId: number) => {
    navigate(`/orders/${orderId}`);
  };

  // Group orders by status for Kanban board
  const ordersByStatus = {
    processing: orders.filter(order => order.status.toLowerCase() === 'processing'),
    shipped: orders.filter(order => order.status.toLowerCase() === 'shipped'),
    delivered: orders.filter(order => order.status.toLowerCase() === 'delivered'),
    canceled: orders.filter(order => order.status.toLowerCase() === 'canceled'),
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'partially paid': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transportation Orders</h1>
          <p className="text-gray-600">Manage your transportation orders and logistics</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Create New Order
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">📄 Order Transportation Overview</TabsTrigger>
          <TabsTrigger value="incoming">📩 Incoming Requests</TabsTrigger>
          <TabsTrigger value="transit">🚚 In Transit</TabsTrigger>
          <TabsTrigger value="delivered">📦 Delivered</TabsTrigger>
          <TabsTrigger value="payments">💵 Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab
            ordersByStatus={ordersByStatus}
            getStatusColor={getStatusColor}
            getColumnColor={getColumnColor}
            handleViewDetails={handleViewDetails}
          />
        </TabsContent>

        <TabsContent value="incoming" className="space-y-6">
          <IncomingRequestsTab incomingRequests={mockIncomingRequests} />
        </TabsContent>

        <TabsContent value="transit" className="space-y-6">
          <InTransitTab inTransitOrders={mockInTransitOrders} />
        </TabsContent>

        <TabsContent value="delivered" className="space-y-6">
          <DeliveredTab deliveredOrders={mockDeliveredOrders} />
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <PaymentsTab
            paymentsData={mockPayments}
            getPaymentStatusColor={getPaymentStatusColor}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
