import Link from "next/link";
import SearchBox from "./searchbox";

// using etiennelebel.com path as workaround 
// to routing issue w/ relative path to public\icons

// Removed (for now) added TOGGLE button given it was also showing up on home screen
// <img src="https://etiennelebel.com/jb/icons/toggle.png" className="max-w-[35px] ml-3" />

export default function Header() {
  return (
	<div className="max-w-lg mx-auto my-4">
		<div className="flex space-x-4 justify-center items-center">
		<Link href="/">
			<img src="https://etiennelebel.com/jb/icons/jb-icon-d3.png" className="max-w-[35px]" />
		</Link>
		
		<SearchBox />
		</div>
	</div>
  );
}
