import { useRouter } from "next/router";

export default function SearchBox() {
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const search: string = event.target.url.value;
    console.log(search);
    if (search.startsWith("https://tabs.ultimate-guitar.com/tab/")) {
      router.push(`/tab/${search.slice(37)}`);
    } else {
      router.push(`/search/${event.target.url.value}`);
    }
  };
  return (
    <>
      <form className="grow" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative mx-auto my-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
			<button type="submit" >
				<svg
				aria-hidden="true"
				className="w-5 h-5 text-gray-500 dark:text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				></path>
				</svg>
			</button>
          </div>
          <input
            type="search"
            id="default-search"
            name="url"
            className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder=""
            required
          />
        </div>
      </form>
    </>
  );
}
