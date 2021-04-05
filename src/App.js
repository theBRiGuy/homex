import logo from './logo.svg';
import './App.css';
import Property from './Property';
import { classes } from './utils';

function App() {
	const baseCls = 'App';

	return (
		<div className={baseCls}>
			<header className={`${baseCls}__header`}></header>
			<main className={classes(`${baseCls}__main`, 'm-8')}>
				<Property />
			</main>
			<footer className="App__footer"></footer>
		</div>
	);
}

export default App;
