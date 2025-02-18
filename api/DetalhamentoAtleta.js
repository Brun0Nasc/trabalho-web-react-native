import React, { useRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import mockAtleta from "../api/mockAtleta";
import VideoPlayer from "react-native-video-player";

function DetalharAtleta({ route }) {
  const { player } = route?.params || mockAtleta;

  const renderCardAtleta = () => (
    <View style={styles.card}>
      <Image source={{ uri: player.headshotUrl }} style={styles.image} />
      <Text style={styles.name}>
        {player.firstName} {player.lastName}
      </Text>

      <View>
        <Text>
          <Text style={styles.label}>Altura:</Text> {player.height}
        </Text>
        <Text>
          <Text style={styles.label}>Peso:</Text> {player.weight}
        </Text>
        <Text>
          <Text style={styles.label}>Posições:</Text> {player.positions}
        </Text>
        <Text>
          <Text style={styles.label}>Data de Nascimento:</Text>{" "}
          {player.dateBorn}
        </Text>
        <Text>
          <Text style={styles.label}>Lugar de Nascimento:</Text>{" "}
          {player.birthPlace}
        </Text>
        <Text>
          <Text style={styles.label}>Draft:</Text> {player.draftInfo}
        </Text>
      </View>
    </View>
  );

  const playerRef = useRef(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Jogador</Text>

      <View>
        {renderCardAtleta()}
        <VideoPlayer
          ref={playerRef}
          endWithThumbnail
          thumbnail={{
            uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
          }}
          source={{
            uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          }}
          onError={(e) => console.log(e)}
          showDuration={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
  },
  error: {
    color: "red",
  },
  card: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    elevation: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
});

export default DetalharAtleta;
