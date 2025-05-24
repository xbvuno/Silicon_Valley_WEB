import { marked } from 'marked'
import { useDownloadData } from '../../contexts/DownloadDataContext.jsx'

export default function ChangelogSection() {
	const { fundFiles } = useDownloadData();

	function renderChangelog() {
        if (!fundFiles || !fundFiles.change_log) {
            return
        }
        
		let array = [];
		for (const tag in fundFiles.change_log) {
			array.push(marked(fundFiles.change_log[tag]));
		}
		return array.join("<hr/>");
	}

	return (
		<section className='changelog'>
			<h2 className='sv-chap-title'>Changelog</h2>
			<div dangerouslySetInnerHTML={{ __html: renderChangelog() }} />
		</section>
	);
}
