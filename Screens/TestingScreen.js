import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const NonInteractivePieChart = () => {
  const thisWeekTransactions = [
    { 
      amount: "25", 
      category: { name: "Coffee" }, 
      type: "expense" 
    },
    { 
      amount: "120", 
      category: { name: "Freelance" }, 
      type: "income" 
    },
    { 
      amount: "50", 
      category: { name: "Transport" }, 
      type: "expense" 
    },
    { 
      amount: "80", 
      category: { name: "Lunch" }, 
      type: "expense" 
    },
    { 
      amount: "200", 
      category: { name: "Salary" }, 
      type: "income" 
    },
    { 
      amount: "60", 
      category: { name: "Entertainment" }, 
      type: "expense" 
    },
    { 
      amount: "30", 
      category: { name: "Groceries" }, 
      type: "expense" 
    }
  ];

  // Proses data expenses
  const expensesData = thisWeekTransactions
    .filter(item => item.type === "expense")
    .map((item, index) => ({
      name: item.category.name,
      amount: parseFloat(item.amount),
      color: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40'][index % 6]
    }));

  const totalExpenses = expensesData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5fcff',
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
  );
};

export default NonInteractivePieChart;