import { useState, useEffect } from 'react';

import DataTable from '../components/DataTable'

const dataTableData = [
  {
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    age: 27,
    id : "cell1",
    status: "Active",
    role: "Admin",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    title: "Product Directives Officer",
    department: "Intranet",
    age: 32,
    id : "cell2",

    status: "Active",
    role: "Owner",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Esther Howard",
    email: "esther.howard@example.com",
    title: "Forward Response Developer",
    department: "Directives",
    status: "Active",
    age: 21,
    id : "cell3",

    role: "Member",
    imgUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  }
];

let dataTableColumns = [
  {
    header: 'Brand',
    accessor: 'brand',
    type : "filter"

  },
  {
    header: 'Category',
    accessor: 'category',
  },   
  
  {
    header: 'Title',
    accessor: 'title',
  },   {
    header: 'Price',
    accessor: 'price',
  },   {
    header: 'Stock',
    accessor: 'stock',
  },
]

let setSkip = 0;
let setLimit = 5;




let dataTableProps = {
  showEdit: true,
  showDelete: true,
  heading : 'Datatable Heading',
  subHeading : 'Datatable subheading',


}




export default function Home() {
    const [ariaInfo, setAriaInfo] = useState([]);

    const getDummyData = async (skip, limit, pageSize, pageIndex) => {

        console.log(skip, limit);
        const res = await fetch(`https://dummyjson.com/products/?skip=`+skip+`&limit=` + limit)
        const json = await res.json()
      
        return {data: json.products}  
      };

    useEffect(() => {
   
        async function fetchData() {
      
        let data = await getDummyData(setSkip, setLimit);
      
        console.log(data);
      
        setAriaInfo(data.data); // sets ariaInfo state
      
                
        }
      
        fetchData()
      
      }, []);


  return (
    <div className="text-center p-16 m-10 border border-gray-400">

<DataTable dataTableDataR={ariaInfo}  dataTableColumns={dataTableColumns} {...dataTableProps} getDummyData={getDummyData}/>

    </div>
  );
}