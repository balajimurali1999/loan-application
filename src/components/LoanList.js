import React, { useEffect, useState  } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import '../styles/loanlist.css';
import { useNavigate } from 'react-router-dom';
export default function LoanList() {
  const navigate = useNavigate();
  const columns = [
    { field: 'id', headerName: 'Id', width: 160 },
    { field: 'name', headerName: 'Customer Name', width: 160 },
    { field: 'status', headerName: 'status', width: 160 },
    { field: 'loanOfficer', headerName: 'Loan Officer', width: 160 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => <ViewCell params={params} />,
      width: 100,
    },
  ];
  const [rows, setRows] = useState([]);
  const currentUserDetail = {
    name: 'venkatesh',
    branch: 'chennai',
    role: 'BANK_MANAGER',
    email: 'venaktesh@gmail.com',
    branchMembers: [
      {
        name: 'durga Prasad',
        email: 'durgaprasad@gmail.com'
      }
    ]
  };



  const ViewCell = ({ params }) => {
    return (
      <div className="view-button" onClick={() => handleViewClick(params.row.id)}>
        View
      </div>
    );
  };
  const handleViewClick = (rowId) => {
    console.log(rowId)
    navigate('/loan/' + rowId)
    console.log('View clicked for row with ID:', rowId);
  };

  useEffect(() => {
    let paramData = { branch: 'chennai' }
     axios.get('http://localhost:8080/loanDetails', { params: paramData }).then((res) => {
      console.log(res.data)
      const branchData = res.data.filter(ele => ele.branch === currentUserDetail.branch);
      const rowData = branchData.map(ele => { return { id: ele.id, name: ele.name, status: ele.status, loanOfficer: ele.loanOfficer } })
      setRows(rowData)
    }).catch(err => {
      console.log(err)
    })
  }, []);
  return (
    <div className='container mt-4 row m'>
      <div className='row table-container'>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight // This allows the table to adjust its height based on content
          pagination
          pageSize={2}
        />
      </div>
    </div>
  )
}
