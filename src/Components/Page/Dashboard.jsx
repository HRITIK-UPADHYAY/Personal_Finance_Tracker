import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import Card from '../Common/Card'
import './Style/dashboard.css'
import Modal from '../Common/Modal'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../Firebase'
import { collection, getDocs, query } from 'firebase/firestore'
import { toast } from 'react-toastify'
import Table from '../Common/Table'

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [btnName, setBtnName] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    getTransactionsFromFirestore();
  }, [user]);

  useEffect(() => {
    specifyAmount();
  }, [transactions]);
  
  async function  getTransactionsFromFirestore() {
    if(user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });

      setTransactions(transactionsArray);
    }
  }

  function specifyAmount() {
    let income = 0;
    let expense = 0;

    transactions.forEach(data => {
      if(data.type === 'Income') income += data.amount;
      else expense += data.amount;
    });

    setTotalIncome(income);
    setTotalExpense(expense);
    setTotalBalance(income - expense);

    toast.success("Balance Updated Successfully");
  }


  function handleModal(text) {
    setShowModal(!showModal);
    setBtnName(text);
  }

  return (
    <div className='dashboard'>
      <Header />
      <div className={`body-content ${showModal ? 'background-blur': ""}`}>
        <Card heading={"Current Balance"} btnText={"Reset Balance"} amount={totalBalance} onClick={handleModal}/>
        <Card heading={"Total Income"} btnText={"Add Income"} amount={totalIncome} onClick={() => handleModal("Add Income")}/>
        <Card heading={"Total Expense"} btnText={"Add Expense"} amount={totalExpense} onClick={() => handleModal("Add Expense")}/>
      </div>

      {
        showModal && <div className='show-modal'> <Modal text={btnName}  closeModal={setShowModal} user={user} getTransactionsFromFirestore={getTransactionsFromFirestore}/>
                    </div> 
      }

      <Table transactions={transactions} />
    </div>
  )
}

export default Dashboard
