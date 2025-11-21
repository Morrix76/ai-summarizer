import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Get locale from localStorage or default to 'it'
  const locale = 'it'; // This will be overridden by client-side logic
  
  return {
    locale,
    messages: (await import(`./translations/${locale}.json`)).default
  };
});

