import "../styles/styles.css";

import type { AppProps } from "next/app";
import { store, persistor } from "../state/index";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<main>
					<Component {...pageProps} />
				</main>
				<footer>Object Management System by Frank Arlt 2022.</footer>
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
