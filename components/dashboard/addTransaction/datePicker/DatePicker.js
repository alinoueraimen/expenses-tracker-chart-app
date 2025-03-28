import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  TextInput 
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';

const DatePicker = ({setFieldValue}) => {
  const [date, setDate] = useState("Select Date");
  const [modalVisible, setModalVisible] = useState(false);
  
  // State untuk input manual
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleDateChange = () => {
    // Validasi input
    const parsedDay = parseInt(day);
    const parsedMonth = parseInt(month) - 1; // JavaScript month is 0-indexed
    const parsedYear = parseInt(year);

    // Pengecekan validasi dasar
    if (
      parsedDay > 0 && parsedDay <= 31 &&
      parsedMonth >= 0 && parsedMonth <= 11 &&
      parsedYear > 1900 && parsedYear < 2100
    ) {
      const newDate = new Date(parsedYear, parsedMonth, parsedDay);
      setDate(newDate);
      setFieldValue('date',newDate)
      setModalVisible(false);
    } else {
      alert('Masukkan tanggal yang valid');
    }
  };

  const renderDateInputs = () => (
    <View style={tw`flex-row justify-between w-full mb-4`}>
      <TextInput
        style={tw`border border-gray-300 rounded p-2 w-1/3 text-center`}
        placeholder="Hari"
        keyboardType="numeric"
        maxLength={2}
        value={day}
        onChangeText={setDay}
      />
      <TextInput
        style={tw`border border-gray-300 rounded p-2 w-1/3 text-center`}
        placeholder="Bulan"
        keyboardType="numeric"
        maxLength={2}
        value={month}
        onChangeText={setMonth}
      />
      <TextInput
        style={tw`border border-gray-300 rounded p-2 w-1/3 text-center`}
        placeholder="Tahun"
        keyboardType="numeric"
        maxLength={4}
        value={year}
        onChangeText={setYear}
      />
    </View>
  );

  return (
    <View>
      {/* Tombol Pilih Tanggal */}
      <TouchableOpacity 
        style={tw`border border-gray-300 p-3 rounded mb-4 flex-row items-center`}
        onPress={() => setModalVisible(true)}
      >
        <Icon style={tw`mr-5`} name='calendar' size={20} color={"#000"}/>
        {date === "Select Date" ? (
          <Text style={tw`text-gray-500`}>{date}</Text>
        ) : (
          <Text style={tw`text-black`}>Pilih Tanggal: {date.toLocaleDateString()}</Text>
        )}
      </TouchableOpacity>

      {/* Modal Input Tanggal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white rounded-lg p-5 w-4/5`}>
            <Text style={tw`text-lg font-bold text-center mb-4`}>Masukkan Tanggal</Text>
            
            {renderDateInputs()}
            
            <TouchableOpacity 
              style={tw`bg-green-500 p-3 rounded items-center mb-2`}
              onPress={handleDateChange}
            >
              <Text style={tw`text-white font-bold`}>Konfirmasi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={tw`p-2 items-center`}
              onPress={() => setModalVisible(false)}
            >
              <Text style={tw`text-red-500`}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePicker;