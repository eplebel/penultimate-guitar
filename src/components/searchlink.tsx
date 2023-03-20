import { SearchResult } from "@/models";
import Link from "next/link";

type SearchLinkProps = SearchResult;

export default function SearchLink({
  tab_url,
  song_name,
  artist_name,
  version,
  rating,
  type,
}: SearchLinkProps) {
  return (
    <div className="px-4">
      <Link href={`/tab/${tab_url}`} className="no-underline">
        <div className="border-grey-500 border-[1px] p-4 my-4 rounded-xl max-w-xl mx-auto hover:shadow-md transition ease-in-out flex-col text-black">
          <div className="flex justify-between">
            <div className="inline-block">
              {song_name} - {artist_name} <p className="text-sm text-gray-400 ml-1 inline-block">(UG ver {version})</p> 
            </div>
			<div>
              <p>
                {!Math.round(rating) ||
                  "⭐".repeat(Math.round(rating))}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
