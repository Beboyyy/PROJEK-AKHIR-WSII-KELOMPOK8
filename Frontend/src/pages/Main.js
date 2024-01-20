import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Beranda from './Beranda';
import Pegawai from './Pegawai';
import Pelanggan from './Pelanggan';
import Buku from './Buku';


const Main = () => (
    
    <Switch>
        <Route exact path="/" component={Beranda} />
        <Route path="/pelanggan" component={Pelanggan} />
        <Route path="/buku" component={Buku} />
        <Route path="/pegawai" component={Pegawai} />
    </Switch>
    
    
)

export default Main;