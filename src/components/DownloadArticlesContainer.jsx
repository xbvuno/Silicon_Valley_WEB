import { useState, useEffect } from "react";
import { marked } from 'marked'
import "./DownloadArticlesContainer.css";

const downloadFile = (url) => {
	const link = document.createElement("a");
	link.href = url;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

function WindowsSmartScreenDialog(props) {
	return (
		<dialog className='popup' open={props.isOpen}>
			<article>
				<section>
					<h2 className='sv-chap-title'>NON TI PREOCCUPARE!</h2>
					<h4 className='sv-chap-sub'>
						🦠 Questo gioco non è un virus! 🦠
					</h4>
					<p>
						<b>Windows</b> richiede ad ogni produttore di software
						una <b>'firma'</b> che convalida{" "}
						<b>la sicurezza del programma</b>.
					</p>
					<p>
						Richiedere un certificato è <b>costoso</b>, e dato che
						il nostro gioco è sviluppato a costo zero, non possiamo
						permettercelo.
					</p>
					<details className='outline secondary'>
						<summary>come disattivare Windows SmartScreen</summary>
						<p>Avvia l'eseguibile come lo scarichi</p>
						<img
							src='media/img/win_smartscreen/step1.jpg'
							alt='windows smartscreen step 1'
						/>
						<p>
							Premendo su <b>Ulteriori informazioni</b> apparirà
							il tasto <br /> <b>Esegui comunque</b>:
						</p>
						<img
							src='media/img/win_smartscreen/step2.jpg'
							alt='windows smartscreen step 2'
						/>
						<p>E ora dovresti riuscire ad avviarlo.</p>
					</details>
					<p>
						Il gioco è <b>open-source</b>, è possibile aprire il{" "}
						<a href='https://github.com/xbvuno/Silicon_Valley_RW'>
							progetto
						</a>{" "}
						con <b>Godot</b> e provarlo senza utilizzare le nostre
						build
					</p>
					<p>
						<b>
							Il download dovrebbe partire in automatico a momenti
						</b>
					</p>
				</section>
				<div className='buttons'>
					<button
						className='go-back'
						onClick={() => props.setOpen(false)}
					>
						Chiudi
					</button>
				</div>
			</article>
		</dialog>
	);
}

function NormalDownloadDialog(props) {
	return (
		<dialog className='popup' open={props.isOpen}>
			<article>
				<section>
					<h2 className='sv-chap-title'>Download in corso!</h2>
					<h4 className='sv-chap-sub'>🎉 FACCI SAPERE! 🎉</h4>
					<p>
						<b>
							Il download dovrebbe partire in automatico a momenti
						</b>
					</p>
					<p>
						Facci sapere cosa ne pensi sul nostro{" "}
						<a href='https://discord.gg/MzqeXAHpfu'>discord</a>!
					</p>
				</section>
				<div className='buttons'>
					<button
						className='go-back'
						onClick={() => props.setOpen(false)}
					>
						Chiudi
					</button>
				</div>
			</article>
		</dialog>
	);
}

function OlderVersionDialog(props) {
	return (
		<dialog className='popup' open={props.isOpen}>
			<article>
				<section>
					<h2 className='sv-chap-title'>Download in corso!</h2>
					<h4 className='sv-chap-sub'>
						⚠️ ATTENZIONE: Non è la versione più recente! ⚠️
					</h4>
					<p>
						<b>
							Il download dovrebbe partire in automatico a momenti
						</b>
					</p>
					<p>
						Per questione di testing, non lasciamo sempre
						disponibili release per versioni diverse da Windows
					</p>
					<p>
						Ti invitiamo a scriverci sul nostro{" "}
						<a href='https://discord.gg/MzqeXAHpfu'>discord</a> e
						chiedere la build più recente per il tuo sistema
						operativo!
					</p>
				</section>
				<div className='buttons'>
					<button
						className='go-back'
						onClick={() => props.setOpen(false)}
					>
						Chiudi
					</button>
				</div>
			</article>
		</dialog>
	);
}

function WindowsArticle(props) {
	return (
		<article onClick={props.onClick}>
			<div className='title'>
				<h2 className='sv-chap-sub'>Windows</h2>
				<p className='sv-chap-sub'>x64, x86</p>
			</div>
			<img src='media/svg/platforms/windows.svg' alt='windows logo' />
			<p>{props.version}</p>
		</article>
	);
}

function DownloadArticlesContainer() {
	const [isSmartScreenDialogOpen, setSmartScreenDialogOpen] = useState(false);
	const [isOlderVersionDialogOpen, setOlderVersionDialogOpen] =
		useState(false);
	const [isNormalDownloadDialogOpen, setNormalDownloadDialogOpen] =
		useState(false);
	const [fundFiles, setFundFiles] = useState({
		change_log: {},
		latest_tag: "",
		windows: {
			version: "",
			url: "",
		},
		macos: {
			version: "",
			url: "",
		},
		linux: {
			version: "",
			url: "",
		},
	});

	async function fetchData() {
		const repo = "xbvuno/Silicon_Valley_RW";

		let fund_files = {
			expire_on: "",
			change_log: {},
			latest_tag: "",
			windows: {
				version: "",
				url: "",
			},
			macos: {
				version: "",
				url: "",
			},
			linux: {
				version: "",
				url: "",
			},
		};

		let tags = await fetch(
			`https://api.github.com/repos/${repo}/tags`
		).then((response) => response.json());

		fund_files.latest_tag = tags[0].name;

		const cached = localStorage.getItem("last_funds");
		if (cached) {
			console.log("trovati file nella cache");
			const cached_json = JSON.parse(cached);

			if (
				cached_json.expire_on &&
				new Date(cached_json.expire_on) > new Date()
			) {
				if (
					cached_json.latest_tag &&
					cached_json.latest_tag == fund_files.latest_tag
				) {
					console.log("stessa versione trovata!, recupero i file");
					setFundFiles(cached_json);
					return;
				}
			} else {
				console.log("cache scaduta, rimuovo i file");
			}
		}
		for (const tag of tags) {
			const tagName = tag.name;
			if (
				fund_files.windows.version &&
				fund_files.macos.version &&
				fund_files.linux.version
			) {
				break;
			}
			let release = await fetch(
				`https://api.github.com/repos/${repo}/releases/tags/${tagName}`
			)
				.then((res) => {
					if (!res.ok) {
						throw new Error(
							`Release non trovata per il tag: ${tagName}`
						);
					}
					return res.json();
				})
				.catch((err) => {
					console.warn(
						`⚠️ Nessuna release associata al tag ${tagName}.`
					);
				});
			if (!release) continue;
			fund_files.change_log[tagName] = release.body;
			for (const asset of release.assets) {
				if (asset.name.includes("win") && !fund_files.windows.version) {
					fund_files.windows.version = tagName;
					fund_files.windows.url = asset.browser_download_url;
				} else if (
					asset.name.includes("macos") &&
					!fund_files.macos.version
				) {
					fund_files.macos.version = tagName;
					fund_files.macos.url = asset.browser_download_url;
				} else if (
					asset.name.includes("linux") &&
					!fund_files.linux.version
				) {
					fund_files.linux.version = tagName;
					fund_files.linux.url = asset.browser_download_url;
				}
			}
		}
		(fund_files.expire_on = new Date(
			new Date().getTime() + 60 * 60 * 1000
		).toISOString()), // ora + 1 ora
			setFundFiles(fund_files);
		localStorage.setItem("last_funds", JSON.stringify(fund_files));
	}

	useEffect(() => {
		fetchData();
	}, []);

	function renderWindows() {
		if (!fundFiles.windows.url) return;
		function handleClick() {
			setSmartScreenDialogOpen(true);
			downloadFile(fundFiles.windows.url);
		}
		return (
			<>
				<WindowsArticle
					onClick={handleClick}
					version={fundFiles.windows.version}
				/>
			</>
		);
	}

	function renderMacOS() {
		if (!fundFiles.macos.url) return;
		function handleClick() {
			if (fundFiles.macos.version != fundFiles.latest_tag) {
				setOlderVersionDialogOpen(true);
			} else {
				setNormalDownloadDialogOpen(true);
			}
			downloadFile(fundFiles.macos.url);
		}
		return (
			<article onClick={handleClick}>
				<div className='title'>
					<h2 className='sv-chap-sub'>MacOS</h2>
					<p className='sv-chap-sub'></p>
				</div>
				<img src='media/svg/platforms/macos.svg' alt='macos logo' />
				<p>{fundFiles.macos.version}</p>
			</article>
		);
	}

	function renderLinux() {
		if (!fundFiles.linux.url) return;
		function handleClick() {
			if (fundFiles.linux.version != fundFiles.latest_tag) {
				setOlderVersionDialogOpen(true);
			} else {
				setNormalDownloadDialogOpen(true);
			}
			downloadFile(fundFiles.linux.url);
		}
		return (
			<article onClick={handleClick}>
				<div className='title'>
					<h2 className='sv-chap-sub'>Linux</h2>
					<p className='sv-chap-sub'></p>
				</div>
				<img src='media/svg/platforms/linux.svg' alt='linux logo' />
				<p>{fundFiles.linux.version}</p>
			</article>
		);
	}

	function renderChangelog() {
		let array = [];
		for (const tag in fundFiles.change_log) {
			array.push(marked(
				fundFiles.change_log[tag]
			))
		}
		return array.join("<hr/>");
	}
	return (
		<>
			<WindowsSmartScreenDialog
				isOpen={isSmartScreenDialogOpen}
				setOpen={setSmartScreenDialogOpen}
			/>
			<OlderVersionDialog
				isOpen={isOlderVersionDialogOpen}
				setOpen={setOlderVersionDialogOpen}
			/>
			<NormalDownloadDialog
				isOpen={isNormalDownloadDialogOpen}
				setOpen={setNormalDownloadDialogOpen}
			/>
			<section className='download'>
				{renderWindows()}
				{renderMacOS()}
				{renderLinux()}
			</section>
			<section className='changelog'>
				<h1>Changelog</h1><hr/>
				<div dangerouslySetInnerHTML={{ __html: renderChangelog() }} />
			</section>
			
		</>
	);
}

export default DownloadArticlesContainer;
