import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesTC } from '../redux/categoriesReducer';
import { getShortPostsTC, PostType } from '../redux/postsReducer';
import { ScrollView, Center, Heading, VStack, Button } from 'native-base';
import { getPostTC } from '../redux/filterReducer';
import { AppStateType } from '../redux/store';
import Markdown from 'react-native-markdown-renderer';
import { MarkdownView } from 'react-native-markdown-view'

export default function Main() {
	const categories = useSelector<any, Array<any>>(state => state.categories);
	const dispatch = useDispatch();
	const posts = useSelector<any, Array<any>>(state => state.posts.shortPosts);
	const post = useSelector<AppStateType, PostType>(state => state.filter);

	useEffect(() => {
		dispatch(getCategoriesTC());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getShortPostsTC());
	}, [dispatch]);

	const [currentPage, setCurrentPage] = useState<any>(null);
	const [tempPage, setTempPage] = useState(null);

	if (currentPage !== null && currentPage !== 'read') {
		return (<View style={styles.container} >
			<ScrollView _contentContainerStyle={{
				px: "0px",
				mb: "4",
				minW: "72",
			}} style={{ flex: 1 }}>
				<Center bg="primary.900"><Button px={100} bg="primary.900" onPress={() => { setCurrentPage(null) }}>{'Go to Back'}</Button></Center>
				<Center  ><Heading fontSize="xl" color="black">{currentPage}</Heading></Center>
				<VStack flex="1" space={2}>
					{posts?.map(p => p.category === currentPage &&
						<Button size="sm" key={p._id} onPress={() => { setCurrentPage('read'); dispatch(getPostTC(p._id)) }}>
							<Text>{p.title}</Text>
						</Button>
					)}
				</VStack>
			</ScrollView></View>
		);
	} else if (currentPage === 'read') {
		return (<View style={styles.container} >
			<View style={styles.exampleStyle}>
				<Center position="sticky" bg="primary.900" ><Button px={100} bg="primary.900" onPress={() => { setCurrentPage(tempPage) }}>{'Go to Back'}</Button></Center>
			</View>
			<ScrollView _contentContainerStyle={{
				px: "10px",
				mb: "0",
				minW: "72",
				maxW: "370",
			}} style={{ flex: 1 }}>

				<MarkdownView >{post.text}</MarkdownView>
			</ScrollView></View>
		);
	} else

		return (

			<View style={styles.container} >
				<ScrollView
					_contentContainerStyle={{
						px: "0px",
						mb: "4",
						minW: "72",
					}}
					style={{ flex: 1 }}>
					<VStack space={1}>{categories.map(c =>
						<Button size="sm" key={c._id} onPress={() => { setCurrentPage(c.title); setTempPage(c.title) }}>{c.title}</Button>)}
					</VStack>
				</ScrollView>
			</View>

		);


}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	heading1: {
		fontSize: 22,
	},
	strong: {
		fontSize: 18,
	},
	paragraph: {
		fontSize: 14,
	},
	exampleStyle: {
		position: 'absolute',
		top: 0,
		zIndex: 99
	}
});
