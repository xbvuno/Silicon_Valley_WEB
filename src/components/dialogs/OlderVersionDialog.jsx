import { useDialog } from "../../contexts/DialogContext.jsx";

function OlderVersionDialog() {
  const { dialog, closeDialog, downloadFile } = useDialog();
  return (
    <dialog className='popup' open={dialog.olderVersion}>
      <article>
        <section>
          <h2 className='sv-chap-title'>PRIMA DI SCARICARE...</h2>
          <h4 className='sv-chap-sub'>⚠️ Non è la versione più recente! ⚠️</h4>
          <p>
            Per questione di testing, non lasciamo sempre
            disponibili release per versioni diverse da Windows
          </p>
          <p>
            Ti invitiamo a scriverci sul nostro{" "}
            <a href='https://discord.gg/MzqeXAHpfu'>discord</a> e
            chiedere la build più recente per il tuo sistema operativo!
          </p>
        </section>
        <div className='buttons'>
          <button className='go-back' onClick={() => closeDialog("olderVersion")}>
            Chiudi
          </button>
          <button className='download' onClick={downloadFile}>
                    Scarica comunque
            </button>
        </div>
      </article>
    </dialog>
  );
}

export default OlderVersionDialog;