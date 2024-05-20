import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import {
  Heading,
  UnorderedList,
  ListItem,
  Button,
  Box,
} from "@chakra-ui/react";

interface Props {
  userType: string;
  onApprove?: (id: number, status: string, refreshLoans: () => void) => void;
}

interface Loan {
  id: number;
  full_name: string;
  requested_loan_amount: number;
  approval_status: string;
}

const LoanList = ({ userType, onApprove }: Props) => {
  const [loans, setLoans] = useState<Loan[]>([]);

  const fetchLoans = useCallback(async () => {
    // Added useCallback to create fetchLoans function
    try {
      const response = await axios.get(
        `http://localhost:3000/loans?user_type=${userType}`
      );
      const data = response.data;

      // Ensure the response data is an array
      if (Array.isArray(data)) {
        setLoans(data);
      } else {
        console.error("Fetched data is not an array:", data);
        setLoans([]); // Set to an empty array if data is not an array
      }
    } catch (error) {
      console.error("Error fetching loans:", error);
      setLoans([]); // Set to an empty array on error
    }
  }, [userType]);

  useEffect(() => {
    fetchLoans(); // Call fetchLoans in useEffect
  }, [fetchLoans]);

  return (
    <Box>
      <Heading as="h2" size="lg">
        Loan Applications
      </Heading>
      <UnorderedList>
        {loans.map((loan) => (
          <ListItem key={loan.id}>
            {loan.full_name} - ${loan.requested_loan_amount} -{" "}
            {loan.approval_status}
            {userType === "admin" &&
              loan.approval_status === "waiting decision" && (
                <Box mt={2}>
                  <Button
                    colorScheme="green"
                    onClick={() => onApprove!(loan.id, "approved", fetchLoans)}
                  >
                    Approve
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => onApprove!(loan.id, "denied", fetchLoans)}
                    ml={2}
                  >
                    Deny
                  </Button>
                </Box>
              )}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default LoanList;
