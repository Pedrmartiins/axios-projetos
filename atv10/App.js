import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
  // Estados para armazenar dados de compromissos
  const [compromissos, setCompromissos] = useState([]);
  const [titulo, setTitulo] = useState("");  // Título do compromisso
  const [anotacoes, setAnotacoes] = useState("");  // Anotações sobre o compromisso
  const [data, setData] = useState("");  // Data do compromisso
  const [hora, setHora] = useState("");  // Hora do compromisso
  const [status, setStatus] = useState("agendado");  // Status do compromisso

  const API = "http://10.110.12.14:3000/compromissos";  // URL da API (substitua pelo seu backend)

  // Função para carregar todos os compromissos (GET)
  const fetchCompromissos = async () => {
    try {
      const response = await axios.get(API);
      setCompromissos(response.data);  // Atualiza o estado com os compromissos recebidos
    } catch (error) {
      console.error("Erro ao buscar compromissos:", error.message);
    }
  };

  // Função para adicionar um novo compromisso (POST)
  const addCompromisso = async () => {
    try {
      const response = await axios.post(API, {
        titulo,
        anotacoes,
        data,
        hora,
        status,
      });

      setCompromissos((prevCompromissos) => [...prevCompromissos, response.data]);  // Adiciona o novo compromisso à lista
      clearFields();  // Limpa os campos de entrada
    } catch (error) {
      console.error("Erro ao adicionar compromisso:", error.message);
    }
  };

  // Função para atualizar um compromisso existente (PUT)
  const updateCompromisso = async (id) => {
    try {
      const updatedCompromisso = {
        titulo,
        anotacoes,
        data,
        hora,
        status,
      };

      const response = await axios.put(`${API}/${id}`, updatedCompromisso);  // Envia os dados atualizados para a API

      // Atualiza a lista de compromissos com o compromisso atualizado
      setCompromissos((prevCompromissos) =>
        prevCompromissos.map((compromisso) =>
          compromisso.id === id ? response.data : compromisso
        )
      );
      clearFields();  // Limpa os campos de entrada após a atualização
    } catch (error) {
      console.error("Erro ao atualizar compromisso:", error.message);
    }
  };

  // Função para excluir um compromisso (DELETE)
  const deleteCompromisso = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);  // Faz a requisição DELETE para excluir o compromisso
      setCompromissos((prevCompromissos) =>
        prevCompromissos.filter((compromisso) => compromisso.id !== id)  // Atualiza a lista removendo o compromisso excluído
      );
    } catch (error) {
      console.error("Erro ao excluir compromisso:", error.message);
    }
  };

  // Limpa os campos de entrada
  const clearFields = () => {
    setTitulo("");
    setAnotacoes("");
    setData("");
    setHora("");
    setStatus("agendado");  // Reseta o status para 'agendado'
  };

  // Chama o fetchCompromissos assim que o componente for montado
  useEffect(() => {
    fetchCompromissos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar e Gerenciar Compromissos</Text>

      {/* Campo para título */}
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />

      {/* Campo para anotações */}
      <TextInput
        style={styles.input}
        placeholder="Anotações"
        value={anotacoes}
        onChangeText={setAnotacoes}
      />

      {/* Campo para data */}
      <TextInput
        style={styles.input}
        placeholder="Data (dd-mm-yyyy)"
        value={data}
        onChangeText={setData}
      />

      {/* Campo para hora */}
      <TextInput
        style={styles.input}
        placeholder="Hora (hh:mm)"
        value={hora}
        onChangeText={setHora}
      />

      {/* Status do compromisso */}
      <TextInput
        style={styles.input}
        placeholder="Status (agendado, pendente, concluído)"
        value={status}
        onChangeText={setStatus}
      />

      {/* Botão para adicionar compromisso */}
      <Button title="Adicionar Compromisso" onPress={addCompromisso} />

      {/* FlatList para mostrar os compromissos */}
      <FlatList
        data={compromissos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.titulo}</Text>
            <Text>{item.anotacoes}</Text>
            <Text>{item.data} - {item.hora}</Text>
            <Text>Status: {item.status}</Text>

            {/* Botões para editar e excluir */}
            <Button title="Editar" onPress={() => {
              setTitulo(item.titulo);
              setAnotacoes(item.anotacoes);
              setData(item.data);
              setHora(item.hora);
              setStatus(item.status);
              // Quando o usuário clicar em editar, ele já pode editar os campos e atualizar
            }} />
            <Button title="Excluir" onPress={() => deleteCompromisso(item.id)} />
            <Button title="Atualizar" onPress={() => updateCompromisso(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
