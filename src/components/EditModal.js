import React,{useState, useEffect} from "react";
import { toast } from "react-toastify";

const EditModal = (props) => {
    const {actionEdit, setActionEdit, editId = null, editApi, editData} = props;

    const [data, setData] = useState({
        title : '',
        brand : '',
        category : '',
        price : 0,
        stock : 0
    })

    useEffect(() => {
        setUpdateData(editData)
    },[editData])

    const setUpdateData = (editVariables) => {
        setData(editVariables)
    }

    const checkValidation =  () => {
      if(data.brand === ''){
        toast(`Brand is required!`, { hideProgressBar: true, autoClose: 2000, type: 'warning' });
        return false;
      }
      else if(data.brand.length < 3){
        toast(`Brand should be minimum 3 character long`, { hideProgressBar: true, autoClose: 2000, type: 'warning' });
        return false;
      }
      if(data.category === ''){
        toast(`Category is required!`, { hideProgressBar: true, autoClose: 2000, type: 'warning' });
        return false;
      }
      else if(data.category.length < 3){
        toast(`Category should be minimum 3 character long`, { hideProgressBar: true, autoClose: 2000, type: 'warning' });
        return false;
      }
      if(data.title === ''){
        toast(`Title is required!`, { hideProgressBar: true, autoClose: 2000, type: 'warning' });
        return false;
      }
      else if(data.title.length < 3){
        toast(`Title should be minimum 3 character long`, { hideProgressBar: true, autoClose: 2000, type: 'warning' });
        return false;
      }
      if(data.price === ''){
        toast(`Title is required!`, { hideProgressBar: true, autoClose: 2000, type: 'warning' });
        return false;
      }
      else if(data.price <= 0){
        toast(`Price should be greater than 0`, { hideProgressBar: true, autoClose: 2000, type: 'warning' });
        return false;
      }
      if(data.stock === ''){
        toast(`Stock is required!`, { hideProgressBar: true, autoClose: 2000, type: 'warning' });
        return false;
      }
      else if(data.stock <= 0){
        toast(`Stock should be greater than 0`, { hideProgressBar: true, autoClose: 2000, type: 'warning' });
        return false;
      }
      else{
        editApi(editId, data);
      }
    }
    return(
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                     
                        <h1 className="text-2xl font-semibold leading-1 text-gray-900 text-center pb-8" id="modal-title">Edit Product</h1>
                      
                    <div className="">

                        <form className="w-full max-w-sm">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Brand
                            </label>
                            </div>
                            <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" 
                            value={data.brand} 
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    brand : e.target.value
                                })
                            }}
                            />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                Category
                            </label>
                            </div>
                            <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="text"
                            value={data.category} 
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    category : e.target.value
                                })
                             }} 
                            />
                            </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                Title
                            </label>
                            </div>
                            <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="text"
                            value={data.title} 
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    title : e.target.value
                                })
                             }} 
                            />
                            </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                Price
                            </label>
                            </div>
                            <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="number"
                            value={data.price} 
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    price : e.target.value
                                })
                             }} 
                            />
                            </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                Stock
                            </label>
                            </div>
                            <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="number"
                            value={data.stock} 
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    stock : e.target.value
                                })
                             }} 
                            />
                            </div>
                        </div>
                       
                        </form>

                       
                       
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" onClick={() =>  checkValidation()} >Update</button>
                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setActionEdit(false)}
                    >Cancel</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal;