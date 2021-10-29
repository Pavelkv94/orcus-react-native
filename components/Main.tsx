import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesTC } from '../redux/categoriesReducer';
import { getShortPostsTC, PostType } from '../redux/postsReducer';
import { NativeBaseProvider, Box, extendTheme, Menu, HamburgerIcon, ScrollView, Center, Heading, VStack, Button } from 'native-base';
import { getPostTC } from '../redux/filterReducer';
import { AppStateType } from '../redux/store';
import Markdown from 'react-native-markdown-text'

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
	// const [currentArticle, setCurrentArticle] = useState(null);

	if (currentPage !== null && currentPage !== 'read') {
		return (<View style={styles.container} >
			<ScrollView _contentContainerStyle={{
				px: "20px",
				mb: "4",
				minW: "72",
			}} style={{ flex: 1, paddingTop: '0px' }}>

				<Center  bg="primary.300" >
					<Menu
						// closeOnSelect={false}
						w="190"
						onOpen={() => console.log("opened")}
						onClose={() => console.log("closed")}
						trigger={(triggerProps) => {
							return (
								<Pressable {...triggerProps}>
									<HamburgerIcon />
								</Pressable>
							)
						}}
					>
						{categories?.map(c => <Menu.Item bg="primary.500" key={c._id} onPress={() => { setCurrentPage(c.title); console.log(c.title) }}>{c.title}</Menu.Item>)}
					</Menu>
					
				</Center>
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
			<ScrollView _contentContainerStyle={{
				px: "10px",
				mb: "0",
				minW: "72",
			}} style={{ flex: 1 }}>

				<Center bg="primary.300" >

					<Menu
						// closeOnSelect={false}
						w="190"
						onOpen={() => console.log("opened")}
						onClose={() => console.log("closed")}
						trigger={(triggerProps) => {
							return (
								<Pressable {...triggerProps}>
									<HamburgerIcon />
								</Pressable>
							)
						}}
					>
						{categories.map(c => <Menu.Item bg="primary.500" key={c._id} onPress={() => { setCurrentPage(c.title); console.log(c.title) }}>{c.title}</Menu.Item>)}
					</Menu>

				</Center>
				<Markdown styles={styles}>{post.text}</Markdown>
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
					<VStack space={1}>{categories.map(c => <Button size="sm" key={c._id} onPress={() => { setCurrentPage(c.title); console.log(c.title) }}>{c.title}</Button>)}
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
});
