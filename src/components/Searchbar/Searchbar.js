import { useState } from 'react';
import PropTypes from 'prop-types'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './Searchbar.module.css';


export default function Searchbar({onSubmit}) {

    const [searchQuery, setSearchQuery] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        const searchFormQuery = searchQuery.trim();

        // searchQuery - is emty
        if (!searchFormQuery) {
            toast("to finds some, needs type some");
            setSearchQuery('');
            return;
        }


        onSubmit(searchFormQuery.toLowerCase());
    }

     return (
                    <>
                        <header className={s.Searchbar} id="searchbar">
                 <form className={s.form}
                     onSubmit={submitForm}
                 >
                                <button type="submit" className={s.button}>
                                    <span className={s.label}>Search</span>
                                </button>

                                <input
                                    className={s.input}
                                    type="text"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="Search images and photos"
                                    onChange={e=>setSearchQuery(e.target.value)}
                                    value={searchQuery}
                                />
                            </form>
             </header>
                   <ToastContainer/>
         </>
         
        )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}