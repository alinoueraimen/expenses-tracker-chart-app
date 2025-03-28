import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const ExpenseIncomeDotsComparison = () => {
  const screenWidth = Dimensions.get('window').width;

  // Data contoh untuk 7 hari
  const chartData = {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    datasets: [
      {
        data: [1200000, 1900000, 3000000, 2500000, 2200000, 1800000, 3500000],
        color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`, // Hijau untuk income
      },
      {
        data: [800000, 1100000, 1500000, 1300000, 1800000, 900000, 1200000],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Merah untuk expenses
      }
    ],
    legend: ['Income', 'Expenses']
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: '#e3e3e3',
      strokeDasharray: '0',
    },
    formatYLabel: (value) => {
      if (value >= 1000000) {
        return `Rp${(value / 1000000).toFixed(1)}jt`;
      }
      if (value >= 1000) {
        return `Rp${(value / 1000).toFixed(0)}rb`;
      }
      return `Rp${value}`;
    },
    propsForDots: {
      r: '6', // Ukuran titik
      strokeWidth: '2',
      stroke: '#ffffff', // Warna outline titik
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perbandingan Income vs Expenses</Text>
      <Text style={styles.subtitle}>Per Hari dalam Seminggu (Titik)</Text>
      
      <LineChart
        transparent
        data={chartData}
        width={screenWidth - 40}
        height={300}
        chartConfig={chartConfig}
        withHorizontalLabels={true}
        withVerticalLabels={true}
        style={{
          marginVertical: 8,
          borderRadius: 16,
         
        }}
        yAxisLabel="Rp"
        verticalLabelRotation={0}
        bezier={false} // Garis lurus
        withShadow={false} // Tanpa shadow
        withInnerLines={true}
        withOuterLines={true}
        withDots={true} // Tampilkan titik
        withLine={false} // Sembunyikan garis
      />
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, {backgroundColor: 'rgba(75, 192, 192, 1)'}]} />
          <Text style={styles.legendText}>Income</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, {backgroundColor: 'rgba(255, 99, 132, 1)'}]} />
          <Text style={styles.legendText}>Expenses</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
   
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 15,
    height: 15,
    borderRadius: 8, // Lingkaran
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ExpenseIncomeDotsComparison;