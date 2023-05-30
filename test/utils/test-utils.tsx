import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RenderOptions, render } from "@testing-library/react";
const queryClient = new QueryClient();
const customRender = (ui: ReactElement, options?: RenderOptions) => {
  let wrapper: React.FC;
  if (options?.wrapper) {
    const Wrapper = options.wrapper;
    wrapper = ({ children }: { children: any }) => (
      <Wrapper>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Wrapper>
    );
  } else {
    wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }
  return render(ui, { ...options, wrapper });
};
export * from "@testing-library/react";
export { customRender as render };
