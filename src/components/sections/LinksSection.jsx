export default function LinksSection() {
	return (
		<section className='links'>
			<h2 className='sv-chap-title'>LINKS</h2>
			<h2 className='sv-chap-title'>FACCI SAPERE COSA NE PENSI!</h2>

			<div className='centered-button'>
				<p>
					Se hai domande, suggerimenti o vuoi semplicemente farci
					sapere <br />
					cosa ne pensi, puoi trovarci su Discord
				</p>
				<button>
					<a
						className='sv-chap-title'
						href='https://discord.gg/MzqeXAHpfu'
					>
						DISCORD
					</a>
				</button>
			</div>
			<h2 className='sv-chap-title'>UN PROGETTO OPEN-SOURCE</h2>

			<div className='centered-button'>
				<p>
					Abbiamo deciso di sviluppare Silicon Valley con Godot Game
					Engine, <br />
					puoi trovare tutti i file liberamente nella nostra repo di
					Github
				</p>
				<button>
					<a
						className='sv-chap-title'
						href='https://github.com/xbvuno/Silicon_Valley_RW'
					>
						GITHUB
					</a>
				</button>
			</div>
		</section>
	);
}
