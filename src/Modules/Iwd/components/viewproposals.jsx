/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Paper,
  Table,
  Badge,
  Button,
  Flex,
  Title,
  Group,
  Loader,
} from "@mantine/core";
import axios from "axios";

function ViewProposals({ requestId }) {
  const token = useSelector((state) => state.user.token);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProposals = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/get-proposals/${requestId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProposals(response.data);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
      setLoading(false);
    };

    fetchProposals();
  }, [requestId, token]);

  return (
    <Container>
      <Paper
        radius="md"
        px="lg"
        py="xl"
        withBorder
        style={{ width: "90%", margin: "auto", backgroundColor: "#f8f9fa" }}
      >
        <Flex justify="space-between" align="center" mb="lg">
          <Title size="26px" weight={700}>
            View Proposals
          </Title>
          <Group>
            <Button variant="light" size="sm" color="blue">
              All Requests
            </Button>
            <Button variant="light" size="sm" color="teal">
              Approved
            </Button>
            <Button variant="light" size="sm" color="gray">
              Unapproved
            </Button>
          </Group>
        </Flex>

        {loading ? (
          <Loader size="lg" style={{ display: "block", margin: "auto" }} />
        ) : (
          <Table withBorder highlightOnHover style={{ borderRadius: "10px" }}>
            <thead style={{ backgroundColor: "#f1f3f5" }}>
              <tr>
                <th>Proposal ID</th>
                <th>Item Name</th>
                <th>Unit</th>
                <th>Price Per Unit</th>
                <th>Total Price</th>
                <th>Approval</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(proposals) &&
                proposals.map((proposal) => (
                  <tr key={proposal.id}>
                    <td>{proposal.id}</td>
                    <td>{proposal.item_name}</td>
                    <td>{proposal.unit}</td>
                    <td>${proposal.price_per_unit}</td>
                    <td>${proposal.total_price}</td>
                    <td>
                      <Badge
                        color={proposal.approved ? "green" : "red"}
                        variant="light"
                      >
                        {proposal.approved ? "Approved" : "Not Approved"}
                      </Badge>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Paper>
    </Container>
  );
}

export default ViewProposals;
