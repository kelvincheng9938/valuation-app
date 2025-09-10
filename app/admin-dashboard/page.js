// app/admin-dashboard/page.js - Complete Business Dashboard with Next Payment Date
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

function getNextPaymentDate(subscription) {
  if (!subscription.currentPeriodEnd) return 'N/A'
  
  try {
    const endDate = new Date(subscription.currentPeriodEnd)
    return endDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  } catch (error) {
    return 'N/A'
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
                    <th className="text-left py-2">Next Payment Date</th>
                    <th className="text-left py-2">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {activeSubscriptions.map((sub, index) => {
                    const nextPayment = getNextPaymentDate(sub)
                    const isUpcoming = () => {
                      if (!sub.currentPeriodEnd) return false
                      const endDate = new Date(sub.currentPeriodEnd)
                      const today = new Date()
                      const daysUntil = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
                      return daysUntil <= 7 && daysUntil >= 0
                    }
                    
                    return (
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
                        <td className="py-2 text-sm">
                          <span className={`${isUpcoming() ? 'text-yellow-400 font-semibold' : 'text-gray-400'}`}>
                            {nextPayment}
                            {isUpcoming() && <span className="ml-1">⚠️</span>}
                          </span>
                        </td>
                        <td className="py-2 text-sm text-gray-400">{sub.source}</td>
                      </tr>
                    )
                  })}
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

        {/* Payment Schedule Note */}
        <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mt-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">💳 Stripe Automatic Billing</h3>
          <p className="text-sm text-blue-200">
            Yes, Stripe will automatically charge subscribers on their next payment date. 
            All active subscribers will be billed $9.98 on their billing anniversary (30 days after signup).
          </p>
          <p className="text-sm text-blue-200 mt-2">
            ⚠️ Yellow highlighted dates indicate payments due within 7 days.
          </p>
        </div>
      </div>
    </div>
  )
}
