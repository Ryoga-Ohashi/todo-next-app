import "./globals.css";
import type { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default RootLayout;


export const metadata: Metadata = {
  title: "TodoApp",
  description: "Todo APP with next.js and golang",
};
