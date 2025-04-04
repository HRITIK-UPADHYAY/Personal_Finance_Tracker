import React, { useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Button from './Button';
import './Style/modal.css'
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../Firebase';

const Modal = ({text, closeModal, user, getTransactionsFromFirestore}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [tag, setTag] = useState("");

  function handleClick(e) {
    e.preventDefault(); 

    if(!name || !amount || !date || !tag) toast.error("All Fields Required");
    else {
      const newTransaction = {
        type: text.substring(4),
        name,
        amount: parseFloat(amount),
        date,
        tag
      };

      addTransactions(newTransaction);
      getTransactionsFromFirestore();
    }

    setName("");
    setAmount("");
    setDate("");
    setTag("");
  }

  async function addTransactions(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      toast.success(`Successfully ${text}`);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className='modal'>
      <div className="heading">
        <h4> {text} </h4>
        <div onClick={() => closeModal(false)}> <CloseRoundedIcon /> </div>
      </div>
      <form className='form'>
        <div className="input-data">
            <label> Name <sup> * </sup> </label>
            <input type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="input-data">
            <label> Amount <sup> * </sup> </label>
            <input type='number' placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)}/>
        </div>
        <div className="input-data">
            <label> Date <sup> * </sup> </label>
            <input type='date' placeholder='dd/mm/yyyy' value={date} onChange={(e) => setDate(e.target.value)}/>
        </div>
        <div className="input-data">
            <label> Tag <sup> * </sup> </label>
            <input type='text' placeholder='Tag' value={tag} onChange={(e) => setTag(e.target.value)}/>
        </div>

        <div className='btn'>
            <Button text={text} onClick={handleClick}/>
        </div>

      </form>
    </div>
  )
}

export default Modal
