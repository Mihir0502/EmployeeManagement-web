import React, { Component } from 'react';
import axios from 'axios';

export class Employee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            modalTitle: "",
            FName: "",
            DepartmentId: "",
            Email: "",
            Postion: "",
            Salary: 0,
            Id: 0,
            HireDate: "",
            PhotoPath: 'https://localhost:44350/api/Employee/UploadImage',
            emailError: '',
        }
    }

    refreshList() {
        axios.get("https://localhost:44350/api/Employee/GetEmployee")
            .then(response => {
                this.setState({ items: response.data, itemsWithoutFilter: response.data });
            })
            .catch(error => {
                console.error('Error fetching items:', error);
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
        const salary = e.target.value;
        if (!isNaN(salary) || salary === '') {
            this.setState({ Salary: salary });
        }
    }

    changeEmail = (e) => {
        const email = e.target.value;
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        this.setState({ Email: email, emailError: isValidEmail ? '' : 'Please enter a valid email address.' });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Employee",
            Id: 0,
            FName: "",
            DepartmentId: 0,
            Email: '',
            Postion: '',
            Salary: 0,
        });
    }

    editClick(item) {
        this.setState({
            modalTitle: "Edit Employee",
            Id: item.Id,
            FName: item.FName,
            DepartmentId: item.DepartmentId,
            Email: item.Email,
            Postion: item.Postion,
            Salary: item.Salary,
            HireDate: item.HireDate
        });
    }

    createClick() {
        const { FName, DepartmentId, Email, Postion, Salary } = this.state;

        if (!FName || !DepartmentId || !Email || !Postion || !Salary) {
            alert("Please fill in all required fields.");
            return;
        }

        axios.post('https://localhost:44350/api/Employee/InsertEmployee', {
            FName: FName,
            DepartmentId: DepartmentId,
            Email: Email,
            Postion: Postion,
            Salary: Salary,
        })
            .then(response => {
                alert(response.data);
                this.refreshList();
            })
            .catch(error => {
                console.error('Error creating employee:', error);
                alert('Failed');
            });
    }

    updateClick() {
        const { FName, DepartmentId, Email, Postion, Salary } = this.state;

        if (!FName || !DepartmentId || !Email || !Postion || !Salary) {
            alert("Please fill in all required fields.");
            return;
        }

        axios.post('https://localhost:44350/api/Employee/UpdateEmployee', {
            Id: this.state.Id,
            FName: FName,
            DepartmentId: DepartmentId,
            Email: Email,
            Postion: Postion,
            Salary: Salary,
            HireDate: this.state.HireDate
        })
            .then(response => {
                alert(response.data);
                this.refreshList();
            })
            .catch(error => {
                console.error('Error updating employee:', error);
                alert('Failed');
            });
    }

    deleteClick(FName) {
        if (window.confirm('Are you sure?')) {
            axios.delete(`https://localhost:44350/api/Employee/DeleteEmployee?FName=${FName}`)
                .then(response => {
                    alert(response.data);
                    this.refreshList();
                })
                .catch(error => {
                    console.error('Error deleting employee:', error);
                    alert('Failed to delete employee. Please try again later.');
                });
        }
    }

    render() {
        const {
            items,
            FName,
            modalTitle,
            Email,
            Postion,
            Salary,
            Id,
            PhotoPath,
            emailError,
        } = this.state;

        return (
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Employee
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>EmployeeId</th>
                            <th>EmployeeName</th>
                            <th>Email</th>
                            <th>DepartmentId</th>
                            <th>Postion</th>
                            <th>Salary</th>
                            <th>HireDate</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item =>
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
                                        onClick={() => this.editClick(item)}>
                                        Edit
                                    </button>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(item.FName)}>
                                        Delete
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
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className='d-felx flex-row bd-highlight mb-3'>
                                    <div className='p-2 w-50 bd-highlight'>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Employee Name</span>
                                            <input type="text" className="form-control" value={FName} onChange={this.changeFName} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Employee Position</span>
                                            <input type="text" className="form-control" value={Postion} onChange={this.changePostion} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Employee Salary</span>
                                            <input type="text" className="form-control" value={Salary} onChange={this.changeSalary} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Employee Email</span>
                                            <input
                                                type="text"
                                                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                                                value={Email}
                                                onChange={this.changeEmail}
                                            />
                                            {emailError && <div className="invalid-feedback">{emailError}</div>}
                                        </div>
                                    </div>
                                    <div className='p-2 w-50 bd-highlight'>
                                        <img width="250px" height="250px" src={PhotoPath} alt="Employee" />
                                        <input className='m-2' type='file' onChange={this.imageUpload} />
                                    </div>
                                </div>
                                {Id === 0 ?
                                    <button type="button" className="btn btn-primary float-start" onClick={() => this.createClick()}>Create</button>
                                    : null}

                                {Id !== 0 ?
                                    <button type="button" className="btn btn-primary float-start" onClick={() => this.updateClick()}>Update</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
