import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';



export default function App() {
const [users, setUsers] = useState([]
);

const [newName, setNewName] = useState("")
const [newEmail, setNewEmail] = useState("")

const API = "http://10.110.12.15:3000/users"

const addUser = async () => {
  try{
    const response = await axios.post(API,{name:newName, email:newEmail});
    
    setUsers([...users, response.data])
    setNewName("")
    setNewEmail("")

  }catch(error){
    console.error("ERROR POST: ",error.message)
  }
}
return(
  <View style={StyleSheet.container}>
    <Text style={StyleSheet.title}>POST - Adicionar usuario</Text>

    <TextInput
    style={styles.input}
    placeholder="Nome"
    value={newName}
    onChangeText={setNewName}/>

    <TextInput
    style={styles.input}
    placeholder="Email"
    value={newEmail}
    onChangeText={setNewEmail}/>

    <Button title="Adicionar Usuario" onPress={addUser}/>

  <FlatList
  data={users}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({item})=>(
    <Text>{item.name}-{item.email}</Text>
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
