import { useEffect, useState } from "react";
import "./assets/white_on_black/load.scss";
import "./App.scss";
import Banner from "./components/Banner";
import Header from "./components/Header";
import DownloadArticlesContainer from "./components/DownloadArticlesContainer";



function App() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		// fetchData();
		let file_fund = {
			latest_tag: "v0.1.1",
			windows: {
				version: "v0.1.1",
				url: "https://github.com/xbvuno/Silicon_Valley_RW/releases/download/v0.1.1/silicon_valley-v0_1_1-win_x86_64.exe",
			},
			macos: {
				version: "v0.1.0",
				url: "https://github.com/xbvuno/Silicon_Valley_RW/releases/download/v0.1.0/silicon_valley-v0_1_0-macos.zip",
			},
			linux: {
				version: "v0.1.0",
				url: "https://github.com/xbvuno/Silicon_Valley_RW/releases/download/v0.1.0/silicon_valley-v0_1_0-linux.zip",
			},
		};
	}, []);

	return (
		<>
			<Banner />
			<Header />
			<main>
				<section>
					<h2 className='sv-chap-title'>
						Prova ora una delle nostre beta!
					</h2>
					<p>
						Abbiamo deciso di rilasciare delle demo libere che
						rispecchiano lo stato dello sviluppo del gioco.
					</p>
				</section>
        <DownloadArticlesContainer/>
        <section>
          <h2 className='sv-chap-title'>
						FACCI SAPERE COSA NE PENSI!
					</h2>
          <p>
            Se hai domande, suggerimenti o vuoi semplicemente farci sapere <br/>
            cosa ne pensi, puoi trovarci su Discord
          </p>
          <div class='centered-button'>
            <button><a className="sv-chap-title" href="https://discord.gg/MzqeXAHpfu">DISCORD</a></button>
          </div>
          
        </section>
        <section>
          <h2 className='sv-chap-title'>
						UN PROGETTO OPEN-SOURCE
					</h2>
          <p>
            Abbiamo deciso di sviluppare Silicon Valley con Godot Game Engine, <br/>puoi trovare tutti i file liberamente nella nostra repo di Github
          </p>
          <div class='centered-button'>
            <button><a className="sv-chap-title" href="https://github.com/xbvuno/Silicon_Valley_RW">GITHUB</a></button>
          </div>
          
        </section>
			</main>
		</>
	);
}

export default App;
