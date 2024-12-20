import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  Platform,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_URL } from "@env";

const statusBarHeight = StatusBar.currentHeight;

const genAI = new GoogleGenerativeAI(API_URL);

export default function Index() {
  const [city, setCity] = useState("");
  const [days, setDays] = useState(3);
  const [loading, setLoading] = useState(false);
  const [travel, setTravel] = useState("");

  const handleGenerate = async () => {
    if (city === "") {
      Alert.alert("Atenção", "Preencha o nome da cidade!");
      return;
    }
    setTravel("");
    setLoading(true);
    Keyboard.dismiss();

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Crie um roteiro para uma viagem de exatos ${days} dias na cidade de ${city}, busque por lugares turísticos, lugares mais visitados, seja preciso nos dias de estadia fornecidos e limite o roteiro apenas na cidade fornecida. Forneça apenas em tópicos com nome do local onde ir em cada dia.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const cleanedText = text.replace(/\*/g, "").trim();
      setTravel(cleanedText);
    } catch (error) {
      console.error("Erro ao gerar roteiro:", error);
      Alert.alert(
        "Erro",
        "Não foi possível gerar o roteiro. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={"#f1f1f1"}
      />
      <Text style={styles.heading}>Roteiros Fácil</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Cidade Destino</Text>
        <TextInput
          placeholder="Ex: Porto Seguro, BA"
          style={styles.input}
          onChangeText={(value) => setCity(value)}
          value={city}
        />
        <Text style={styles.label}>
          Tempo de estadia: <Text style={styles.days}> {days} </Text> dias
        </Text>
        <Slider
          minimumValue={1}
          maximumValue={7}
          minimumTrackTintColor="#009688"
          maximumTrackTintColor="#000000"
          value={days}
          onValueChange={(value) => setDays(value)}
          step={1}
        />
      </View>
      <Pressable
        style={styles.button}
        onPress={handleGenerate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Gerar Roteiro</Text>
        <MaterialIcons name="travel-explore" size={24} color={"#fff"} />
      </Pressable>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24, marginTop: 4 }}
        style={styles.containerScroll}
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <View style={styles.content}>
            <Text style={styles.title}>Criando Roteiro...</Text>
            <ActivityIndicator color={"#000"} size={"large"} />
          </View>
        )}

        {travel !== "" && (
          <View style={styles.content}>
            <Text style={styles.title}>Roteiro da viagem 👇</Text>
            <Text style={{ lineHeight: 24 }}>{travel}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    paddingTop: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    paddingTop: Platform.OS === "android" ? statusBarHeight : 54,
  },
  form: {
    backgroundColor: "#FFF",
    width: "90%",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#94a3b8",
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  days: {
    backgroundColor: "#F1f1f1",
  },
  button: {
    backgroundColor: "#FF5656",
    width: "90%",
    borderRadius: 8,
    flexDirection: "row",
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "#FFF",
    padding: 16,
    width: "100%",
    marginTop: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14,
  },
  containerScroll: {
    width: "90%",
    marginTop: 8,
  },
});
