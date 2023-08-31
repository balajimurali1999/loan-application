import axios from 'axios'
import '../styles/viewLoan.css'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { useParams } from 'react-router-dom'
export default function ViewLoan() {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState(null);
    const { id } = useParams();
    const fileDatacolumns =
        [
            { field: 'name', headerName: 'File name', width: 80 },
            { field: 'size', headerName: 'File size', width: 80 }
        ]
    const [loanData, setloanData] = useState([]);
    const [rowFileData, setRowFileData] = useState([])
    const loanBasicDetailTemplate = [
        { name: 'name', displayName: 'Applicant Name' },
        { name: 'dateOfBirth', displayName: 'Date of birth' },
        { name: 'gender', displayName: 'Gender' },
        { name: 'panId', displayName: 'PAN' },
        { name: 'email', displayName: 'Email' },
    ];
    const loanDetailTemplate = [
        { name: 'loanAmount', displayName: 'Loan Amount' },
        { name: 'loanTenure', displayName: 'Loan Tenure' },
        { name: 'intrestRate', displayName: 'Intrest Rate' },
        { name: 'totalAmount', displayName: 'Total Amount' },
        { name: 'emiAmount', displayName: 'EMI amount' }
    ];
    const branchDetailsTemplate = [
        { name: 'branch', displayName: 'Branch' },
        { name: 'loanOfficer', displayName: 'Loan Officer', },
        { name: 'status', displayName: 'status' }]
    useEffect(() => {
        axios.get('http://localhost:8080/loanDetails', { params: { id: id } }).then(res => {
            if (res.data.length > 0) {
                console.log(res.data)
                setloanData(res.data[0]);
                setRowFileData(res.data[0].uploadedFiles)
                console.log(res.data[0].uploadedFiles)
                console.log(rowFileData)
            }

        }).catch(err => {
            console.log(err)
        })
    }, [id])
    return (
        <div className='container'>

            <div className="row mb-2">
                <div className='subform-title'>Basic Details</div>
                {loanBasicDetailTemplate.map((ele, ind) => (
                    <div className='col mb-1' key={ind}>
                        <div className='loan-detail-title mb-1'>{ele.displayName} </div>
                        <div className='val'>{loanData[ele.name]}</div>
                    </div>
                ))}
            </div><br></br>
            <div className="row mb-2">
                <div className='subform-title'>Loan Details</div>

                {loanDetailTemplate.map((ele, ind) => (
                    <div className='col' key={ind}>
                        <div className='loan-detail-title'>{ele.displayName} </div>
                        <div className='val'>{loanData[ele.name]}</div>
                    </div>
                ))}
            </div>
            <div className="row mb-2">
                <div className='subform-title'>Branch Details</div>
                {branchDetailsTemplate.map((ele, ind) => (
                    <div className='col' key={ind}>
                        <div className='loan-detail-title'>{ele.displayName} </div>
                        <div className='val'>{loanData[ele.name]}</div>
                    </div>
                ))}
            </div>
            <div className="row mb-2">
                <div className='subform-title'>File Details</div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {fileDatacolumns.map((column) => (
                                    <TableCell className='loan-detail-title' key={column.field}>{column.headerName}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {loanData[`uploadedFiles`].map((row, ind) => (
                                <TableRow key={ind}>
                                    {fileDatacolumns.map((column) => (
                                        <TableCell onClick={(eve) => { console.log('hi') }} key={column.field}>{row[column.field]}</TableCell>
                                    ))}
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="row">
                <div>
                    <Button className='btn btn-primary' onClick={() => handleOpenDialog(<div>Hello from the dynamic dialog!</div>)}>
                        Open Dynamic Dialog
                    </Button>

                    <DynamicDialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        dialogContent={dialogContent}
                    />
                </div>
            </div>
        </div>
    )
}
