import React from 'react';
import {Link, NavLink} from 'react-router-dom';

class Beranda extends React.Component {
    render(){
        return(
            <div className="container"> <br></br><br></br><br></br><br></br><br></br>
                <div className="row">
                    <div className="col-6">
                        <h4 className="d-flex justify-content-between align-items-center mb-2">
                            <span className="display-6">All of your next books collection in <br></br>one platform.</span>
                        </h4><br></br>
                        <h6 className='desc'>From applied literature to educational resources, <br></br>we have a lot of books to offer you. <br></br>We provide only the best books for rent.</h6>
                        <br></br><br></br>
                        <NavLink to='/buku' className="btn btn-dark btn-lg w-10" type="submit">Find Your Book <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/></svg>
                        </NavLink>
                    </div>
                    <div className="col-4">
                        <img src='https://cdn.dribbble.com/users/1361356/screenshots/5083713/media/a4e2dc22f35297957fcad26dd9598a21.png?compress=1&resize=1200x900&vertical=top' height="50%"></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default Beranda;