import { useState, useEffect, useRef } from "react";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import DataTable from "../components/DataTable";
import { toast } from "react-toastify";

let dataTableColumns = [
  {
    header: "Brand",
    accessor: "brand",
    type: "filter",
  },
  {
    header: "Category",
    accessor: "category",
  },

  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Price",
    accessor: "price",
  },
  {
    header: "Stock",
    accessor: "stock",
  },
];

let setSkip = 0;
let setLimit = 10;

let dataTableProps = {
  showEdit: true,
  showDelete: true,
  heading: "Datatable Heading",
  subHeading: "Datatable subheading",
};

export default function Home() {
  const [ariaInfo, setAriaInfo] = useState({
    products: [],
    skip: null,
    limit: null,
    total: null,
  });

  const [actionDelete, setActionDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null)
  const [actionEdit, setActionEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({

  })
  const seachText = useRef();

  const getDummyData = async (skip, limit, query) => {
    let res;
    if (query) {
      res = await fetch(
        `https://dummyjson.com/products/search?skip=${skip}&limit=${limit}&q=${query}`
      );
    } else {
      res = await fetch(
        `https://dummyjson.com/products?skip=${skip}&limit=${limit}&q=${query}`
      );
    }
    const json = await res.json();
    return json;
  };

  useEffect(() => {
    async function fetchData() {
      let data = await getDummyData(0, 5);
      setAriaInfo(data); // sets ariaInfo state
    }

    fetchData();
  }, []);

  const deleteApi = async(id) => {
    let apiResponse = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
    })
    .then(async(res) => {
      let response = res.json();
      console.log(response);
      toast(`Product is deleted.`, { hideProgressBar: true, autoClose: 2000, type: 'success' });
      setDeleteId(null);
      setActionDelete(false)
      await getDummyData(0,5)
    })
    .catch(err => {
      toast(`Internal server error!`, { hideProgressBar: true, autoClose: 2000, type: 'error' });
    });      
  }

  const editApi = async(id, data) => {
    let apiResponse = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PUT', /* or PATCH */
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(async(res) => {
      let response = res.json();
      toast(`Product updated successfully.`, { hideProgressBar: true, autoClose: 2000, type: 'success' });
      setEditId(null);
      setActionEdit(false)
      await getDummyData(0,5)
    })
    .catch(err => {
      toast(`Internal server error!`, { hideProgressBar: true, autoClose: 2000, type: 'error' });
    });      
  }

  const search = async (query) => {
    seachText.current = { value: query };
    let data = await getDummyData(0, 5, query);
    setAriaInfo(data);
  };

  const moveNext = async (skip, limit) => {
    let data = {};
    if (seachText.current && seachText.current.value !== "") {
      data = await getDummyData(skip + limit, limit, seachText.current.value);
    } else {
      data = await getDummyData(skip + limit, limit);
    }
    if (data.limit < limit) {
      data.limit = limit;
    }
    setAriaInfo(data);
  };

  const movePrev = async (skip, limit) => {
    let data = {};
    if (seachText.current && seachText.current.value !== "") {
      data = await getDummyData(skip - limit, limit, seachText.current.value);
    } else {
      data = await getDummyData(skip - limit, limit);
    }
    if (data.limit < limit) {
      data.limit = limit;
    }
    setAriaInfo(data);
  };

  const changeLimit = async (skip, limit) => {
    let data = {};
    if (seachText.current && seachText.current.value !== "") {
      data = await getDummyData(skip, limit, seachText.current.value);
    } else {
      data = await getDummyData(skip, limit);
    }
    setAriaInfo(data);
  };

  return (
    <div>
      {
        actionDelete &&
        <DeleteModal 
        actionDelete={actionDelete} 
        setActionDelete={(action) => setActionDelete(action)} 
        deleteId={deleteId}
        deleteApi={(id) => deleteApi(id)}
        editData={editData}
        />
      }

      {
        actionEdit &&
        <EditModal actionEdit={actionEdit} setActionEdit={(action) => setActionEdit(action)} editId={editId} editApi={(id, data) => editApi(id, data)} editData={editData}/>
      }

    
      
      <div className="text-center p-16 m-10 border border-gray-400">
        <DataTable
          dataTableDataR={ariaInfo.products || []}
          skip={ariaInfo.skip}
          limit={ariaInfo.limit}
          total={ariaInfo.total}
          moveNext={moveNext}
          movePrev={movePrev}
          changeLimit={changeLimit}
          dataTableColumns={dataTableColumns}
          {...dataTableProps}
          search={search}
          deleteValue={actionDelete}
          setActionDelete={(action, deleteId) => {
              if(action === true){
                setDeleteId(deleteId)
                setActionDelete(action);
              }
              else{
                setDeleteId(null)
                setActionDelete(action);
              }
          }}

          deleteValue={actionEdit}
          editData={editData}
          setEditData={(data) => setEditData(data)}
          setActionEdit={(action, editId, editData) => {
              console.log('EDIT DATA XXXXXXX ----', editData)
              if(action === true){
                setEditData(editData);
                setEditId(editId)
                setActionEdit(action);
              }
              else{
                setEditId(null)
                setEditData({});
                setActionEdit(action);
              }
          }}
          getDummyData={getDummyData}
        />
      </div>
    </div>
  );
}
