'use client';
import { useEffect, useState } from 'react';
import ReportContent from '@/components/ReportContent'; // 這是你現有的報告內容組件

function LimitBanner({ over, left }) {
  if (!over) return null;
  return (
    <div className="mb-4 p-3 rounded-lg border border-red-400/30 bg-red-400/10 text-sm">
      本月免費額度已用完（0/5），請下月再試或升級訂閱。
    </div>
  );
}

export default function ReportPage() {
  const [blocked, setBlocked] = useState(false);
  const [left, setLeft] = useState(5);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/usage?op=consume', { cache: 'no-store' });
        if (r.status === 429) {
          const j = await r.json();
          setBlocked(true);
          setLeft(j?.remaining ?? 0);
          return;
        }
        const j = await r.json();
        setLeft(j?.remaining ?? 0);
      } catch {
        // 出錯時不封鎖，用戶體驗優先；可視情況記錄 log
      }
    })();
  }, []);

  if (blocked) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <LimitBanner over={true} left={0} />
        <div className="text-sm text-white/70">
          想解除限制？之後可以升級訂閱以無限瀏覽報告。
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-xs text-white/60 mb-3">
        本月剩餘免費額度：{left}
      </div>
      {/* 渲染你原本的報告內容 */}
      <ReportContent />
    </div>
  );
}
