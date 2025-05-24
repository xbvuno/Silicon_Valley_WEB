import { createContext, useContext, useState } from "react";

const DialogContext = createContext();



export function DialogProvider({ children }) {
  const [dialog, setDialog] = useState({
    smartScreen: false,
    olderVersion: false,
    normalDownload: false,
  });

  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [downloadUrl, setDownloadUrl] = useState("");

  const openDialog = (type) => setDialog((d) => ({ ...d, [type]: true }));
  const closeDialog = (type) => setDialog((d) => ({ ...d, [type]: false }));

  return (
    <DialogContext.Provider value={{ dialog, openDialog, closeDialog, downloadUrl, setDownloadUrl, downloadFile }}>
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  return useContext(DialogContext);
}