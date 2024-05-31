// import React, { Component } from 'react';
// import axios from 'axios'; // Import axios

// export class Department extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             items: [], 
//             modalTitle: "",
//             Name: "",
//             Id: 0,
//             Location: ""
//         }
//     }




//     refreshList() {
//         axios.get("https://localhost:44350/api/Department/GetDepartment")
//             .then(response => {
//                 this.setState({ items: response.data, itemsWithoutFilter: response.data });
//             })
//             .catch(error => {
//                 console.error('Error fetching items:', error);
//             });
//     }

//     componentDidMount() {
//         this.refreshList();
//     }

//     changeName = (e) => {
//         this.setState({ Name: e.target.value });
//         this.setState({Location: e.target.value});
//     }

//     addClick() {
//         this.setState({
//             modalTitle: "Add Department",
//             Id: 0,
//             Name: "",
//             Location: ''
//         });
//     }

//     editClick(item) {
//         this.setState({
//             modalTitle: "Edit Department",
//             Id: item.Id,
//             Name: item.Name,
//             Location: item.Location
//         });
//     }

//     createClick() {
//         axios.post('https://localhost:44350/api/Department', {
//             Name: this.state.Name,
//             Location: this.state.Location,
//             Id: this.state.Id
//         })
//             .then(response => {
//                 alert(response.data);
//                 this.refreshList();
//             })
//             .catch(error => {
//                 console.error('Error creating department:', error);
//                 alert('Failed');
//             });
//     }

//     updateClick() {
//         axios.put("https://localhost:44350/api/Department/UpdateDepartment", {
//            Id: this.state.Id,
//            Location: this.state.Location,
//            Name: this.state.Name

//         })
//             .then(response => {
//                 alert(response.data);
//                 this.refreshList();
//             })
//             .catch(error => {
//                 console.error('Error updating department:', error);
//                 alert('Failed');
//             });
//     }

//     deleteClick(Id) {
//         if (window.confirm('Are you sure?')) {
//             axios.delete(`https://localhost:44350/api/Department/DeleteDepartment?departmentId=${Id}`)
//                 .then(response => {
//                     alert(response.data);
//                     this.refreshList();
//                 })
//                 .catch(error => {
//                     console.error('Error deleting department:', error);
//                     if (error.response) {
//                         console.error('Response data:', error.response.data);
//                         console.error('Response status:', error.response.status);
//                     }
//                     alert('Failed to delete department. Please try again later.');
//                 });
//         }
//     }

//     // deleteClick(Id) {
//     //     if (window.confirm('Are you sure?')) {
//     //         axios.delete(`https://localhost:44350/api/Department/DeleteDepartment/${Id}`)

//     //             .then(response => {
//     //                 alert(response.data);
//     //                 this.refreshList();
//     //             })
//     //             .catch(error => {
//     //                 console.error('Error deleting department:', error);
//     //                 alert('Failed');
//     //             });
//     //     }
//     // }

//     render() {
//         const {
//             items, // Change departments to items
//             modalTitle,
//             Id,
//             Name,
//             Locattion
//         } = this.state;

//         return (
//             <div>

//                 <button type="button"
//                     className="btn btn-primary m-2 float-end"
//                     data-bs-toggle="modal"
//                     data-bs-target="#exampleModal"
//                     onClick={() => this.addClick()}>
//                     Add Department
//                 </button>
//                 <table className="table table-striped">
//                     <thead>
//                         <tr>
//                             <th>
//                                 DepartmentId
//                             </th>
//                             <th>
//                                 DepartmentName

//                             </th>
//                             <th>
//                                 Location
//                             </th>
//                             <th>
//                                 Options
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {items.map(item =>
//                             <tr key={item.Id}>
//                                 <td>{item.Id}</td>
//                                 <td>{item.Name}</td>
//                                 <tb>{item.Location}</tb>
//                                 <td>
//                                     <button type="button"
//                                         className="btn btn-light mr-1"
//                                         data-bs-toggle="modal"
//                                         data-bs-target="#exampleModal"
//                                         onClick={() => this.editClick(item)}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
//                                             <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
//                                             <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
//                                         </svg>
//                                     </button>

//                                     <button type="button"
//                                         className="btn btn-light mr-1"
//                                         onClick={() => this.deleteClick(item.Id)}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
//                                             <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
//                                         </svg>
//                                     </button>

//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>

//                 <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
//                     <div className="modal-dialog modal-lg modal-dialog-centered">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">{modalTitle}</h5>
//                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
//                                 ></button>
//                             </div>

//                             <div className="modal-body">
//                                 <div className="input-group mb-3">
//                                     <span className="input-group-text">DepartmentName</span>
//                                     <input type="text" className="form-control"
//                                         value={Name}
//                                         onChange={this.changeName} />
//                                 </div>

//                                 {Id == 0 ?
//                                     <button type="button"
//                                         className="btn btn-primary float-start"
//                                         onClick={() => this.createClick()}
//                                     >Create</button>
//                                     : null}

//                                 {Id != 0 ?
//                                     <button type="button"
//                                         className="btn btn-primary float-start"
//                                         onClick={() => this.updateClick()}
//                                     >Update</button>
//                                     : null}

//                             </div>

//                         </div>
//                     </div>
//                 </div>


//             </div>
//         )
//     }
// }

import React, { Component } from 'react';
import axios from 'axios';

export class Department extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            modalTitle: "",
            Name: "",
            Id: 0,
            Location: ""
        }
    }

    refreshList() {
        axios.get("https://localhost:44350/api/Department/GetDepartment")
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

    changeName = (e) => {
        this.setState({ Name: e.target.value });
    }

    changeLocation = (e) => {
        this.setState({ Location: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Department",
            Id: 0,
            Name: "",
            Location: ''
        });
    }

    editClick(item) {
        this.setState({
            modalTitle: "Edit Department",
            Id: item.Id,
            Name: item.Name,
            Location: item.Location
        });
    }

    createClick() {
        axios.post('https://localhost:44350/api/Department', {
            Name: this.state.Name,
            Location: this.state.Location,
            Id: this.state.Id
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
            Location: this.state.Location,
            Name: this.state.Name
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

    render() {
        const {
            items,
            modalTitle,
            Id,
            Name,
            Location
        } = this.state;

        return (
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Department
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>DepartmentId</th>
                            <th>DepartmentName</th>
                            <th>Location</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item =>
                            <tr key={item.Id}>
                                <td>{item.Id}</td>
                                <td>{item.Name}</td>
                                <td>{item.Location}</td>
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
                                        onClick={() => this.deleteClick(item.Id)}>
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
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Department Name</span>
                                    <input type="text" className="form-control" value={Name} onChange={this.changeName} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Location</span>
                                    <input type="text" className="form-control" value={Location} onChange={this.changeLocation} />
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
        )
    }
}
