import React, { useState, useEffect } from "react";
import axios from 'axios';
import {View, ScrollView, TouchableOpacity, Text, TextInput} from 'react-native';
import { useNavigation } from "@react-navigation/native";

function Atletas() {
  const navigation = useNavigation()
  const [searchFirstname, setSearchFirstname] = useState('');
  const [searchLastname, setSearchLastname] = useState('');
  const [players, setPlayers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]); // Jogadores favoritos
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false); // Exibe apenas favoritos
  const [isSearchActive, setIsSearchActive] = useState(false);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://basketball-head.p.rapidapi.com/players',
        {pageSize: 100},
        {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': 'a86352a756msha65e7eb2793af2cp1274c9jsndeeb64aaf510',
            'X-RapidAPI-Host': 'basketball-head.p.rapidapi.com',
          },
        }
      )

      setPlayers(response.data.body);
    } catch (err) {
      setError('Erro ao buscar jogadores: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchPlayers = async () => {
    if (!searchFirstname && !searchLastname) {
      alert('Por favor, insira pelo menos um critério de busca.');
      return;
    };

    setLoading(true);
    try {
      const response = await axios.post(
        'https://basketball-head.p.rapidapi.com/players/search',
        {
          pageSize: 100,
          firstname: searchFirstname,
          lastname: searchLastname,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': 'a86352a756msha65e7eb2793af2cp1274c9jsndeeb64aaf510',
            'X-RapidAPI-Host': 'basketball-head.p.rapidapi.com',
          },
        }
      );

      setSearchResults(response.data.body);
      setIsSearchActive(true);
    } catch (err) {
      setError('Erro ao buscar jogadores: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const clearSearch = () => {
    setSearchFirstname('');
    setSearchLastname('');
    setSearchResults(players);
    setIsSearchActive(false); // Desativa a pesquisa
  };

  const toggleFavorite = (player) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.playerId === player.playerId)) {
        return prevFavorites.filter((fav) => fav.playerId !== player.playerId);
      } else {
        return [...prevFavorites, player];
      }
    });
  };

  const toggleShowFavorites = () => {
    setShowOnlyFavorites((prev) => !prev);
  };

  const renderCardAtleta = (player) => {
    const isFavorite = favorites.some((fav) => fav.playerId === player.playerId);

    return (
      <TouchableOpacity
        onPress={()=>navigation.push('Detalhamento', {player})}
        key={player.playerId}
        style={{
          border: '2px solid #ddd',
          borderRadius: '10px',
          padding: '15px',
          margin: '10px',
          maxWidth: '200px',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f9f9f9',
          alignItems: 'center'
        }}
      >
        <img
          src={player.headshotUrl}
          alt={`${player.firstName} ${player.lastName}`}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '10px',
          }}
        />
        <Text style={{ fontSize: '1em', margin: '10px 0', fontWeight: 'bold' }}>
          {player.firstName} {player.lastName}
        </Text>
        <View>
            <Text><Text style={{ fontWeight: 'bold'}}>Altura:</Text> {player.height}</Text>
            <Text><Text style={{ fontWeight: 'bold'}}>Peso:</Text> {player.weight}</Text>
            <Text><Text style={{ fontWeight: 'bold'}}>Posições:</Text> {player.positions}</Text>
            <Text><Text style={{ fontWeight: 'bold'}}>Data de Nascimento:</Text> {player.dateBorn}</Text>
            <Text><Text style={{ fontWeight: 'bold'}}>Lugar de Nascimento:</Text> {player.birthPlace}</Text>
            <Text><Text style={{ fontWeight: 'bold'}}>Draft:</Text> {player.draftInfo}</Text>
        </View>
        <TouchableOpacity
          onPress={() => toggleFavorite(player)}
          style={{
            paddingHorizontal: 5,
            paddingVertical: 10,
            backgroundColor: isFavorite ? 'red' : 'green',
            border: 'none',
            borderRadius: '5px',
            marginTop: 10
          }}
        >
          <Text style={{color: 'white', fontWeight: 'bold'}}>{isFavorite ? 'Remover dos Favoritos' : 'Favoritar'}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    )};

  if (loading) return <Text>Carregando jogadores...</Text>;
  if (error) return <Text>Erro ao carregar dados: {error}</Text>;

  // Decide quais jogadores exibir com base no estado atual
  const jogadoresExibidos = showOnlyFavorites
    ? favorites
    : (searchFirstname || searchLastname) && isSearchActive
    ? searchResults
    : players;

  return (
    <View style={{ margin: 5,  flex: 1}}>
      <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginBottom: 15}}>Figurinhas de Jogadores de Basquete</Text>

      {loading && <Text>Carregando...</Text>}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {/* Formulário de pesquisa */}
      <View style={{ marginBottom: '20px' }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Pesquisar Jogador</Text>
        <View style={{flexDirection: 'row'}}>
            <TextInput
            type="text"
            placeholder="Nome"
            value={searchFirstname}
            onChangeText={setSearchFirstname}
            style={{ borderWidth: 1, borderRadius: 6, paddingHorizontal: 4, paddingVertical: 2, flex: 1, marginRight: 2 }}
            placeholderTextColor={'#999'}
            />
            <TextInput
            type="text"
            placeholder="Sobrenome"
            value={searchLastname}
            onChangeText={setSearchLastname}
            placeholderTextColor={'#999'}
            style={{ borderWidth: 1, borderRadius: 6, paddingHorizontal: 4, paddingVertical: 2, flex: 1 }}
            />
        </View>
        <View style={{ flexDirection: 'row'}}>
            <TouchableOpacity 
            onPress={searchPlayers}
            style={{
                paddingHorizontal: 5,
                paddingVertical: 10,
                backgroundColor: '#007bff',
                border: 'none',
                borderRadius: '5px',
                marginTop: 10,
                flex: 1,
                marginRight: 10
            }}
            >
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
                    Pesquisar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={clearSearch}
            style={{
                paddingHorizontal: 5,
                paddingVertical: 10,
                backgroundColor: '#007bff',
                border: 'none',
                borderRadius: '5px',
                marginTop: 10,
                flex: 1,
                textAlign: 'center'
            }}
            >
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Limpar</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity 
        onPress={toggleShowFavorites}
        style = {{
            paddingHorizontal: 5,
            paddingVertical: 10,
            backgroundColor: '#28a745',
            borderRadius: '5px',
            marginTop: 10,
        }}
        >
          <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>{showOnlyFavorites ? 'Exibir Todos' : 'Exibir Favoritos'}</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de jogadores */}
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginBottom: 10, fontWeight: 'bold'}}>{showOnlyFavorites ? 'Favoritos' : 'Jogadores'}</Text>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View style={{ justifyContent: 'center' }}>{jogadoresExibidos.map(renderCardAtleta)}</View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Atletas;