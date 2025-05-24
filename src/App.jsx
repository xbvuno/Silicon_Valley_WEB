import "./assets/themes/white_on_black/load.scss";
import "./App.scss";
import SplashSection from "./components/sections/SplashSection";
import DownloadsSection from "./components/sections/DownloadsSection";
import LinksSection from "./components/sections/LinksSection";
import ChangelogSection from "./components/sections/ChangelogSection";

function App() {
	return (
		<>
			<SplashSection />
			<main>
				<DownloadsSection />
				<ChangelogSection />
				<LinksSection />
			</main>
		</>
	);
}

export default App;
