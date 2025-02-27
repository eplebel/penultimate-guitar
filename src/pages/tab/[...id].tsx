import LoadingSpinner from "@/components/loadingspinner";
import TabSheet from "@/components/tabsheet";
import ToolbarButton from "@/components/toolbarbutton";
import { useGlobal } from "@/contexts/Global/context";
import { blacklist, ContributorObj, TabDto, TabLinkProps } from "@/models";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import _ from "lodash";
import prisma from "@/lib/prisma";
import { JSDOM } from "jsdom";

const scrollMs = 50;

type TabProps = {
  tabDetails: TabDto;
};

export default function Tab({ tabDetails }: TabProps) {
  const router = useRouter();
  const { id } = router.query;
  const plainTab = tabDetails.tab;
  const [fontSize, setFontSize] = useState(14);
  const [tranposition, setTranposition] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const scrollinterval = useRef<NodeJS.Timer>();
  const { addPinnedTab, removePinnedTab, isPinned } = useGlobal();

  useEffect(() => {
    const recents: any = JSON.parse(localStorage?.getItem("recents") || "{}");
    if (Array.isArray(recents)) {
      recents.unshift({
        taburl: tabDetails.taburl,
        name: tabDetails.name,
        artist: tabDetails.artist,
      });
      const uniqRecents = _.uniqBy(recents, (r: TabLinkProps) => r.taburl);
      localStorage.setItem("recents", JSON.stringify(uniqRecents));
    } else {
      let arrayRecents = Object.keys(recents).map((r) => ({
        taburl: r,
        name: recents[r].name,
        artist: recents[r].artist,
      }));

      arrayRecents.unshift({
        taburl: tabDetails.taburl,
        name: tabDetails.name,
        artist: tabDetails.artist,
      });

      const uniqRecents = _.uniqBy(arrayRecents, (r: TabLinkProps) => r.taburl);

      localStorage.setItem("recents", JSON.stringify(uniqRecents));
    }
  }, [id, tabDetails]);

  const changeScrolling = (type: string) => {
    clearInterval(scrollinterval.current);
    if (type === "up") {
      setScrollSpeed(scrollSpeed + 1);
    } else {
      if (scrollSpeed > 0) {
        setScrollSpeed(scrollSpeed - 1);
      }
    }
  };

  useEffect(() => {
    if (scrollSpeed > 0) {
      scrollinterval.current = setInterval(
        () =>
          window.scrollBy({
            top: scrollSpeed * 2,
            left: 0,
            behavior: "smooth",
          }),
        scrollMs
      );
    }
  }, [scrollSpeed]);

  const formattedTransposition = () => {
    return tranposition < 0 ? tranposition.toString() : `+${tranposition}`;
  };

  return (
    <div>
      <Head>
        <title>
          {tabDetails?.name
            ? `${tabDetails?.name} - ${tabDetails?.artist}`
            : "JamBox"}
        </title>
      </Head>
      <>
        
        
        <div className="bg-white/100 w-full sticky top-0 border-b border-gray mb-2 px-4">
          
		  <h1 className="max-w-lg mx-auto text-xl mt-4 mb-2 flex">
		 	<div className="inline-block">
              <p className="font-bold inline-block">{tabDetails?.name}</p> - {tabDetails?.artist} 
            </div>
          </h1>

		  <div className="flex justify-between max-w-lg mx-auto -mt-2 mb-2 gap-4 text-xs flex-wrap text-gray-400 hover:text-black items-center">
            
			<div className="flex-1 flex-col text-center">
			 {!!tabDetails?.capo && ( 	
               <div className="w-fit italic">		
		    		CAPO {tabDetails?.capo}
			  </div>
			)}
			</div>

			<div className="flex-1 flex-col text-center">
              <div className="m-auto w-fit">
                <ToolbarButton
                  fn={() =>
                    isPinned(tabDetails)
                      ? removePinnedTab(tabDetails)
                      : addPinnedTab(tabDetails)
                  }
                  icon={isPinned(tabDetails) ? "❌" : "📌"}
                />
              </div>
            </div>

            <div className="flex-1 flex-col text-center text-base">
              <div className="flex m-auto w-fit">
                <div className="text-[10px]" >
					<ToolbarButton fn={() => setFontSize(fontSize - 2)} icon="A" />
				</div>
                <ToolbarButton fn={() => setFontSize(fontSize + 2)} icon="A" />
              </div>
            </div>

            <div className="flex-1 flex-col text-center text-base">
              <div className="flex m-auto items-center">
                <ToolbarButton
                  fn={() => setTranposition(tranposition - 1)}
                  icon="♭"
                />
                <ToolbarButton
                  fn={() => setTranposition(tranposition + 1)}
                  icon="♯"
                />
				<div className="text-xs">
					{tranposition === 0 || ` (${formattedTransposition()})`}
				</div>
              </div>
            </div>

            
          </div>
        </div>

        <TabSheet
          plainTab={plainTab}
          fontSize={fontSize}
          transposition={tranposition}
        ></TabSheet>

		
          {!!tabDetails?.contributors?.length && 
		  <div className="max-w-lg mx-auto mt-4 mb-2 px-4 text-sm border-gray border-t py-2">
            <details open>
              <summary>{tabDetails?.contributors?.length} Contributors</summary>
              <ul>
                {tabDetails?.contributors?.map((c, index) => (
                  <li key={index}>
                    <Link href={`https://www.ultimate-guitar.com/u/${c}`}>
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </div>
		  }

          
          
		  {!!tabDetails?.tuning && 
		  <div className="max-w-lg mx-auto mb-4 pt-2 px-4 text-sm border-gray border-t"> 
			Tuning:{" "}
			<span className="font-bold">{tabDetails?.tuning.name}</span>,{" "}
			{tabDetails?.tuning.value}
		  </div>
		  }

      </>
    </div>
  );
}

type ServerProps = {
  params: { id: string | string[] };
};

export async function getServerSideProps({ params }: ServerProps) {
  let props: TabDto = {
    taburl: "",
    tab: "",
    artist: "",
    contributors: [],
    name: "",
    tuning: { name: "", value: "", index: 0 },
    capo: 0,
  };
  if (typeof params.id === "object") {
    const url = params.id.join("/");

    // Attempt to fetch from database API
    const savedTab = await prisma.tab.findFirst({
      where: {
        taburl: url,
      },
    });

    if (savedTab) {
      console.log("tab is in db");
      props = {
        tab: savedTab.tab,
        taburl: savedTab.taburl,
        capo: savedTab.capo,
        tuning: JSON.parse(savedTab.tuning ?? "{}"),
        contributors: savedTab.contributors,
        name: savedTab.name,
        artist: savedTab.artist ?? "Unknown Artist",
      };
    } else {
      console.log("tab not in db");
      const fullurl = `https://tabs.ultimate-guitar.com/tab/${url}`;
      const tab = await getTab(fullurl);
      props = { ...tab, taburl: url };
      try {
        if (tab.tab !== "") {
          const result = await prisma.tab.create({
            data: {
              taburl: url,
              tab: tab.tab,
              artist: tab.artist,
              contributors: tab.contributors ?? "",
              name: tab.name,
              tuning: JSON.stringify(tab?.tuning ?? {}),
              capo: tab?.capo ?? 0,
            },
          });
        }
      } catch (err) {
        console.warn("Something went wrong.", err);
      }
    }
  }
  return { props: { tabDetails: props } };
}

async function getTab(URL: string): Promise<TabDto> {
  let songData: TabDto = {
    taburl: "",
    name: "",
    artist: "",
    contributors: [],
    tab: "",
  };
  console.log("Fetching", URL);
  await fetch(URL)
    .then((response) => response.text())
    .then((html) => {
      const dom = new JSDOM(html);
      let jsStore = dom.window.document.querySelector(".js-store");
      let dataContent = JSON.parse(
        jsStore?.getAttribute("data-content") || "{}"
      );
      if (blacklist.includes(dataContent?.store?.page?.data?.tab?.type)) {
        songData.name = "Couldn't display tab type";
        songData.artist = dataContent?.store?.page?.data?.tab?.type;
        return;
      }

      songData.tab =
        dataContent?.store?.page?.data?.tab_view?.wiki_tab?.content.replace(
          /\r\n/g,
          "\n"
        );
      songData.name = dataContent?.store?.page?.data?.tab?.song_name;
      songData.artist = dataContent?.store?.page?.data?.tab?.artist_name;
      songData.tuning = dataContent?.store?.page?.data?.tab_view?.meta?.tuning;
      songData.capo = dataContent?.store?.page?.data?.tab_view?.meta?.capo;
      songData.contributors =
        dataContent?.store?.page?.data?.tab_view?.contributors?.map(
          (c: ContributorObj) => c.username
        );
    })
    .catch((err) => {
      console.warn("Something went wrong.", err);
    });
  return songData;
}
