// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import App from "@/App";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
// import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {StrictMode} from "react";

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <App/>
          </BrowserRouter>
          {/*<ReactQueryDevtools initialIsOpen={false} />*/}
      </QueryClientProvider>
  </StrictMode>,
)
