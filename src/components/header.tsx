import Link from "next/link";
import SearchBox from "./searchbox";

//	Need to add container and than apply:	flex justify-center items-center
	// then replace Penultimate Guitar w/ JB logo
	// then add hamburger menubar
	// then attempt to add toggle switch 
export default function Header() {
  return (
    
	<>
      <Link href="/">
        <h1 className="m-auto w-fit">Penultimate Guitar</h1>
      </Link>
      <SearchBox />
    </>
  );
}
