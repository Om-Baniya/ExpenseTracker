import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

 export interface FinancialRecord{
    _id?: string;
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

interface FinancilRecordsContextType{
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord)=>void;
    updateRecord: (id: string, newRecord: FinancialRecord)=>void;
    deleteRecord: (id:string)=>void;
}
export const FinancilRecordsContext = createContext<FinancilRecordsContextType | undefined>(undefined);

export const FinancialRecordsProvider=({
    children,
}:{
    children: React.ReactNode;
})=>{
    const [records,setRecords] = useState<FinancialRecord[]>([]);
    const{user}=useUser();

    const fetchRecords=async()=>{
        if(!user) return;
        const response =await fetch(
            `http://localhost:3001/financial-records/getAllByUserID/${user.id }`
        );

        if(response.ok){
            const records =await response.json();
            console.log(records);
            setRecords(records);
        }
    }

    useEffect(()=>{
        fetchRecords();
    }, [user]);

    const addRecord = async (record: FinancialRecord)=>{
        const response = await fetch("http://localhost:3001/financial-records", {
            method: "POST",
            body: JSON.stringify(record),
            headers:{
                "Content-Type":"application/json",
            },
        });
        try{
            if(response.ok){
                const newRecord= await response.json();
                setRecords((prev)=> [...prev, newRecord]);
            }
        }catch(err){}
    };
    const updateRecord = async (id:string,newRecord: FinancialRecord)=>{
        
        const response = await fetch(`http://localhost:3001/financial-records/${id}`, {
            method: "PUT",
            body: JSON.stringify(newRecord),
            headers:{
                "Content-Type":"application/json",
            },
        });
        try{
            if(response.ok){
                const newRecord= await response.json();
                setRecords((prev)=> prev.map((record)=>{
                    if(record._id===id){
                        return newRecord;
                    }else{
                        return record;
                    }
                    
                }));
            }
        }catch(err){}
    };

    const deleteRecord=async(id:string)=>{
        const response = await fetch(`http://localhost:3001/financial-records/${id}`,
            {
            method: "DELETE",
        });
        try{
            if(response.ok){
                const deleteRecord= await response.json();
                setRecords((prev)=> prev.filter((record)=>record._id!==deleteRecord.id));
            }
        }catch(err){}
    }

    return (
        <FinancilRecordsContext.Provider value={{ records,addRecord,updateRecord,deleteRecord}}>
            
            {children}
        </FinancilRecordsContext.Provider>
    )
}

export const useFinancialRecords = () =>{
    const context = useContext<FinancilRecordsContextType | undefined>(
        FinancilRecordsContext
    );

    if(!context){
        throw new Error(
            "useFinancialRecords must be used within a FinancialRecordsProvider"
        );
    }
    return context;
};