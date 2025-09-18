import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import React {useEffect, useState}from 'react';
import axios from "axios"
import { useEffect, useState } from 'react';

export default function App(){
  const [users, setUsers] = useState([])

  const API = "http//10.110.12.15:3000/users"

  const fetchUsers = async () => {
    const response =await axios.get(API)

    setUsers(response.data)

  }

  const updateUser = async (id) => {
    try{
      const response = await axios.put('${API}/${id}',
      {name: "nome atualizado", email:"email atualizado"}
    )
    setUsers(users.map((u) => (u.id === id ? response.data : u)))
  }catch(error){
    console.error("ERROR PUT: ", error.message)

  }
  }

  useEffect(()=>{
    fetchUsers()
  }, [])

  return(
    <View style = {styles.container}>
      <Text style={styles.title}>PUT - atualizar usuarios</Text>
      <FlatList 
      data={users}
      keyExtractor={(item)=> item.id.toString()}
      renderItem={({item})=>(
        <View style= {StyleSheet.userItem}>
          <Text>{item.name} - {item.email}</Text>
          <Button title='Atualizar' onPress={()=> updateUser(item.id)}/>
          </View>
      )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {flex:1, padding:20, marginTop:60
  },
  title: {fontSize: 22, fontWeight: "bold", marginBottom: 10},
  input: {borderWidth:1, borderColor: "#ccc", padding:8, marginBottom:8}
  
})


