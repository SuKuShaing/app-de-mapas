import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface Props extends PressableProps {
    children: string;
}

/**
 * Este archivo es un componente Pressable con estilos, hay que pasarle el texto obligatoriamente
 * y la función onPress es opcional mente deseable
 * @param children - El texto que se mostrará en el botón
 * @param rest - El resto de propiedades que ocupa el componente Pressable
 * @returns Un componente Pressable con estilos
 */
const ThemePressable = ({ children, ...rest }: Props) => {
	return (
		<Pressable style={styles.btnPrimary} {...rest}>
			<Text style={{ color: "white" }}>{children}</Text>
		</Pressable>
	);
};

export default ThemePressable;



const styles = StyleSheet.create({
	btnPrimary: {
		backgroundColor: "black",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 100,
		margin: 10,
	},
});
