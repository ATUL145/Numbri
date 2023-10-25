import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

function DeleteConfirmation(props) {
  const {
    showDeleteConfirmation,
    confirmDeleteTransaction,
    hideDeleteConfirmationModal,
  } = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showDeleteConfirmation}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalDeleteContent}>
          <Text style={styles.categoryHeading}>Delete Transaction?</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmDeleteTransaction}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={hideDeleteConfirmationModal}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default DeleteConfirmation;
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionsHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
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
  modalDeleteContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "90%",
    height: "20%",
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
  editDeleteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "20%",
  },
  addButton: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
  },
});
