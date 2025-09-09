// app/admin-dashboard/page.js - Complete Business Dashboard
import { getAllSubscriptions } from '@/lib/subscription'

async function getStripeStats() {
  // This would connect to Stripe API to get revenue data
  // For now, return mock data
  return {
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalCustomers: 0
  }
}

export default async function AdminDashboard() {
  const subscriptionData = await getAllSubscriptions()
  const stripeStats = await getStripeStats()
  
  // Calculate metrics
  const activeSubscriptions = subscriptionData.subscriptions.filter(sub => sub.status === 'active')
  const totalMRR = activeSubscriptions.length * 9.98 // $9.98 per month
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">📊 ValuationPro Business Dashboard</h1>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl font-bold text-green-400">{activeSubscriptions.length}</div>
            <div className="text-sm text-gray-400">Active Subscribers</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl font-bold text-blue-400">${totalMRR.toFixed(0)}</div>
            <div className="text-sm text-gray-400">Monthly Recurring Revenue</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">${(totalMRR * 12).toFixed(0)}</div>
            <div className="text-sm text-gray-400">Annual Run Rate</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400">{subscriptionData.total}</div>
            <div className="text-sm text-gray-400">Total Subscriptions</div>
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">All Subscribers</h2>
          {activeSubscriptions.length === 0 ? (
            <div className="text-gray-400">No active subscribers yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2">Email</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Plan</th>
                    <th className="text-left py-2">Started</th>
                    <th className="text-left py-2">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {activeSubscriptions.map((sub, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-2 font-mono text-sm">{sub.email}</td>
                      <td className="py-2">
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-2">Pro ($9.98/mo)</td>
                      <td className="py-2 text-sm text-gray-400">
                        {new Date(sub.currentPeriodStart).toLocaleDateString()}
                      </td>
                      <td className="py-2 text-sm text-gray-400">{sub.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Demo Users */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Demo Users (Unlimited Access)</h2>
          <div className="space-y-2">
            {subscriptionData.demoUsers.map((email, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-mono text-sm">{email}</span>
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Demo</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Database Status</h2>
          <div className="space-y-2 text-sm">
            <div>Total Records: {subscriptionData.total}</div>
            <div>Active Subscriptions: {activeSubscriptions.length}</div>
            <div>Demo Users: {subscriptionData.demoUsers.length}</div>
            <div>Last Updated: {new Date().toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
