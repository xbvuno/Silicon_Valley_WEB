import { useDialog } from "../../contexts/DialogContext.jsx";

function WindowsSmartScreenDialog() {
	const { dialog, closeDialog, downloadFile } = useDialog();
	return (
		<dialog className='popup' open={dialog.smartScreen}>
			<article>
				<section>
					<h2 className='sv-chap-title'>⚠️ ATTENZIONE! ⚠️</h2>
					<h4 className='sv-chap-sub'>
						🦠 Riguardo a questo avviso! 🦠
					</h4>
					<p>
						<b>Windows</b> proverà a bloccare l'esecuzione del gioco
						tramite <b>SmartScreen</b>{" "}
					</p>
					<details>
						<summary>Perchè succede questo?</summary>
						<div>
							<p>
								<b>Windows</b> richiede ad ogni produttore di
								software una <b>'firma'</b> che convalida{" "}
								<b>la sicurezza del programma</b>.
							</p>
							<p>
								Richiedere questa 'firma' è <b>costoso</b>, e
								dato che il nostro gioco è sviluppato a costo
								zero, non possiamo permettercelo.
							</p>
						</div>
					</details>

					<details>
						<summary>come disattivare SmartScreen</summary>
						<div>
							<p>Avvia l'eseguibile appena scaricato</p>
							<img
								src='media/img/win_smartscreen/step1.jpg'
								alt='windows smartscreen step 1'
							/>
							<p>
								Premendo su <b>Ulteriori informazioni</b>{" "}
								apparirà il tasto <b>Esegui comunque</b>:
							</p>
							<img
								src='media/img/win_smartscreen/step2.jpg'
								alt='windows smartscreen step 2'
							/>
							<p>E ora dovresti riuscire ad avviarlo.</p>
						</div>
					</details>
					<p>
						Il gioco è <b>open-source</b>, è possibile aprire il{" "}
						<a href='https://github.com/xbvuno/Silicon_Valley_RW'>
							progetto
						</a>{" "}
						con <b>Godot</b> e provarlo senza utilizzare le nostre
						build
					</p>
				</section>
				<div className='buttons'>
					<button
						className='go-back'
						onClick={() => closeDialog("smartScreen")}
					>
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

export default WindowsSmartScreenDialog;
