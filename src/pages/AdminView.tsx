import axios from "axios";
import LoanList from "./LoanList";

const AdminView = () => {
  const handleApproval = async (
    id: number,
    status: string,
    refreshLoans: () => void
  ) => {
    // Specify types for id, status, and accept refreshLoans
    try {
      const response = await axios.put(`http://localhost:3000/loans/${id}`, {
        approval_status: status,
      });
      console.log("Loan updated:", response.data);
      refreshLoans(); // Call the refreshLoans function to update the list
    } catch (error) {
      console.error("Error updating loan:", error);
    }
  };

  return (
    <>
      <LoanList userType="admin" onApprove={handleApproval} />
    </>
  );
};

export default AdminView;
