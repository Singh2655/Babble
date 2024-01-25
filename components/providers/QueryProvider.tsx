"use client";

import { FC, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

interface QueryProviderProps {}

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
