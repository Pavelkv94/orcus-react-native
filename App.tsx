import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Main from './components/Main';
import { store } from './redux/store';

export default function App() {

	return (
		<Provider store={store}>
			<SafeAreaView style={styles.container}>
				<Main />
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
