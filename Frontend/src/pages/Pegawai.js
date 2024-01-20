import React from 'react';
import $ from 'jquery';
import axios from 'axios';

class Pegawai extends React.Component {
    constructor() {
        super();
        this.state = {
            pegawai: [], // array pegawai untuk menampung data pegawai
            nip: "",
            nama: "",
            alamat: "",
            action: "",
            search: "",
        };
    }

    // Fungsi untuk mengubah state berdasarkan perubahan input
    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // Menutup modal
    Close = () => {
        $("#modal").hide();
    }

    // Menampilkan form kosong untuk menambahkan pegawai baru
    Add = () => {
        $("#modal").show();
        this.setState({
            nip: "",
            nama: "",
            alamat: "",
            action: "insert"
        });
    }

    // Mengisi form dengan data pegawai yang dipilih untuk diedit
    Edit = (item) => {
        $("#modal").show();
        this.setState({
            nip: item.nip,
            nama: item.nama,
            alamat: item.alamat,
            action: "update",
            selectedItem: item
        });
    }

    // Mengambil data pegawai dari backend
    getPegawai = () => {
        let url = "http://localhost:1928/pegawai";
        axios.get(url)
            .then(response => {
                this.setState({ pegawai: response.data.pegawai });
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Fungsi pencarian berdasarkan keyword
    findPegawai = (event) => {
        let url = "http://localhost:1928/pegawai";
        if (event.keyCode === 13) {
            let form = {
                find: this.state.search
            }
            axios.post(url, form)
                .then(response => {
                    this.setState({ pegawai: response.data.pegawai });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    // Menyimpan atau memperbarui data pegawai ke backend
    SavePegawai = (event) => {
        event.preventDefault();
        let url = this.state.action === "insert" ? "http://localhost:1928/pegawai/save" : "http://localhost:1928/pegawai/update";
        let form = {
            nip: this.state.nip,
            nama: this.state.nama,
            alamat: this.state.alamat
        }
        axios.post(url, form)
            .then(response => {
                this.getPegawai(); // Memanggil data yang terbaru setelah simpan berhasil
            })
            .catch(error => {
                console.log(error);
            });
            axios.patch(url, form)
            .then(response => {
                this.getPegawai(); // Memanggil data yang terbaru setelah simpan berhasil
            })
            .catch(error => {
                console.log(error);
            });
        $("#modal").hide(); // Menutup form modal
    }

    // Menghapus data pegawai berdasarkan NIP
    Drop = (nip) => {
        let url = "http://localhost:1928/pegawai/" + nip;
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            axios.delete(url)
                .then(response => {
                    this.getPegawai(); // Memanggil data yang terbaru setelah hapus berhasil
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    componentDidMount() {
        this.getPegawai(); // Memanggil data pegawai pertama kali saat komponen dimuat
    }

    render() {
        return (
            <div className="container">
                <br />
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="display-6">Data Karyawan</span>
                </h4>
                <br />
                <div className="col-md-5">
                    <div className="form">
                        <input
                            type="text"
                            name="search"
                            value={this.state.search}
                            onChange={this.bind}
                            onKeyUp={this.findPegawai}
                            className="form-control form-input"
                            placeholder="Cari Karyawan"
                        />
                    </div>
                </div>
                <br />
                <div className="container">
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID Karyawan</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.pegawai.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.nip}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.alamat}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-success m-1"
                                            data-toggle="modal"
                                            data-target="#modal"
                                            onClick={() => this.Edit(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger m-1"
                                            onClick={() => this.Drop(item.nip)}
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
                    onClick={this.Add}
                    data-toggle="modal"
                    data-target="#modal"
                >
                    Tambah Karyawan
                </button>

                {/* Modal untuk manipulasi data */}
                <div className="modal modal" id="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title"><b>Data Karyawan</b></h4>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => this.Close()}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.SavePegawai}>
                                    ID Karyawan
                                    <input
                                        type="number"
                                        name="nip"
                                        value={this.state.nip}
                                        onChange={this.bind}
                                        className="form-control"
                                        required
                                    />
                                    Nama Karyawan
                                    <input
                                        type="text"
                                        name="nama"
                                        value={this.state.nama}
                                        onChange={this.bind}
                                        className="form-control"
                                        required
                                    />
                                    Alamat Karyawan
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

export default Pegawai;
