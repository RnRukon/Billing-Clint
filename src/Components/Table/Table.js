import React, { useEffect, useState } from 'react';
import Pagination from "react-custom-pagination";
import { useDeleteBillingsMutation, useGetBillingsQuery } from '../../Redux/Featurse/Billings/BillingsApi';

import Modal from '../Modal/Modal';
import EditFrom from './EditFrom';

import { BiBookAdd } from 'react-icons/bi'
import AddFrom from './AddFrom';
import { Alert } from '../Alert/Alert';


const Table = () => {


    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('')

    const { data: GetBillings, isLoading: isLoadingGetBillings, isError: isErrorGeltBillings } = useGetBillingsQuery(page);


    const [handleDelete, { isError, isLoading, isSuccess, }] = useDeleteBillingsMutation()

    // filter for searching 
    const filterBilling = GetBillings?.result?.billing?.filter(billing =>
        billing.email.includes(filter) ||
        billing.phone.includes(filter) ||
        billing.fullName.includes(filter) ||
        billing._id.includes(filter)
    )





    useEffect(() => {
        if (isErrorGeltBillings) {
            Alert({ title: 'Server Error', type: 'error' })
        }
        if (isError) {
            Alert({ title: 'Server Error', type: 'error' })
        }
        if (isSuccess) {
            Alert({ title: 'Delete Successfully', type: 'success' })
        }

    }, [isError, isSuccess, isLoading, isErrorGeltBillings]);


    const paginate = (number) => {
        setPage(number);
    };



    const editButtonModalOpen = <button onClick={() => setShowModalUpdate(true)} className="p-5" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
    </button>
    const addButtonModalOpen = <button onClick={() => setShowModalAdd(true)} className="p-5" >
        <span className=' flex justify-center items-center text-slate-50 gap-2'> New Add <BiBookAdd /></span>
    </button>



    return (
        <div>

            <nav className=' flex justify-between items-center m-5 px-10 bg-slate-500 py-5 rounded-full'>
                <div className=' flex  gap-7'>
                    <h1 className=' text-slate-50'>Billings</h1>
                    <input className=' bg-slate-50 py-2 px-2 border-0 focus:border-0 focus:outline-none rounded-md'

                        onChange={e => setFilter(e.target.value)}
                        type="text"
                        name="" id=""
                        placeholder='Search'
                    />
                </div>
                <div>
                    <Modal showModal={showModalAdd}
                        setShowModal={setShowModalAdd}
                        title='Add Billing'
                        modalOpenButton={addButtonModalOpen}>

                        <AddFrom />
                    </Modal>
                </div>
            </nav>

            {isLoadingGetBillings ? <div className=' text-center font-bold text-slate-50'>
                <p>Loading...</p>
            </div> : <div>
                <div className="overflow-auto rounded-lg border border-gray-200 shadow-md m-5">

                    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">

                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Billing Id</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Full Name</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Email</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Phone</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Paid Amount</th>
                                <th scope="col" className="px-6 py-4 font-medium text-end text-gray-900">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">

                            {filterBilling?.map((billing) => (

                                <tr key={billing?._id} className="hover:bg-gray-50">
                                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                        {billing._id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {billing.fullName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {billing.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {billing.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {billing.paidAmount}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className=" flex justify-end">

                                            <Modal
                                                showModal={showModalUpdate}
                                                setShowModal={setShowModalUpdate}
                                                title='Update Billing'
                                                modalOpenButton={editButtonModalOpen}>

                                                <EditFrom id={billing._id} />
                                            </Modal>


                                            <button
                                                onClick={() => handleDelete(billing._id)}
                                                className=' text-red-400 p-2 rounded-full'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                </div>
                <div style={{ width: "500px" }}>
                    <Pagination
                        totalPosts={GetBillings?.result?.total}
                        postsPerPage={10}
                        paginate={paginate}
                        view={5}
                        showLast={true}
                        showFirst={true}
                        showIndex={true}
                    />
                </div>
            </div>}
        </div>
    );
};

export default Table;