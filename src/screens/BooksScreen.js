import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Linking,
  Alert,
} from 'react-native';
import { links } from '../Config';

export default function BooksScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      // This would fetch from your backend
      // For now, showing sample data
      const sampleBooks = [
        { 
          id: 1, 
          title: 'श्री जिनवाणी संग्रह', 
          author: 'आचार्य श्री', 
          downloadUrl: 'https://example.com/book1.pdf',
          description: 'जैन धर्म की मूलभूत शिक्षाएं'
        },
        { 
          id: 2, 
          title: 'तत्वार्थ सूत्र', 
          author: 'आचार्य उमास्वामी', 
          downloadUrl: 'https://example.com/book2.pdf',
          description: 'जैन दर्शन का आधारभूत ग्रंथ'
        },
        { 
          id: 3, 
          title: 'षट्खण्डागम', 
          author: 'आचार्य पुष्पदंत', 
          downloadUrl: 'https://example.com/book3.pdf',
          description: 'जैन सिद्धांत का महत्वपूर्ण ग्रंथ'
        },
      ];
      
      setBooks(sampleBooks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  };

  const handleDownload = async (book) => {
    try {
      const supported = await Linking.canOpenURL(book.downloadUrl);
      if (supported) {
        await Linking.openURL(book.downloadUrl);
      } else {
        Alert.alert('Error', 'Cannot open this link');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to download book');
    }
  };

  const renderBook = ({ item }) => (
    <View style={styles.bookCard}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>लेखक: {item.author}</Text>
      <Text style={styles.bookDescription}>{item.description}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.readButton}
          onPress={() => handleDownload(item)}
        >
          <Text style={styles.buttonText}>पढ़ें</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.downloadButton}
          onPress={() => handleDownload(item)}
        >
          <Text style={styles.buttonText}>डाउनलोड करें</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const goBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1976d2" />
          <Text style={styles.loadingText}>पुस्तकें लोड हो रही हैं...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>← वापस</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>जिनवाणी पुस्तकें</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.description}>
          यहाँ आप जैन धर्म की विभिन्न पुस्तकें पढ़ और डाउनलोड कर सकते हैं
        </Text>

        <FlatList
          data={books}
          renderItem={renderBook}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2C3E50',
  },
  header: {
    backgroundColor: '#234f64',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    color: '#fafafa',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fafafa',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 22,
  },
  bookCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  bookDescription: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  readButton: {
    backgroundColor: '#127c28',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 0.45,
  },
  downloadButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 0.45,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
