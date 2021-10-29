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
			50: '#ecfeff',
			100: '#cffafe',
			200: '#a5f3fc',
			300: '#67e8f9',
			400: '#22d3ee',
			500: '#06b6d4',
			600: '#0891b2',
			700: '#0e7490',
			800: '#155e75',
			900: '#164e63',
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
