import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/mike.png")}
        style={styles.image}
      />

      <Text style={styles.title}>Oi, eu sou o Mike</Text>

      <Text style={styles.subtitle}>
        Vou te ajudar a cuidar do seu pet todos os dias
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/registrar")}
      >
        <Text style={styles.buttonText}>Vamos começar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#F4A261",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
});