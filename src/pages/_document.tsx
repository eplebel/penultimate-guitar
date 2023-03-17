import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body className="px-4">
        <div className="max-w-lg mx-auto my-2 px-4 rounded-lg border-[1px] border-gray" >
			<Main />
        	<NextScript />
		</div>
      </body>
    </Html>
  );
}
