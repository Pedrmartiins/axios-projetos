import React, { useState, useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import axios from "axios";

// Declaração do componente principal da aplicação
export default function App() {
  // usuarios como array de estado
  const [users, setUsers] = useState([]);
  // Definir a URL da API que será consumida
  const API = "http://10.110.12.14:3000/user"

  // Função assincrona para buscar a lista de usuario da API
  const fetchUsers = async () => {
    try {
      // Faz requisição GET paraa a URL API
      const response = await axios.get(API);
      // Atualização da variavel de estado users
      setUsers(response.data)
    } catch (error) {
      console.error("Error GET: ", error.message)
    }

  }

  const deleteUser = async (id) => {
    try {
      // Faz requisição de DELETE para excluir um usuario pelo id
      await axios.delete(`${API}/${id}`);
      // Filtra a lista de usuarios, removendo o usuario do respectivo id informado
      setUsers(users.filter((u)=> u.id !== id));
    } catch (error) {
      console.error("Error DELETE: ", error.message)
    }

  }

  useEffect(() => {
    fetchUsers();
  }, []);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DELETE - Remover Usuario</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>id:{item.id} - {item.name} - {item.email}</Text>
            <Button title="Del" onPress={() => deleteUser(item.id)} />
          </View>
        )} />
        </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:40,
  },
  title:{
    fontSize: 22,
    fontWeight:"bold",
    marginBottom: 10
  },
  userItem:{
    marginVertical:10
  }
});
