import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuthStore } from '../store';
import { PRIMARY_COLOR, WHITE, GRAY, DARK_GRAY } from '../assets/styles';

const Register = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: 'male',
    interestedIn: 'female',
    location: '',
  });
  const { register, isLoading } = useAuthStore();

  const handleRegister = async () => {
    const { name, email, password, age, location } = formData;

    if (!name || !email || !password || !age || !location) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (parseInt(age) < 18) {
      Alert.alert('Error', 'You must be at least 18 years old');
      return;
    }

    try {
      await register({
        ...formData,
        age: parseInt(age),
      });
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'Please try again');
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join us today</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={GRAY}
          value={formData.name}
          onChangeText={(val) => updateField('name', val)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={GRAY}
          value={formData.email}
          onChangeText={(val) => updateField('email', val)}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={GRAY}
          value={formData.password}
          onChangeText={(val) => updateField('password', val)}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor={GRAY}
          value={formData.age}
          onChangeText={(val) => updateField('age', val)}
          keyboardType="number-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor={GRAY}
          value={formData.location}
          onChangeText={(val) => updateField('location', val)}
        />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioGroup}>
          {['male', 'female', 'other'].map((gender) => (
            <TouchableOpacity
              key={gender}
              style={[
                styles.radioButton,
                formData.gender === gender && styles.radioButtonActive,
              ]}
              onPress={() => updateField('gender', gender)}
            >
              <Text
                style={[
                  styles.radioText,
                  formData.gender === gender && styles.radioTextActive,
                ]}
              >
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Interested In</Text>
        <View style={styles.radioGroup}>
          {['male', 'female', 'both'].map((preference) => (
            <TouchableOpacity
              key={preference}
              style={[
                styles.radioButton,
                formData.interestedIn === preference && styles.radioButtonActive,
              ]}
              onPress={() => updateField('interestedIn', preference)}
            >
              <Text
                style={[
                  styles.radioText,
                  formData.interestedIn === preference && styles.radioTextActive,
                ]}
              >
                {preference.charAt(0).toUpperCase() + preference.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={WHITE} />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>
            Already have an account? <Text style={styles.linkBold}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: DARK_GRAY,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: GRAY,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: DARK_GRAY,
  },
  label: {
    fontSize: 16,
    color: DARK_GRAY,
    marginBottom: 10,
    fontWeight: '600',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  radioButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  radioButtonActive: {
    backgroundColor: PRIMARY_COLOR,
  },
  radioText: {
    color: DARK_GRAY,
    fontSize: 14,
  },
  radioTextActive: {
    color: WHITE,
    fontWeight: '600',
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'center',
    color: GRAY,
    marginTop: 20,
    fontSize: 14,
  },
  linkBold: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },
});

export default Register;
