import { useDialog } from "../../contexts/DialogContext.jsx";
import { useDownloadData } from "../../contexts/DownloadDataContext.jsx";

import "./.styles/DownloadsSection.css";
import WindowsSmartScreenDialog from "../dialogs/WindowsSmartScreenDialog.jsx";
import NormalDownloadDialog from "../dialogs/NormalDownloadDialog.jsx";
import OlderVersionDialog from "../dialogs/OlderVersionDialog.jsx";

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
	const { openDialog, setDownloadUrl } = useDialog();
	const { fundFiles } = useDownloadData();

	function renderWindows() {
		if (!fundFiles.windows.url) return;
		function handleClick() {
			setDownloadUrl(fundFiles.windows.url);
			openDialog("smartScreen");
		}
		return (
			<WindowsArticle
				onClick={handleClick}
				version={fundFiles.windows.version}
			/>
		);
	}

	function renderMacOS() {
		if (!fundFiles.macos.url) return;
		function handleClick() {
			setDownloadUrl(fundFiles.macos.url);
			if (fundFiles.macos.version !== fundFiles.latest_tag) {
				openDialog("olderVersion");
			} else {
				openDialog("normalDownload");
			}
		}
		return (
			<article onClick={handleClick}>
				<div className='title'>
					<h2 className='sv-chap-sub'>MacOS</h2>
					<p className='sv-chap-sub'></p>
				</div>
				<img src='/media/svg/platforms/macos.svg' alt='macos logo' />
				<p>{fundFiles.macos.version}</p>
			</article>
		);
	}

	function renderLinux() {
		if (!fundFiles.linux.url) return;
		function handleClick() {
			setDownloadUrl(fundFiles.linux.url);
			if (fundFiles.linux.version !== fundFiles.latest_tag) {
				openDialog("olderVersion");
			} else {
				openDialog("normalDownload");
			}
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

	return (
		<>
			<WindowsSmartScreenDialog />
			<OlderVersionDialog />
			<NormalDownloadDialog />
			<section>
				<h2 className='sv-chap-title'>DOWNLOADS</h2>
				<h2 className='sv-chap-title'>
					Prova ora una delle nostre beta!
				</h2>
				<p>
					Abbiamo deciso di rilasciare delle demo libere che
					rispecchiano lo stato dello sviluppo del gioco.
				</p>
				<section className='download'>
					{renderWindows()}
					{renderMacOS()}
					{renderLinux()}
				</section>
			</section>
		</>
	);
}

export default DownloadArticlesContainer;
