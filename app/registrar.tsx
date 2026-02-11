import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Registrar() {
  const [texto, setTexto] = useState("");
  const [respostaMike, setRespostaMike] = useState("");

  const frasesNeutras = [
    "Tô aqui com você 💛",
    "Um dia de cada vez 🌱",
    "Você tá indo melhor do que imagina ✨",
  ];

  function detectarSentimento(texto: string) {
    const t = texto.toLowerCase();

    const cansaco = ["cans", "exaust", "difícil", "puxado"];
    const felicidade = ["feliz", "alegr", "bom", "ótimo"];
    const tristeza = ["trist", "pra baixo", "desânim", "chatead"];
    const ansiedade = ["ansios", "nervos", "preocup", "medo"];

    if (cansaco.some(p => t.includes(p))) return "cansaco";
    if (felicidade.some(p => t.includes(p))) return "feliz";
    if (tristeza.some(p => t.includes(p))) return "triste";
    if (ansiedade.some(p => t.includes(p))) return "ansioso";

    return "neutro";
  }

  async function salvarDia() {
    if (!texto.trim()) {
      setRespostaMike("Ei… escreve alguma coisinha pra mim 💛");
      return;
    }

    try {
      await AsyncStorage.setItem("registroDia", texto);

      const sentimento = detectarSentimento(texto);

      if (sentimento === "cansaco") {
        setRespostaMike("Hoje foi puxado… mas você foi forte 💪");
      } else if (sentimento === "feliz") {
        setRespostaMike("Que alegria ler isso! ✨");
      } else if (sentimento === "triste") {
        setRespostaMike("Eu tô aqui com você. De verdade 💛");
      } else if (sentimento === "ansioso") {
        setRespostaMike("Respira comigo. Um passo de cada vez 🌱");
      } else {
        const frase =
          frasesNeutras[Math.floor(Math.random() * frasesNeutras.length)];
        setRespostaMike(frase);
      }

      setTexto("");
    } catch (error) {
      setRespostaMike("Ops… tive dificuldade pra salvar 😕");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Como foi seu dia?</Text>

      <TextInput
        style={styles.input}
        placeholder="Escreve aqui… eu tô ouvindo"
        multiline
        value={texto}
        onChangeText={setTexto}
      />

      <TouchableOpacity style={styles.botao} onPress={salvarDia}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>

      {respostaMike !== "" && (
        <SafeAreaView style={styles.cardMike}>
          <Image
            source={require("../assets/images/mike.png")}
            style={styles.mikeImg}
          />
          <Text style={styles.nomeMike}>Mike</Text>
          <Text style={styles.textoMike}>{respostaMike}</Text>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  botao: {
    backgroundColor: "#F4A261",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  botaoTexto: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  cardMike: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  mikeImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  nomeMike: {
    fontWeight: "600",
    marginRight: 6,
  },
  textoMike: {
    flex: 1,
  },
});