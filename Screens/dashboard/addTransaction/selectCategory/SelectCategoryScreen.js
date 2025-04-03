import React from 'react';
import { Text, View, FlatList, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useNavigationUtils from '../../../../navigation/navigationUtils';

// Data kategori yang terstruktur
const CATEGORIES = [
  { id: '1', name: 'food', icon: 'cutlery', color: '#FF9500' },
  { id: '2', name: 'health', icon: 'heart', color: '#FF2D55' },
  { id: '3', name: 'transport', icon: 'car', color: '#007AFF' },
  { id: '4', name: 'shopping', icon: 'shopping-bag', color: '#5856D6' },
  { id: '5', name: 'education', icon: 'book', color: '#AF52DE' },
  { id: '6', name: 'entertainment', icon: 'film', color: '#FF3B30' },
];

function SelectCategoryScreen({ route }) {
  const { width } = Dimensions.get('window');
  const itemSize = width / 3 - 20;
  const { onCategorySelect } = route.params;
  const { navigateToPrevRoute } = useNavigationUtils();

  const handleCategoryPress = (category) => {
    onCategorySelect({
      name: category.name,
      imgID: category.icon
    });
    navigateToPrevRoute();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Category</Text>
      
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleCategoryPress(item)}
            style={[styles.categoryButton, { width: itemSize, height: itemSize }]}
          >
            <Icon name={item.icon} size={50} color={item.color} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  listContainer: {
    alignItems: 'center',
  },
  categoryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});

export default SelectCategoryScreen;