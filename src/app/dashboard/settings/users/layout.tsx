import React from 'react';

// This layout is simplified to its bare minimum.
// The page content itself is now responsible for rendering the complete card with its header.
export default function UserSettingsLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}
