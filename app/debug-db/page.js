import { getAllSubscriptions } from '@/lib/subscription'

export default async function DebugDB() {
  const data = await getAllSubscriptions()
  
  return (
    <div className="p-8">
      <h1>Database Debug</h1>
      <div>Total Subscriptions: {data.total}</div>
      <div>Demo Users: {data.demoUsers.join(', ')}</div>
      <pre className="bg-gray-100 p-4 mt-4 text-xs">
        {JSON.stringify(data.subscriptions, null, 2)}
      </pre>
    </div>
  )
}
