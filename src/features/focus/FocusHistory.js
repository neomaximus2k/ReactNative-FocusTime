import React, { useState } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Dimensions,
	ScrollView,
} from "react-native";
import { FontSizes, SpacingSizes } from "../../utils/sizes";
import { Colours } from "../../utils/colors";
import { RoundedButton } from "../../components/RoundedButton";

export const FocusHistoryList = ({
	focusHistory,
	OnClear,
	onViewFocusItem,
	onRemoveFocusItem,
}) => {
	const HistoryItem = ({ item, idx }) => {
		return (
			<TouchableOpacity
				onPress={() => {
					onViewFocusItem(item);
				}}
				style={styles.FocusHistoryItem}
			>
				<Text style={historyItemStyles(item.Status)}>
					{item.Subject}{" "}
				</Text>
				<RoundedButton
					onPress={() => {
						onRemoveFocusItem(item);
					}}
					isIconButton={true}
					IconButton={{
						ButtonStyle: "AntDesign",
						Name: "delete",
						Size: 15,
					}}
					size={25}
				/>
			</TouchableOpacity>
		);
	};

	const ClearHistory = () => {
		OnClear();
	};

	return (
		<>
			<SafeAreaView style={{ flex: 0.75, alignItems: "center" }}>
				{!!focusHistory.length && (
					<>
						<Text style={styles.title}>Focus list:</Text>
						<FlatList
							style={{
								flex: 1,
								width: "100%",
							}}
							contentContainerStyle={{
								/*flex: 1,*/
								alignItems: "center",
								alignItems: "center",
								justifyContent: "center",
							}}
							data={focusHistory}
							renderItem={HistoryItem}
						/>

						<View style={styles.clearContainer}>
							<RoundedButton
								size={75}
								title="Clear"
								onPress={() => OnClear()}
							/>
						</View>
					</>
				)}
				{!focusHistory.length && (
					<Text style={styles.title}>Nothing to focus on.</Text>
				)}
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		color: "white",
		fontSize: FontSizes.lg,
	},
	clearContainer: {
		alignItems: "center",
		padding: SpacingSizes.md,
	},
	FocusHistoryItem: {
		width: Dimensions.get("window").width - 10,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		margin: 5,
		padding: 10,
		backgroundColor: "rgba(255, 255, 255, 0.1)",
	},
});
const historyItemStyles = (status) => ({
	color: status > 1 ? "red" : "green",
	fontSize: 15,
	marginRight: 10,
});
