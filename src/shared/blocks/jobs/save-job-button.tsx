'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/components/ui/button';

export function SaveJobButton({
  jobId,
  initialSaved = false,
}: {
  jobId: string;
  initialSaved?: boolean;
}) {
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  async function handleClick() {
    setError('');

    try {
      const response = await fetch('/api/jobs/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId }),
      });

      const result = await response.json();
      if (result?.code !== 0) {
        setError(result?.message || 'Failed to update saved jobs');
        return;
      }

      setSaved(Boolean(result?.data?.saved));
      startTransition(() => {
        router.refresh();
      });
    } catch (e) {
      console.log('save job failed', e);
      setError('Failed to update saved jobs');
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        type="button"
        variant={saved ? 'secondary' : 'outline'}
        size="sm"
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? 'Saving...' : saved ? 'Saved' : 'Save Job'}
      </Button>
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
