import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faCalendarDay,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const Payments = () => {
  const initialPaymentsData = [
    {
      id: 1,
      name: "Dhananjay Mane",
      date: "2024-07-20",
      status: "Paid",
      amount: 1200,
      method: "Card",
    },
    {
      id: 2,
      name: "Soham Nimbalkar",
      date: "2024-06-15",
      status: "Pending",
      amount: 1500,
      method: "Cash",
    },
    {
      id: 3,
      name: "Yash Dhaytonde",
      date: "2024-06-10",
      status: "Paid",
      amount: 2000,
      method: "Google Pay",
    },
    {
      id: 4,
      name: "Omkar Mane",
      date: "2024-07-10",
      status: "Paid",
      amount: 3100,
      method: "Paytm",
    },
    {
      id: 5,
      name: "Snehal Mane",
      date: "2024-07-17",
      status: "Paid",
      amount: 1600,
      method: "Phone Pay",
    },
    {
      id: 6,
      name: "John Doe",
      date: "2024-07-01",
      status: "Pending",
      amount: 1300,
      method: "Card",
    },
    {
      id: 7,
      name: "Jane Smith",
      date: "2024-07-02",
      status: "Paid",
      amount: 1400,
      method: "Cash",
    },
    {
      id: 8,
      name: "Alice Johnson",
      date: "2024-07-03",
      status: "Paid",
      amount: 2500,
      method: "Google Pay",
    },
    {
      id: 9,
      name: "Bob Brown",
      date: "2024-07-04",
      status: "Pending",
      amount: 2200,
      method: "Paytm",
    },
    {
      id: 10,
      name: "Charlie Green",
      date: "2024-07-05",
      status: "Paid",
      amount: 1700,
      method: "Phone Pay",
    },
    {
      id: 11,
      name: "David White",
      date: "2024-07-06",
      status: "Pending",
      amount: 1900,
      method: "Card",
    },
    {
      id: 12,
      name: "Emma Black",
      date: "2024-07-07",
      status: "Paid",
      amount: 2100,
      method: "Cash",
    },
    {
      id: 13,
      name: "Frank Red",
      date: "2024-07-08",
      status: "Paid",
      amount: 2300,
      method: "Google Pay",
    },
    {
      id: 14,
      name: "Grace green",
      date: "2024-07-17",
      status: "Pending",
      amount: 2400,
      method: "Paytm",
    },
    {
      id: 15,
      name: "Hank Yellow",
      date: "2024-07-11",
      status: "Paid",
      amount: 2600,
      method: "Phone Pay",
    },
    {
      id: 16,
      name: "Ivy Orange",
      date: "2024-07-12",
      status: "Paid",
      amount: 2700,
      method: "Card",
    },
    {
      id: 17,
      name: "Jack Purple",
      date: "2024-07-13",
      status: "Pending",
      amount: 2800,
      method: "Cash",
    },
    {
      id: 18,
      name: "Karen Pink",
      date: "2024-07-14",
      status: "Paid",
      amount: 2900,
      method: "Google Pay",
    },
    {
      id: 19,
      name: "Larry Brown",
      date: "2024-07-17",
      status: "Paid",
      amount: 3000,
      method: "Paytm",
    },
    {
      id: 20,
      name: "Mona Silver",
      date: "2024-07-16",
      status: "Paid",
      amount: 3100,
      method: "Phone Pay",
    },
  ];

  const [paymentsData, setPaymentsData] = useState(initialPaymentsData);
  const [editingPayment, setEditingPayment] = useState(null);
  const [editedPayment, setEditedPayment] = useState({
    id: "",
    name: "",
    date: "",
    status: "",
    amount: "",
    method: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("new");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");

  const handleDelete = (id) => {
    const updatedPayments = paymentsData.filter((payment) => payment.id !== id);
    setPaymentsData(updatedPayments);
  };

  const handleEditClick = (payment) => {
    setEditingPayment(payment.id);
    setEditedPayment(payment);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPayment({ ...editedPayment, [name]: value });
  };

  const handleSave = () => {
    const updatedPayments = paymentsData.map((payment) =>
      payment.id === editedPayment.id ? editedPayment : payment
    );
    setPaymentsData(updatedPayments);
    setEditingPayment(null);
  };

  const handleAddPayment = () => {
    const newPayment = {
      id: paymentsData.length + 1,
      name: "",
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      amount: "",
      method: "Cash",
    };
    setPaymentsData([...paymentsData, newPayment]);
    setEditingPayment(newPayment.id);
    setEditedPayment(newPayment);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleMethodFilterChange = (e) => {
    setMethodFilter(e.target.value);
  };

  const filteredPayments = paymentsData
    .filter(
      (payment) =>
        payment.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "all" || payment.status === statusFilter) &&
        (methodFilter === "all" || payment.method === methodFilter)
    )
    .sort((a, b) => {
      if (sortOrder === "new") {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });

  const today = new Date().toISOString().split("T")[0];
  const todayIncome = paymentsData
    .filter((payment) => payment.date === today)
    .reduce((total, payment) => total + Number(payment.amount), 0);

  const currentMonth = new Date().getMonth();
  const monthlyIncome = paymentsData
    .filter((payment) => new Date(payment.date).getMonth() === currentMonth)
    .reduce((total, payment) => total + Number(payment.amount), 0);

  const currentYear = new Date().getFullYear();
  const yearlyIncome = paymentsData
    .filter((payment) => new Date(payment.date).getFullYear() === currentYear)
    .reduce((total, payment) => total + Number(payment.amount), 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Payments</h2>

      <input
        type="text"
        placeholder="Search payments..."
        className="mb-4 p-2 border rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="bg-white border rounded p-4 shadow-md">
          <FontAwesomeIcon
            icon={faDollarSign}
            size="2x"
            className="mb-2 text-indigo-500"
          />
          <p className="text-lg font-semibold">Today's Income</p>
          <p className="text-2xl">${todayIncome}</p>
        </div>
        <div className="bg-white border rounded p-4 shadow-md">
          <FontAwesomeIcon
            icon={faCalendarDay}
            size="2x"
            className="mb-2 text-indigo-500"
          />
          <p className="text-lg font-semibold">Monthly Income</p>
          <p className="text-2xl">${monthlyIncome}</p>
        </div>
        <div className="bg-white border rounded p-4 shadow-md">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            size="2x"
            className="mb-2 text-indigo-500"
          />
          <p className="text-lg font-semibold">Yearly Income</p>
          <p className="text-2xl">${yearlyIncome}</p>
        </div>
      </div>
      <div className="flex space-x-4 mb-4">
        <select
          onChange={handleSortChange}
          value={sortOrder}
          className="p-2 border rounded"
        >
          <option value="new">Sort by Newest Payments</option>
          <option value="old">Sort by Oldest Payments</option>
        </select>
        <select
          onChange={handleStatusFilterChange}
          value={statusFilter}
          className="p-2 border rounded"
        >
          <option value="all">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
        <select
          onChange={handleMethodFilterChange}
          value={methodFilter}
          className="p-2 border rounded"
        >
          <option value="all">All Payment Methods</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Google Pay">Google Pay</option>
          <option value="Phone Pay">Phone Pay</option>
          <option value="Paytm">Paytm</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr>
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Method</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{payment.id}</td>
                <td className="py-2 px-4 border">
                  {editingPayment === payment.id ? (
                    <input
                      type="text"
                      name="name"
                      className="p-2 border rounded w-full"
                      value={editedPayment.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    payment.name
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingPayment === payment.id ? (
                    <input
                      type="text"
                      name="date"
                      className="p-2 border rounded w-full"
                      value={editedPayment.date}
                      onChange={handleInputChange}
                    />
                  ) : (
                    payment.date
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingPayment === payment.id ? (
                    <select
                      name="status"
                      className="p-2 border rounded w-full"
                      value={editedPayment.status}
                      onChange={handleInputChange}
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                    </select>
                  ) : (
                    payment.status
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingPayment === payment.id ? (
                    <input
                      type="number"
                      name="amount"
                      className="p-2 border rounded w-full"
                      value={editedPayment.amount}
                      onChange={handleInputChange}
                    />
                  ) : (
                    payment.amount
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingPayment === payment.id ? (
                    <select
                      name="method"
                      className="p-2 border rounded w-full"
                      value={editedPayment.method}
                      onChange={handleInputChange}
                    >
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="Google Pay">Google Pay</option>
                      <option value="Phone Pay">Phone Pay</option>
                      <option value="Paytm">Paytm</option>
                    </select>
                  ) : (
                    payment.method
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {editingPayment === payment.id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingPayment(null)}
                        className="bg-gray-500 text-white py-1 px-2 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(payment)}
                        className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(payment.id)}
                        className="bg-red-500 text-white py-1 px-2 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleAddPayment}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
      >
        Add Payment
      </button>
    </div>
  );
};

export default Payments;
