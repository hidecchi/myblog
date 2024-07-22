"use client";

import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";

export const LivePreviewProvider = ({
  isEnabled,
  children,
}: {
  isEnabled: boolean;
  children: React.ReactNode;
}) => {
  return (
    <ContentfulLivePreviewProvider
      locale="ja-JP"
      enableInspectorMode={isEnabled}
      enableLiveUpdates={isEnabled}
      debugMode={isEnabled}
    >
      {children}
    </ContentfulLivePreviewProvider>
  );
};
