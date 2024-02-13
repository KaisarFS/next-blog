// src/app/users/page.js
'use client'
import styles from './user.module.css';
import "primereact/resources/themes/saga-blue/theme.css";
import 'primereact/resources/primereact.min.css';
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { InputSwitch } from "primereact/inputswitch";

export default function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [checked, setChecked] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  // const [formData, setFormData] = useState({
  //   email: '',
  //   name: '',
  //   gender: '',
  //   status: ''
  // });
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const showSuccess = () => {
    if (toast.current) {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 });
    }
  };

  const showError = () => {
    if (toast.current) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Message Content', life: 3000 });
    }
  };

  const onPageChange = (event) => {
    setCurrentPage(event.page);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEmail(user.email);
    setName(user.name);
    setGender(user.gender);
    setStatus(user.status);
    setChecked(user.status === 'active');
    setVisible(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setEmail('');
    setName('');
    setGender('');
    setStatus('');
    setChecked(false);
    setVisible(true);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://gorest.co.in/public-api/users', {
        params: {
          page: currentPage,
          per_page: rowsPerPage,
          name: searchQuery
        },
        headers: {
          Authorization: 'Bearer ec9cc3aaea2549236f67b2eed61cad223176cfef723d4abe82821906ab36b2d2'
        }
      });
      setUsers(res.data.data);
      setTotalRecords(res.data.meta.pagination.total);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchQuery]);


  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.get('https://gorest.co.in/public-api/users', {
        params: {
          page: 1,
          per_page: rowsPerPage,
          name: searchQuery
        }
      });
      setUsers(res.data.data);
      setTotalRecords(res.data.meta.pagination.total);
      setLoading(false);
    } catch (error) {
      console.error('Error searching users:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('https://gorest.co.in/public-api/users', { email, name, gender, status }, {
        headers: {
          Authorization: 'Bearer ec9cc3aaea2549236f67b2eed61cad223176cfef723d4abe82821906ab36b2d2'
        }
      });

      console.log(res, "<==== res handleFormSubmit");

      fetchUsers();
      setEmail('');
      setName('');
      setGender('');
      setStatus('');
      setLoading(false);
      showSuccess();
      setVisible(false)
    } catch (error) {
      console.error('Error adding user:', error);
      setLoading(false);
      showError();
      // if (toast.current) {
      //   toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to add user' }); // Use toast ref to show error message
      // }
    }
  };

  const deleteUser = async (userId) => {
    try {
      setLoading(true);
      await axios.delete(`https://gorest.co.in/public-api/users/${userId}`, {
        headers: {
          Authorization: 'Bearer ec9cc3aaea2549236f67b2eed61cad223176cfef723d4abe82821906ab36b2d2'
        }
      });
      fetchUsers();
      showSuccess();
    } catch (error) {
      console.error('Error deleting user:', error);
      setLoading(false);
      showError();
    }
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`https://gorest.co.in/public-api/users/${editingUser.id}`, { email, name, gender, status }, {
        headers: {
          Authorization: 'Bearer ec9cc3aaea2549236f67b2eed61cad223176cfef723d4abe82821906ab36b2d2'
        }
      });

      console.log(res, "<==== res handleEditFormSubmit");

      fetchUsers();
      setEmail('');
      setName('');
      setGender('');
      setStatus('');
      setLoading(false);
      showSuccess();
      setVisible(false);
    } catch (error) {
      console.error('Error editing user:', error);
      setLoading(false);
      showError();
    }
  };

  if (users === null) {
    return <p>Loading...</p>;
  }

  const renderActions = (rowData) => {
    return (
      <div className={styles['action-button']}>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-info p-mr-2" onClick={() => handleEdit(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteUser(rowData.id)} />
      </div>
    );
  };

  const renderStatus = (rowData) => {
    const getStatusClass = () => {
      return rowData.status === 'active' ? styles['chip-active'] : styles['chip-inactive'];
    };

    return (
      <div>
        <div className={getStatusClass()}>
          {rowData.status === 'active' ? 'Active' : 'Inactive'}
        </div>
      </div>
    );
  };


  return (
    <main className={styles['search-page']}>
      <Navbar />

      <section className={styles['main']}>
        <section className={styles['section-header']}>
          <div>
            <h1>Checkout our users!</h1>
            <p>Users from all over the world join here, or add your own.</p>
            <form action="#!">
              <div className={styles['form-group']}>
                <span><img src="https://rvs-yelpcamp.vercel.app/Assets/Search Icon.svg" alt="" /></span>
                <input type="text" className={styles['searchtext']} value={searchQuery} onChange={handleInputChange} id="searchtext" placeholder="Search users by name.." />
              </div>
            </form>
            <p><a href="javascript:void(0)" onClick={() => handleAddUser()} >Or add a new user</a></p>

          </div>
        </section>

        <Dialog header={editingUser ? "Edit User" : "Add New User"} visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)}>
          <form onSubmit={editingUser ? handleEditFormSubmit : handleFormSubmit}>
            <div className="p-fluid">
              <div className="p-field">
                <label htmlFor="email">Email</label>
                <InputText id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="p-field">
                <label htmlFor="name">Name</label>
                <InputText id="name" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="p-field">
                <label htmlFor="gender">Gender</label>
                <InputText id="gender" type="text" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} required />
              </div>
              <div className="p-field">
                <label htmlFor="status">Status</label>
                <InputSwitch checked={checked} onChange={(e) => {
                  setChecked(e.value);
                  setStatus(e.value ? 'active' : 'inactive');
                }} />
              </div>
            </div>
            <Button label="Submit" type="submit" />
          </form>
        </Dialog>

        <DataTable
          value={users}
          paginator
          lazy
          rows={rowsPerPage}
          totalRecords={totalRecords}
          onPage={onPageChange}
          loading={loading}
          emptyMessage="No records found"
        >
          <Column field="name" header="Name"></Column>
          <Column field="email" header="Email"></Column>
          <Column header="Status" body={renderStatus}></Column>
          <Column header="Action" body={renderActions}></Column>
        </DataTable>
      </section>
      <Footer />
    </main>
  );
}
