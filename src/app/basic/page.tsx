'use client';

import dynamic from 'next/dynamic';

// Dynamically import the BasicFeature component with no SSR
const BasicFeature = dynamic(
  () => import('@/components/basic/basic-feature'),
  { ssr: false }
);

export default function Page() {
  return <BasicFeature />;
}
