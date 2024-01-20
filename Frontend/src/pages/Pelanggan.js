import React from 'react';
import axios from 'axios';

class Pelanggan extends React.Component {
    constructor() {
        super();
        this.state = {
            pelanggan: [],
            id: "",
            nama: "",
            alamat: "",
            action: "",
            search: "",
        };
    }

    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    close = () => {
        document.getElementById("modal").style.display = "none";
    }

    add = () => {
        document.getElementById("modal").style.display = "block";
        this.setState({
            id: "",
            nama: "",
            alamat: "",
            action: "insert"
        });
    }

    edit = (item) => {
        document.getElementById("modal").style.display = "block";
        this.setState({
            id: item.id,
            nama: item.nama,
            alamat: item.alamat,
            action: "update",
            selectedItem: item
        });
    }

    getPelanggan = () => {
        let url = "http://localhost:1928/pelanggan";
        axios.get(url)
            .then(response => {
                this.setState({ pelanggan: response.data.pelanggan });
            })
            .catch(error => {
                console.log(error);
            });
    }

    findPelanggan = (event) => {
        let url = "http://localhost:1928/pelanggan";
        if (event.keyCode === 13) {
            let form = {
                find: this.state.search
            }
            axios.post(url, form)
                .then(response => {
                    this.setState({ pelanggan: response.data.pelanggan });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    savePelanggan = (event) => {
        event.preventDefault();
        let url = this.state.action === "insert" ? "http://localhost:1928/pelanggan/save" : "http://localhost:1928/pelanggan/update";
        let form = {
            id: this.state.id,
            nama: this.state.nama,
            alamat: this.state.alamat
        }
        axios.post(url, form)
            .then(response => {
                this.getPelanggan();
            })
            .catch(error => {
                console.log(error);
            });
            axios.patch(url, form)
            .then(response => {
                this.getPelanggan();
            })
            .catch(error => {
                console.log(error);
            });
        document.getElementById("modal").style.display = "none";
    }

    drop = (id) => {
        let url = "http://localhost:1928/buku/" + id;
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            axios.delete(url)
                .then(response => {
                    this.getPelanggan();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    componentDidMount() {
        this.getPelanggan();
    }

    render() {
        return (
            <div className="container">
                <br />
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="display-6">Data Pelanggan</span>
                </h4>
                <br />
                <div className="col-md-5">
                    <div className="form">
                        <input
                            type="text"
                            name="search"
                            value={this.state.search}
                            onChange={this.bind}
                            onKeyUp={this.findPelanggan}
                            className="form-control form-input"
                            placeholder="Cari Pelanggan"
                        />
                    </div>
                </div>
                <br />
                <div className="container">
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID Pelanggan</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.pelanggan.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.alamat}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-success m-1"
                                            data-toggle="modal"
                                            data-target="#modal"
                                            onClick={() => this.edit(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger m-1"
                                            onClick={() => this.drop(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <br />
                <button
                    className="btn btn-primary btn-lg"
                    onClick={this.add}
                    data-toggle="modal"
                    data-target="#modal"
                >
                    Tambah Pelanggan
                </button>

                <div className="modal modal" id="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title"><b>Data Pelanggan</b></h4>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => this.close()}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.savePelanggan}>
                                    ID Pelanggan
                                    <input
                                        type="number"
                                        name="id"
                                        value={this.state.id}
                                        onChange={this.bind}
                                        className="form-control"
                                        required
                                    />
                                    Nama Pelanggan
                                    <input
                                        type="text"
                                        name="nama"
                                        value={this.state.nama}
                                        onChange={this.bind}
                                        className="form-control"
                                        required
                                    />
                                    Alamat Pelanggan
                                    <input
                                        type="text"
                                        name="alamat"
                                        value={this.state.alamat}
                                        onChange={this.bind}
                                        className="form-control"
                                        required
                                    />
                                    <button className="btn btn-primary btn-block" type="submit">
                                        Save
                                    </button>
                                </form>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pelanggan;
