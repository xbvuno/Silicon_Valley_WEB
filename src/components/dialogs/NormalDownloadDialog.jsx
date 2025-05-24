import { useEffect } from "react";
import { useDialog } from "../../contexts/DialogContext.jsx";

function NormalDownloadDialog() {
  const { dialog, closeDialog, downloadFile } = useDialog();

  useEffect(() => {
    if (!dialog.normalDownload) return;
    setTimeout(() => {
        downloadFile();
    }, 1000);
  }, [dialog]);

  return (
    <dialog className='popup' open={dialog.normalDownload}>
      <article>
        <section>
          <h2 className='sv-chap-title'>Download in corso!</h2>
          <h4 className='sv-chap-sub'>🎉 FACCI SAPERE! 🎉</h4>
          <p>
            <b>Il download dovrebbe partire in automatico a momenti</b>
          </p>
          <p>
            Facci sapere cosa ne pensi sul nostro{" "}
            <a href='https://discord.gg/MzqeXAHpfu'>discord</a>!
          </p>
        </section>
        <div className='buttons'>
          <button className='go-back' onClick={() => closeDialog("normalDownload")}>
            Chiudi
          </button>
        </div>
      </article>
    </dialog>
  );
}

export default NormalDownloadDialog;