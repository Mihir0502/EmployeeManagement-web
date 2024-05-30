// import React,{Component} from 'react'
//  export class Employee extends Component{
//     render(){
//         return(
//             <div>
//                 <h3>This is Employee Page</h3>
//             </div>
//         )
//     }
//  }

import React, { Component } from 'react';
import axios from 'axios'; // Import axios
import { Department } from './Department';

export class Employee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            employee:[], // Change departments to items
            modalTitle: "",
            FName: "",
            DepartmentId:"",
            Email:"",
            Postion:"",
            Salary:0,
            Id: 0,
            HireDate:"",
            PhotoPath:'https://localhost:44350/api/Employee'
        }
    }




    refreshList() {
        axios.get("https://localhost:44350/api/Employee/GetEmployee")
            .then(response => {
                this.setState({ items: response.data, itemsWithoutFilter: response.data });
            })
            .catch(error => {
                console.error('Error fetching items:', error);
                // Handle error as needed
            });
    }

    componentDidMount() {
        this.refreshList();
    }
    changeFName = (e) => {
        this.setState({ FName: e.target.value });
    }

    changePostion = (e) => {
        this.setState({ Postion: e.target.value });
    }
    changeSalary = (e) => {
        this.setState({ Salary: e.target.value });
    }
    changeEmail = (e) => {
        this.setState({ Email: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Employee",
            Id: 0,
            FName: "",
            DepartmentId:0,
            Email:'',
            Postion:'',
            Salary:0,
            HireDate:''
        });
    }

    editClick(item) {
        this.setState({
            modalTitle: "Edit Employee",
            Id: item.Id,
            FName: item.FName,
            DepartmentId:item.DepartmentId,
            Email:item.Email,
            Postion:item.Postion,
            Salary:item.Salary,
            HireDate:item.HireDate
        });
    }

    createClick() {
        axios.post('https://localhost:44350/api/Department', {
            FName: this.state.FName,
            DepartmentId:this.state.DepartmentId,
            Email:this.state.Email,
            Postion:this.state.Postion,
            Salary:this.state.Salary,
            HireDate:this.state.HireDate
        })
            .then(response => {
                alert(response.data);
                this.refreshList();
            })
            .catch(error => {
                console.error('Error creating department:', error);
                alert('Failed');
            });
    }

    updateClick() {
        axios.put("https://localhost:44350/api/Department/UpdateDepartment", {
            Id: this.state.Id,
            FName: this.state.FName,
            DepartmentId:this.state.DepartmentId,
            Email:this.state.Email,
            Postion:this.state.Postion,
            Salary:this.state.Salary,
            HireDate:this.state.HireDate    
        })
            .then(response => {
                alert(response.data);
                this.refreshList();
            })
            .catch(error => {
                console.error('Error updating department:', error);
                alert('Failed');
            });
    }

    deleteClick(Id) {
    if (window.confirm('Are you sure?')) {
        axios.delete(`https://localhost:44350/api/Department/DeleteDepartment?departmentId=${Id}`)
            .then(response => {
                alert(response.data);
                this.refreshList();
            })
            .catch(error => {
                console.error('Error deleting department:', error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                }
                alert('Failed to delete department. Please try again later.');
            });
    }
}

imageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    axios.post('https://localhost:44350/api/Employee', formData)
        .then(res => {
            this.setState({ PhotoFileName: res.data });
        })
        .catch(error => {
            // Handle error
            console.error('Error uploading image: ', error);
        });
}


    // deleteClick(Id) {
    //     if (window.confirm('Are you sure?')) {
    //         axios.delete(`https://localhost:44350/api/Department/DeleteDepartment/${Id}`)
            
    //             .then(response => {
    //                 alert(response.data);
    //                 this.refreshList();
    //             })
    //             .catch(error => {
    //                 console.error('Error deleting department:', error);
    //                 alert('Failed');
    //             });
    //     }
    // }

    render() {
        const {
            items, // Change departments to items
            FName,
            modalTitle,
            DepartmentId,
            Email,
            Postion,
            Salary,
            Id,
            HireDate,
            PhotoPath
        } = this.state;

        return (
                <div>
                
                    <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.addClick()}>
                        Add Employee
                    </button>
                    <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>
                            EmployeeId
                        </th>
                        <th>
                            EmployeeName
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            DepartmentId
                        </th>
                        <th>
                            Postion
                        </th>
                        <th>
                            Salary
                        </th>
                        <th>
                            HireDate
                        </th>
                        <th>
                            Options
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(item=>
            <tr key={item.Id}>
                <td>{item.Id}</td>
                <td>{item.FName}</td>
                <td>{item.Email}</td>
                <td>{item.DepartmentId}</td>
                <td>{item.Postion}</td>
                <td>{item.Salary}</td>
                <td>{item.HireDate}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(item)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(item.Id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className='d-felx flex-row bd-highlight mb-3'>

                                <div className='p-2 w-50 bd-highlight'>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Employee Name</span>
                                    <input type="text" className="form-control"
                                        value={FName}
                                        onChange={this.changeName} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Employee Postion</span>
                                    <input type="text" className="form-control"
                                        value={Postion}
                                        onChange={this.changePostion} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Employee Salary</span>
                                    <input type="text" className="form-control"
                                        value={Salary}
                                        onChange={this.changeSalary} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Employee Email</span>
                                    <input type="text" className="form-control"
                                        value={Email}
                                        onChange={this.changeEmail} />
                                </div>
                                </div>

                                <div className='p-2 w-50 bd-highlight'>
                                    <image width="250px" height="250px"
                                    src={PhotoPath}/>
                                    <input className='m-2' type='file' onChange={this.imageUpload}/>
                                </div>


                                
                            
                            </div>
                            {Id == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {Id != 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
