import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Function to fetch users data from backend API
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const response = await axios.get('http://localhost:5000/admin', {
          headers: {
            Authorization: token,
            role: role
          }
        });
        setUsers(response.data); // Assuming response.data is an array of user objects
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [users]);

  const handleUpdate = (userId) => {
    // Function to handle update user action
    console.log(`Update user with ID: ${userId}`);
    // Implement your logic for update
    setModalMessage(`Update user with ID ${userId}.`); // Example message
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    try {
      // Function to handle delete user action
      console.log(`Delete user with ID: ${userId}`);
      // Implement your logic for delete
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      await axios.delete(`http://localhost:5000/admin/${userId}`,{
        headers: {
          Authorization: token,
          role: role
        }
      });
      setModalMessage(`User with ID ${userId} was successfully deleted.`);
      setShowModal(true);
    } catch (error) {
      console.error('Error deleting user:', error);
      setModalMessage(`Failed to delete user with ID ${userId}.`);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.firstname}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.lastname}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleUpdate(user._id)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="ml-2 text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={showModal}
          onClose={handleCloseModal}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
          >
            <ModalClose variant="plain" onClick={handleCloseModal} sx={{ m: 1 }} />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              Modal Message
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              {modalMessage}
            </Typography>
          </Sheet>
        </Modal>
      )}
    </div>
  );
};

export default GetUsers;
