import React from 'react';
import $ from 'jquery';
import axios from 'axios';

class GudangBuku extends React.Component {
    constructor() {
        super();
        this.state = {
            buku: [], // array untuk menampung data buku
            kode: "",
            judul: "",
            penulis: "",
            penerbit: "",
            qty: "",
            action: "",
            search: "",
        };
    }

    // Fungsi untuk mengubah state berdasarkan perubahan input
    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // Menutup modal
    close = () => {
        $("#modal").hide();
    }

    // Menampilkan form kosong untuk menambahkan buku baru
    add = () => {
        $("#modal").show();
        this.setState({
            kode: "",
            judul: "",
            penulis: "",
            penerbit: "",
            qty: "",
            action: "insert"
        });
    }

    // Mengisi form dengan data buku yang dipilih untuk diedit
    edit = (item) => {
        $("#modal").show();
        this.setState({
            kode: item.kode,
            judul: item.judul,
            penulis: item.penulis,
            penerbit: item.penerbit,
            qty: item.qty,
            action: "update",
            selectedItem: item
        });
    }

    // Mengambil data buku dari backend
    getBuku = () => {
        let url = "http://localhost:1928/buku";
        axios.get(url)
            .then(response => {
                this.setState({ buku: response.data.buku });
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Fungsi pencarian berdasarkan keyword
    findBuku = (event) => {
        let url = "http://localhost:1928/buku";
        if (event.keyCode === 13) {
            let form = {
                find: this.state.search
            }
            axios.post(url, form)
                .then(response => {
                    this.setState({ buku: response.data.buku });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    // Menyimpan atau memperbarui data buku ke backend
    saveBuku = (event) => {
        event.preventDefault();
        let url = this.state.action === "insert" ? "http://localhost:1928/buku/save" : "http://localhost:1928/buku/update";
        let form = {
            kode: this.state.kode,
            judul: this.state.judul,
            penulis: this.state.penulis,
            penerbit: this.state.penerbit,
            qty: this.state.qty
        }
        axios.post(url, form)
            .then(response => {
                this.getBuku(); // Memanggil data yang terbaru setelah simpan berhasil
            })
            .catch(error => {
                console.log(error);
            });
            axios.patch(url, form)
            .then(response => {
                this.getBuku(); // Memanggil data yang terbaru setelah simpan berhasil
            })
            .catch(error => {
                console.log(error);
            });
        $("#modal").hide(); // Menutup form modal
    }

    // Menghapus data buku berdasarkan Kode
    dropBuku = (kode) => {
        let url = "http://localhost:1928/buku/" + kode;
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            axios.delete(url)
                .then(response => {
                    this.getBuku(); // Memanggil data yang terbaru setelah hapus berhasil
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    componentDidMount() {
        this.getBuku(); // Memanggil data buku pertama kali saat komponen dimuat
    }

    render() {
        return (
            <div className="container">
                <br />
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="display-6">Data Buku</span>
                </h4>
                <br />
                <div className="col-md-5">
                    <div className="form">
                        <input
                            type="text"
                            name="search"
                            value={this.state.search}
                            onChange={this.bind}
                            onKeyUp={this.findBuku}
                            className="form-control form-input"
                            placeholder="Cari Buku"
                        />
                    </div>
                </div>
                <br />
                <div className="container">
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Kode Buku</th>
                            <th>Judul</th>
                            <th>Penulis</th>
                            <th>Penerbit</th>
                            <th>Qty</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.buku.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.kode}</td>
                                    <td>{item.judul}</td>
                                    <td>{item.penulis}</td>
                                    <td>{item.penerbit}</td>
                                    <td>{item.qty}</td>
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
                                            onClick={() => this.dropBuku(item.kode)}
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
                    Tambah Buku
                </button>

                {/* Modal untuk manipulasi data */}
                <div className="modal modal" id="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title"><b>Data Buku</b></h4>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => this.close()}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.saveBuku}>
                                    Kode Buku
                                    <input
                                        type="text"
                                        name="kode"
                                        value={this.state.kode}
                                        onChange={this.bind}
                                        className="form-control"
                                        required
                                    />
                                    Judul Buku
                                    <input
                                        type="text"
                                        name="judul"
                                        value={this.state.judul}
                                        onChange={this.bind}
                                        className="form-control"
                                        required
                                    />
                                    Penulis Buku
                                    <input
                                        type="text"
                                        name="penulis"
                                        value={this.state.penulis}
                                        onChange={this.bind}
                                        className="form-control"
                                        required
                                    />
                                    Penerbit Buku
                                    <input
                                        type="text"
                                        name="penerbit"
                                        value={this.state.penerbit}
                                        onChange={this.bind}
                                        className="form-control"
                                        required
                                    />
                                    Quantity
                                    <input
                                        type="number"
                                        name="qty"
                                        value={this.state.qty}
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

export default GudangBuku;
