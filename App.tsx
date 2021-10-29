import { extendTheme, NativeBaseProvider } from 'native-base';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Main from './components/Main';
import { store } from './redux/store';


const theme = extendTheme({
	colors: {
		// Add new color
		primary: {
			50: '#fafafa',
			100: '#f5f5f5',
			200: '#e5e5e5',
			300: '#d4d4d4',
			400: '#a3a3a3',
			500: '#737373',
			600: '#525252',
			700: '#404040',
			800: '#262626',
			900: '#171717',
		},
		// Redefinig only one shade, rest of the color will remain same.
		amber: {
			400: '#d97706',
		},
	},
	config: {
		// Changing initialColorMode to 'dark'
		initialColorMode: 'dark',
	},
});

export default function App() {

	return (
		<Provider store={store}>
			<SafeAreaView style={styles.container}>
				<NativeBaseProvider theme={theme}>
					<Main />
				</NativeBaseProvider>
			</SafeAreaView>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
