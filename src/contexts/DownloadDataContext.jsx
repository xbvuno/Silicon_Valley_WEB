import { createContext, useContext, useEffect, useState, useCallback } from "react";

const EmptyFundFiles = {
  expire_on: "",
  latest_tag: "",
  change_log: {},
  windows: { version: "", url: "" },
  macos: { version: "", url: "" },
  linux: { version: "", url: "" },
}

const DownloadDataContext = createContext();

export function DownloadDataProvider({ children }) {

  const [fundFiles, setFundFiles] = useState({...EmptyFundFiles});

  const fetchData = useCallback(async () => {
    let fund_files = {...EmptyFundFiles};

    
    const repo = "xbvuno/Silicon_Valley_RW";
    let tags = await fetch(`https://api.github.com/repos/${repo}/tags`).then((r) => r.json());
    fund_files.latest_tag = tags[0]?.name || "";

    const cached = localStorage.getItem("last_funds");
    if (cached) {
      const cached_json = JSON.parse(cached);
      if (
        cached_json.expire_on &&
        new Date(cached_json.expire_on) > new Date() &&
        cached_json.latest_tag === fund_files.latest_tag
      ) {
        console.log('✅ Cached data is valid, using it');
        setFundFiles(cached_json);
        return;
      } else {
        console.log('🔃 Cached data expired or tag mismatch, fetching new data');
      }
    } else {
      console.log('🔶 No cached data found, fetching new data');
    }
    for (const tag of tags) {
      const tagName = tag.name;
      if (
        fund_files.windows.version &&
        fund_files.macos.version &&
        fund_files.linux.version
      ) break;
      let release = await fetch(
        `https://api.github.com/repos/${repo}/releases/tags/${tagName}`
      )
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null);
      if (!release) continue;
      fund_files.change_log[tagName] = release.body;
      for (const asset of release.assets) {
        if (asset.name.includes("win") && !fund_files.windows.version) {
          fund_files.windows.version = tagName;
          fund_files.windows.url = asset.browser_download_url;
        } else if (asset.name.includes("macos") && !fund_files.macos.version) {
          fund_files.macos.version = tagName;
          fund_files.macos.url = asset.browser_download_url;
        } else if (asset.name.includes("linux") && !fund_files.linux.version) {
          fund_files.linux.version = tagName;
          fund_files.linux.url = asset.browser_download_url;
        }
      }
    }

    fund_files.expire_on = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    localStorage.setItem("last_funds", JSON.stringify(fund_files));
    setFundFiles(fund_files);

  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DownloadDataContext.Provider value={{ fundFiles }}>
      {children}
    </DownloadDataContext.Provider>
  );
}

export function useDownloadData() {
  return useContext(DownloadDataContext);
}