import { useState } from 'react';

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
const WEB3FORMS_PUBLIC_KEY = '2ba02088-6b5e-492b-bdc3-e42218998563';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export function useEventSubmission() {
  const [status, setStatus] = useState<SubmissionStatus>('idle');

  async function submitEvent(formData: FormData): Promise<boolean> {
    formData.append('access_key', WEB3FORMS_PUBLIC_KEY);

    setStatus('submitting');

    try {
      const response = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setStatus('error');
        return false;
      }

      setStatus('success');
      return true;
    } catch {
      setStatus('error');
      return false;
    }
  }

  function resetStatus() {
    setStatus('idle');
  }

  return { status, submitEvent, resetStatus };
}
