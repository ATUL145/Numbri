import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DatePicker from "react-native-date-picker";
import Radio from "../common/Checkbox";
import AddTransaction from "../components/AddTransaction";
import Chart from "../components/Chart";
import DeleteConfirmation from "../components/DeleteModal";
import TransactionList from "../components/TransactionList";
import { FIREBASE_DB } from "../config/FirebaseConfig";
import { categories, categoryColors } from "../utils/constants";
import Skeleton from "../common/skeleton";
const Home = ({ userUID, navigation }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const db = getFirestore();

  const onDateChange = (newDate) => {
    setDate(newDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const hideDatePickerModal = () => {
    setShowDatePicker(false);
  };

  const showCategoryPickerModal = () => {
    setShowCategoryPicker(true);
  };

  const hideCategoryPickerModal = () => {
    setShowCategoryPicker(false);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const handleAddTransaction = async () => {
    if (!description || !amount || !selectedCategory) {
      return;
    }

    if (editingTransaction) {
      const updatedTransaction = {
        ...editingTransaction,
        description,
        amount,
        date: date.toISOString().split("T")[0],
        category: selectedCategory,
      };

      const transactionRef = doc(db, "transactions", editingTransaction.id);

      try {
        await setDoc(transactionRef, updatedTransaction);
        console.log("Transaction updated successfully!");
      } catch (error) {
        console.error("Error updating transaction: ", error);
      }

      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === updatedTransaction.id
            ? updatedTransaction
            : transaction
        )
      );

      setEditingTransaction(null);
    } else {
      const newTransaction = {
        id: Date.now().toString(),
        description,
        amount,
        date: date.toISOString().split("T")[0],
        category: selectedCategory,
      };

      const transactionRef = await addDoc(collection(db, "transactions"), {
        ...newTransaction,
        userUID,
      });

      setTransactions([newTransaction, ...transactions]);
    }

    setDescription("");
    setAmount("");
    hideDatePickerModal();
    hideCategoryPickerModal();
  };

  const hideDeleteConfirmationModal = () => {
    setTransactionToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const confirmDeleteTransaction = async () => {
    if (transactionToDelete) {
      const transactionRef = doc(
        FIREBASE_DB,
        "transactions",
        transactionToDelete.id
      );
      try {
        await deleteDoc(transactionRef);
        console.log("Transaction deleted successfully!");
      } catch (error) {
        console.error("Error deleting transaction: ", error);
      }

      handleDeleteTransaction(transactionToDelete.id);
      hideDeleteConfirmationModal();
    }
  };

  const handleDeleteTransaction = (id) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
    hideDeleteConfirmationModal();
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setDescription(transaction.description);
    setAmount(transaction.amount);
    setSelectedCategory(transaction.category);
    setDate(new Date(transaction.date));
    showDatePickerModal();
    showCategoryPickerModal();
  };

  const calculateCategoryTotals = () => {
    const categoryTotals = {};

    transactions.forEach((transaction) => {
      const category = transaction.category;
      const amount = parseFloat(transaction.amount);

      if (categoryTotals[category]) {
        categoryTotals[category] += amount;
      } else {
        categoryTotals[category] = amount;
      }
    });

    const categoryData = Object.entries(categoryTotals).map(
      ([category, amount]) => ({
        name: category,
        amount: amount,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
        color: categoryColors[category],
      })
    );

    return categoryData;
  };

  const totalExpense = transactions.reduce(
    (total, transaction) => total + parseFloat(transaction.amount),
    0
  );
  const categoryData = calculateCategoryTotals();

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactionsRef = collection(db, "transactions");
      const userTransactionsQuery = query(
        transactionsRef,
        where("userUID", "==", userUID)
      );

      try {
        const querySnapshot = await getDocs(userTransactionsQuery);
        const transactions = [];
        querySnapshot.forEach((doc) => {
          transactions.push({ id: doc.id, ...doc.data() });
        });

        setTransactions(transactions);
      } catch (error) {
        console.error("Error fetching transactions: ", error);
      }
    };

    fetchTransactions();
  }, [userUID]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <AddTransaction
          description={description}
          amount={amount}
          setDescription={setDescription}
          setAmount={setAmount}
          showDatePickerModal={showDatePickerModal}
          showCategoryPickerModal={showCategoryPickerModal}
          handleAddTransaction={handleAddTransaction}
          editingTransaction={editingTransaction}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDatePicker}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DatePicker mode="date" date={date} onDateChange={onDateChange} />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={hideDatePickerModal}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={hideDatePickerModal}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showCategoryPicker}
          onRequestClose={hideCategoryPickerModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.categoryHeading}>Select Category</Text>
              {categories.map((category) => (
                <Radio
                  key={category}
                  selected={selectedCategory === category}
                  onSelect={() => handleCategorySelection(category)}
                  label={category}
                />
              ))}
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={hideCategoryPickerModal}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={hideCategoryPickerModal}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.chartContainer}>
          <Chart categoryData={categoryData} totalExpense={totalExpense} />
          {console.log(
            "🚀 ~ file: Home.js:296 ~ Home ~ categoryData:",
            categoryData
          )}
          <Pressable
            onPress={() =>
              navigation.navigate("History", {
                categoryData: categoryData,
                totalExpense: totalExpense,
              })
            }
            style={styles.modalButton}
          >
            <Text style={styles.buttonText}>Explore More Charts</Text>
          </Pressable>
        </View>

        {transactions.length === 0 ? (
          [1, 2, 3, 4, 5].map((index) => {
            <Skeleton key={index} />;
          })
        ) : (
          <TransactionList
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
          />
        )}
        {transactions.length === 0 ? (
          <Text style={styles.emptyLlistText}>
            Please Add Your First Transaction
          </Text>
        ) : null}
      </View>
      <DeleteConfirmation
        showDeleteConfirmation={showDeleteConfirmation}
        confirmDeleteTransaction={confirmDeleteTransaction}
        hideDeleteConfirmationModal={hideDeleteConfirmationModal}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  chartContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  totalExpense: {
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "90%",
    height: "60%",
  },

  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "purple",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: "40%",
  },
  modalButton: {
    backgroundColor: "purple",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "purple",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: "40%",
  },

  categoryIcon: {
    fontSize: 20,
  },
  emptyLlistText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default Home;
