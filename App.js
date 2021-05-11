import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';

import useMarketList from './src/hooks/useMarketList';

export default function App() {

  const [name, setName] = useState('');
  const [state, addItem, checkItem, removeItem] = useMarketList();

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor='#A82654' barStyle='light-content' />

      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder='Adicione um produto'
          placeholderTextColor='#BBB'
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            addItem(name);
            setName('');
          }}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={state}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <TouchableOpacity style={styles.btnCheck} onPress={() => { checkItem(item.id) }}>
              <Text style={[styles.listItem, item.check ? styles.checkedItem : '']}>{item.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { removeItem(item.id) }}>
              <Text style={{ color: '#A82654' }}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    width: '80%',
    height: 45,
    borderRadius: 7,
    padding: 10,
    borderWidth: 1,
    borderColor: '#A82654',
    color: '#000',
    fontSize: 16
  },
  btn: {
    backgroundColor: '#A82654',
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    height: 45,
    borderRadius: 7,
  },
  btnText: {
    color: '#FFF',
    fontSize: 25
  },
  listItem: {
    fontSize: 16,
  },
  checkedItem: {
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  list: {
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#BBB',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnCheck: {
    width: '70%',
  }
});