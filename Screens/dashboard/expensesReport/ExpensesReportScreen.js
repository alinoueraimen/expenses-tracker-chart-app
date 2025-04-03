import React, { useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart,PieChart } from 'react-native-chart-kit';
import { useTransactionUtils } from '../../../context/TransactionsContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import useNavigationUtils from '../../../navigation/navigationUtils';
const ExpensesReport = () => {
  const screenWidth = Dimensions.get('window').width;
  const { transactionsData } = useTransactionUtils();
  const {navigateToPrevRoute} = useNavigationUtils();
  const isThisWeek = (date) => {
    const now = new Date(); // Tambahkan deklarasi ini
    const transactionDate = new Date(date);
    
    // Normalisasi waktu ke 00:00:00 untuk perbandingan
    transactionDate.setHours(0, 0, 0, 0);
    
    // Hitung awal minggu (Senin)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - (now.getDay() || 7) + 1);
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Hitung akhir minggu (Minggu)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    console.log('transaction date',transactionDate)
    console.log("start week",startOfWeek)
    console.log( transactionDate >= startOfWeek)
    console.log("end of week",endOfWeek)
    console.log("is it this week?",transactionDate >= startOfWeek && transactionDate <= endOfWeek)
    
    return transactionDate >= startOfWeek && transactionDate <= endOfWeek;
  };
  
  const thisWeekTransactionsData = transactionsData.filter(item => isThisWeek(item.transaction_date));
//   console.log("Real this week transactions data:", thisWeekTransactionsData);
  const chartData = {
    labels: thisWeekTransactionsData.map(item => {
        const date = new Date(item.transaction_date);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      }),
    datasets: [
      {
        data: thisWeekTransactionsData
          .filter(item => item.transaction_type === "income")
          .map(item => parseFloat(item.amount)),
        color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
      },
      {
        data: thisWeekTransactionsData
          .filter(item => item.transaction_type === "expense")
          .map(item => parseFloat(item.amount)),
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
      }
    ]
  };
    const expensesData = thisWeekTransactionsData
    .filter(item => item.transaction_type === "expense")
    .map((item, index) => ({
      name: item.category_name,
      amount: parseFloat(item.amount),
      color: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40'][index % 6]
    }));
    const totalExpenses = expensesData.reduce((sum, item) => sum + item.amount, 0);

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
          return `$${(value / 1000000).toFixed(1)}M`; // Jutaan dollar (1.2M)
        }
        if (value >= 1000) {
          return `$${(value / 1000).toFixed(0)}K`; // Ribuan dollar (250K)
        }
        return `$${value}`; // Nilai biasa ($500)
      },
    propsForDots: {
      r: '6', // Ukuran titik
      strokeWidth: '2',
      stroke: '#ffffff', // Warna outline titik
    }
  };
  const handleOnDataPointClick = () =>{
    console.log("dot click")
  }
  useEffect(() => {
    console.log('raw data', transactionsData);
    console.log("this week transactions data", thisWeekTransactionsData);

  },[])
  return (
    <View style={styles.container}>
      <View style={[{width:"100%",margin:5}]}>
      <TouchableOpacity 
  onPress={() => navigateToPrevRoute()}
  style={{
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,122,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }}
  activeOpacity={0.7}
>
  <Icon 
    name="chevron-left" 
    size={24} 
    
  />
</TouchableOpacity>
      </View>
      <Text style={styles.title}>This Week</Text>
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
        yAxisLabel="$"
        verticalLabelRotation={0}
        bezier={false} // Garis lurus
        withShadow={false} // Tanpa shadow
        withInnerLines={true}
        withOuterLines={true}
        withDots={true} // Tampilkan titik
        withLine={false} // Sembunyikan garis
        onDataPointClick={handleOnDataPointClick}
        
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
       <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <PieChart
              data={expensesData}
              width={Dimensions.get('window').width - 16}
              height={220}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute={false}
              hasLegend={true}
              avoidFalseZero={true}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
      
            <View style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: '#e0e0e0',
              borderRadius: 5,
            }}>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 16,
              }}>
                Total Pengeluaran: ${totalExpenses.toFixed(2)}
              </Text>
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

export default ExpensesReport;