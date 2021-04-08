import logo from './logo.svg';
import './App.css';
import Property from './Property';
import { classes } from './utils';

function App() {
	const baseCls = 'App';

	return (
		<div className={baseCls}>
			<header className={`${baseCls}__header`}>
				<h1
					className={classes(
						`${baseCls}__header__logo`,
						'text-4xl',
						'md:text-8xl',
						'font-black',
						'text-left',
						'mx-8',
						'border-b-2',
						'md:border-b-4',
						'border-black'
					)}
				>
					Home<span className={classes('text-gray-400')}>Ex</span>
				</h1>
			</header>
			<main className={classes(`${baseCls}__main`, 'm-8')}>
				<Property />
			</main>
			<footer className={`${baseCls}__footer`}>
				<h6
					className={classes(
						`${baseCls}__footer__copyright`,
						'text-left',
						'm-8',
						'border-t-2',
						'border-black'
					)}
				>
					HomeEx demo by Brian Wolk
				</h6>
			</footer>
		</div>
	);
}

export default App;
