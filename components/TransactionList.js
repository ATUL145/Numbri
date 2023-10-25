import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getCategoryIcon } from "../utils/function";

const TransactionList = (props) => {
  const { transactions, onEdit, onDelete } = props;

  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  const showDeleteConfirmation = (transaction) => {
    setTransactionToDelete(transaction);
    setShowDeleteConfirmationModal(true);
  };

  const hideDeleteConfirmation = () => {
    setTransactionToDelete(null);
    setShowDeleteConfirmationModal(false);
  };

  return (
    <>
      <Text style={styles.transactionsHeading}>Expenses</Text>
      {transactions.map((transaction) => (
        <View key={transaction.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.categoryIcon}>
              <Text>{getCategoryIcon(transaction.category)}</Text>
            </View>
            <Text style={styles.cardDescription}>
              {transaction.description}
            </Text>
            <View style={styles.editDeleteContainer}>
              <TouchableOpacity
                onPress={() => showDeleteConfirmation(transaction)}
              >
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onEdit(transaction)}>
                <AntDesign name="edit" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.cardAmount}>₹{transaction.amount}</Text>
            <Text style={styles.cardDateBottom}>{transaction.date}</Text>
          </View>
        </View>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeleteConfirmationModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Confirm deletion of this transaction?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  hideDeleteConfirmation();
                  onDelete(transactionToDelete.id);
                }}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={hideDeleteConfirmation}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  transactionsHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    fontSize: 20,
  },
  cardDescription: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  editDeleteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "20%",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cardAmount: {
    fontSize: 16,
  },
  cardDateBottom: {
    fontSize: 14,
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
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
  cancelButton: {
    backgroundColor: "purple",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: "40%",
  },
});

export default TransactionList;
