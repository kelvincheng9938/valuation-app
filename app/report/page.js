// 在 ReportContent.js 的 handleStockChange 函數中添加限制檢查

const handleStockChange = (newTicker) => {
  console.log('[Report] Stock change requested:', newTicker);
  
  // 檢查用戶認證狀態
  if (status === 'authenticated') {
    console.log('[Report] User authenticated - checking usage limits');
    
    // 檢查認證用戶的使用限制
    const authUsage = checkAuthUsage();
    if (authUsage.count >= 5) {
      console.log('[Report] Auth user exceeded 5 views - redirecting to upgrade');
      router.push(`/upgrade?from=${encodeURIComponent('/report')}&reason=monthly_limit`);
      return false;
    }
    
    // 增加使用計數
    incrementAuthUsage();
    return true;
  }

  // 未認證用戶的邏輯
  const freeUsage = checkFreeUsage();
  console.log('[Report] Free usage check:', freeUsage);
  
  if (freeUsage.count >= 2) {
    console.log('[Report] Free user exceeded 2 views - redirecting to login');
    router.push(`/login?from=${encodeURIComponent(`/report?ticker=${newTicker}`)}&reason=free_limit`);
    return false;
  }
  
  // 增加免費使用計數
  incrementFreeUsage();
  console.log('[Report] Free usage incremented');
  return true;
};

// 添加這些輔助函數
function checkAuthUsage() {
  const cookies = document.cookie.split(';');
  const authUsageCookie = cookies.find(cookie => cookie.trim().startsWith('auth_usage='));
  
  if (!authUsageCookie) {
    return { count: 0 };
  }
  
  try {
    const cookieValue = decodeURIComponent(authUsageCookie.split('=')[1]);
    const usageData = JSON.parse(cookieValue);
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    
    if (usageData.month !== currentMonth) {
      return { count: 0 };
    }
    
    return { count: usageData.count || 0 };
  } catch (e) {
    return { count: 0 };
  }
}

function incrementAuthUsage() {
  const authUsage = checkAuthUsage();
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  
  const newUsageData = {
    month: currentMonth,
    count: authUsage.count + 1,
    timestamp: now.toISOString()
  };
  
  document.cookie = `auth_usage=${encodeURIComponent(JSON.stringify(newUsageData))}; path=/; max-age=${60 * 60 * 24 * 31}`;
}

function incrementFreeUsage() {
  const freeUsage = checkFreeUsage();
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  
  const newUsageData = {
    month: currentMonth,
    count: freeUsage.count + 1,
    timestamp: now.toISOString()
  };
  
  document.cookie = `free_usage=${encodeURIComponent(JSON.stringify(newUsageData))}; path=/; max-age=${60 * 60 * 24 * 31}`;
}
