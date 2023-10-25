import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import Chart from "../components/Chart";
import { BarChart, LineChart } from "react-native-chart-kit";

const History = ({ navigation, route }) => {
  const { categoryData, totalExpense } = route?.params;
  const [category, setCategory] = useState(categoryData);
  const [expense, setExpense] = useState(totalExpense);
  return (
    <>
      {category && category.length > 0 ? (
        <ScrollView style={styles.container}>
          <Chart categoryData={category} totalExpense={expense} />

          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Expense Histogram</Text>
            <BarChart
              data={{
                labels: category.map((category) => category.name),
                datasets: [
                  {
                    data: category.map((category) => category.amount),
                  },
                ],
              }}
              width={300}
              height={200}
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "orange",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
            />
          </View>

          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Expense Line Chart</Text>
            <LineChart
              data={{
                labels: category.map((category) => category.name),
                datasets: [
                  {
                    data: category.map((category) => category.amount),
                  },
                ],
              }}
              width={300}
              height={200}
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "purple",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
            />
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Expense Bar Chart</Text>
            <BarChart
              data={{
                labels: category.map((category) => category.amount),
                datasets: [
                  {
                    data: category.map((category) => category.amount),
                  },
                ],
              }}
              width={300}
              height={200}
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "green",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
            />
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Expense Histogram</Text>
            <BarChart
              data={{
                labels: category.map((category) => category.name),
                datasets: [
                  {
                    data: category.map((category) => category.amount),
                  },
                ],
              }}
              width={300}
              height={200}
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "orange",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
            />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  chartContainer: {
    marginTop: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default History;
