import React, { useEffect, useState } from 'react'
import axios from 'axios'
import   './Pagination.css'

const Pagination = () => {
    const [dataall, setDataAll] = useState([])
    const [empdata, setEmpData] = useState([])
    const [pageno, setPageNo] = useState(1)
    const pagelimit = 10;
    const url = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    useEffect(() => {
        axios.get(url).then((res) => res.data)
        .then((data) => {
            console.log(data)
            const loadData = data.slice(pageno-1,pagelimit);
            console.log("loadData", loadData)
            setDataAll(data);
            setEmpData(loadData) 
           // setDataAll(data) 
           // setEmpData(data) 
        })


       // setEmpData(data.slice(0,10)) 
    },[])

    const handlePrevious = () => {
        const initialPage = 1;
        console.log("Previous page", pageno)
        if(pageno === initialPage) {
            return;
        }
     
        setPageNo((prevValue) => prevValue - 1)
      
       const start = ((pageno-2)*pagelimit);
       const end = (pageno-1)*pagelimit;
        console.log("start", start)
        console.log("end", end)
      const nextdata =  dataall.slice(start,end);

       setEmpData(nextdata) 
    }

    const handleNext = () => {
        const totalpage = Math.ceil(dataall.length / 10);
        if(pageno + 1 > totalpage) {
            return;
        }
     
        setPageNo((prevValue) => prevValue + 1)
      
       const start = ((pageno)*pagelimit);
       const end = (pageno+1)*pagelimit;
    
      const nextdata =  dataall.slice(start,end);

       setEmpData(nextdata) 
  
    }
  return (
    <div className='common'>
        <h2>Employee Data Table</h2>
        <div className='divstyle'>
            <table>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </thead>
                <tbody>
{
    empdata.map((emp) => {
        return (
            <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
            </tr>
        )
    })
}
                </tbody>
            </table>
        </div>
        <div>
            <button onClick={handlePrevious}>Previous</button>
            <button>{pageno}</button>
            <button onClick={handleNext}>Next</button>
        </div>
    </div>
  )
}

export default Pagination