import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";

const NewForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    requested_loan_amount: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/loans",
        formData
      );
      console.log("Loan submitted:", response.data);
    } catch (error) {
      console.error("Error submitting loan:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={formData.full_name}
        onChange={(e) =>
          setFormData({ ...formData, full_name: e.target.value })
        }
        placeholder="Full Name"
        required
      />
      <Input
        type="number"
        value={formData.requested_loan_amount}
        onChange={(e) =>
          setFormData({ ...formData, requested_loan_amount: e.target.value })
        }
        placeholder="Requested Loan Amount"
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default NewForm;
