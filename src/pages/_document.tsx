import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body className="sm:px-2">
        <div className="max-w-lg mx-auto my-2 rounded-lg sm:border-[1px] sm:border-gray" >
			<Main />
        	<NextScript />
		</div>
      </body>
    </Html>
  );
}
