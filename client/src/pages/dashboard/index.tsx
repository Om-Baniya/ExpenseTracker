import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import "./financial-record.css"
import { useFinancialRecords } from "../../contexts/financial-record-contexts";
import { useMemo } from "react";
export const Dashboard=()=>{
    const {user}=useUser();
    const{records}=useFinancialRecords();

    const totalMonthly=useMemo(()=>{
        let totalAmount=0;
        records.forEach((record)=>{
            totalAmount+=record.amount;
        });
        return totalAmount;
    },[records]);
    return( <div className="dashboard-container">
        <h1> Welcome {user?.firstName}! Here are your Expenses:</h1>
        <FinancialRecordForm />
        <div>Total Expenses:{totalMonthly}</div>
        <FinancialRecordList />
    </div> 
    );
};