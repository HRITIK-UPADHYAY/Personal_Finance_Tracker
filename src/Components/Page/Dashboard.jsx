import React, { useEffect, useMemo, useState } from 'react'
import Header from '../Common/Header'
import Card from '../Common/Card'
import './Style/dashboard.css'
import Modal from '../Common/Modal'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../Firebase'
import { addDoc, collection, getDocs, query } from 'firebase/firestore'
import { toast } from 'react-toastify'
import Table from '../Common/Table'
import Search from '../Common/Search'
import SelectOptions from '../Common/SelectOptions'
import { parse, unparse } from 'papaparse'
import Chart from '../Common/Chart'
import NoTransaction from '../Common/NoTransaction'
import PieChart from '../Common/PieChart'

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [btnName, setBtnName] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [text, setText] = useState(""); 
  const [activeButton, setActiveButton] = useState('no-sort');
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

  const filteredAndSortedArray = useMemo(() => {
    let result = transactions.filter((transaction) => {
      const nameMatch = transaction.name?.toLowerCase().includes(text.toLowerCase());
      const typeMatch = filterType === 'all' || transaction.type?.toLowerCase().includes(filterType.toLowerCase());
      return nameMatch && typeMatch;
    });
  
    if (activeButton === 'date') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (activeButton === 'amount') {
      result.sort((a, b) => a.amount - b.amount);
    }
  
    return result;
  }, [transactions, text, filterType, activeButton]);

  function exportCSV() {
    var csv = unparse(transactions, {
      "fields": ["Name", "Type", "Date", "Amount", "Tag"],
    });

    var data = new Blob([csv], {type: 'text/csv;charset-utf-8;'});
    var csvURL = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = csvURL;
    link.download = 'Transaction.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function importCSV(e) {
    e.preventDefault();
    try {
      parse(e.target.files[0], {
        header: true,
        delimiter: ",",
        complete: async function (results) {  
          console.log(results)
          for(const transaction of results.data) {
            console.log("transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount)
            }

            console.log("transaction addition started ");
            await addDoc(
              collection(db, `users/${user.uid}/transactions`),
              newTransaction
            );
            console.log("transaction addition ended ");
          };

          await getTransactionsFromFirestore();
          toast.success("File Imported Successfully!");
          e.target.files= null;
        }
      });

      toast.success("File Importation Started");
    }
    catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className='dashboard'>
      <Header />
      <div className={`body-content ${showModal ? 'background-blur': ""}`}>
        <Card heading={"Current Balance"} btnText={"Reset Balance"} amount={totalBalance} onClick={handleModal}/>
        <Card heading={"Total Income"} btnText={"Add Income"} amount={totalIncome} onClick={() => handleModal("Add Income")}/>
        <Card heading={"Total Expense"} btnText={"Add Expense"} amount={totalExpense} onClick={() => handleModal("Add Expense")}/>
      </div>

      <div className={`chart-data ${showModal ? 'background-blur': ""}`}>
        <div className="chart">
          {
            transactions.length == 0 ? <div className='noTransaction-image'> <NoTransaction /> </div>
                                     : <div className="data-show">
                                          <div className="line-chart"> 
                                            <h2> Your Analytics </h2>
                                            <Chart transactions={transactions}/> 
                                          </div>
                                          <div className="pie-chart"> 
                                            <h2> Your Spendings </h2>
                                            <PieChart transactions={transactions}/>
                                          </div>
                                        </div>
          }
        </div>
        <div className="filter">
          <div className='search-box'> <Search text={text} setText={setText}/> </div>
          <div className="items"> <SelectOptions setFilterType={setFilterType}/> </div>
        </div>
        
        <div className='main-data-content'>
          <div className='transactions-data'>
            <div className="upper-container">
              <h3> My Transactions </h3>

              <div className='sorting-checkbox'>
                <button value={"no-sort"} onClick={(e) => setActiveButton(e.target.value)} className={activeButton == 'no-sort' && 'active'}> No Sort </button>
                <button value={"date"} onClick={(e) => setActiveButton(e.target.value)} className={activeButton == 'date' && 'active'}> Sort By Date </button>
                <button value={"amount"} onClick={(e) => setActiveButton(e.target.value)} className={activeButton == 'amount' && 'active'}> Sort By Amount </button>
              </div>

              <div className="imp-exp">
                <label for='file-csv' className='imp-exp-label'> Import From CSV </label>
                <input id='file-csv' type='file' accept='.csv' required onChange={importCSV} style={{display: "none"}}/>
                <button onClick={exportCSV}> Export To CSV </button>
              </div>
            </div>  
            <Table transactions={filteredAndSortedArray} />
          </div>
        </div>
       
      </div>
    

      {
        showModal && <div className='show-modal'> <Modal text={btnName}  closeModal={setShowModal} user={user} getTransactionsFromFirestore={getTransactionsFromFirestore}/>
                    </div> 
      }

      

      
    </div>
  )
}

export default Dashboard

