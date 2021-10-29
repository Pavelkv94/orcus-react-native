import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesTC } from '../redux/categoriesReducer';
import { getShortPostsTC } from '../redux/postsReducer';

export default function Main() {
	const categories = useSelector<any, Array<any>>(state => state.categories)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategoriesTC());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getShortPostsTC());
	}, [dispatch]);

	return (

		<View style={styles.container}>
			{categories.map(c => <Text>{c.title}</Text>)}
		</View>

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
