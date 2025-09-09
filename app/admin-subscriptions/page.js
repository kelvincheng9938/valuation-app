// Simple admin page to view subscriptions
import { getAllSubscriptions } from '@/lib/subscription';

export default async function AdminSubscriptions() {
  const data = await getAllSubscriptions();
  
  return (
    <div className="p-8">
      <h1>Subscription Debug</h1>
      <div>Total: {data.total}</div>
      <div>Demo Users: {data.demoUsers.join(', ')}</div>
      <pre>{JSON.stringify(data.subscriptions, null, 2)}</pre>
    </div>
  );
}
