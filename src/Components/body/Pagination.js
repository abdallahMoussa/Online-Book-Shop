import { useEffect } from "react";

const Pagination = ({setPageNumber, currentPage})=>{
    let pages = Array(5).fill(0);

    if(currentPage<3){
        pages= pages.map((p,i)=>i+1)
    }else if(currentPage > 2146){
        pages= pages.map((p,i)=>2148+i-4)
    }
    else{
        let first = currentPage-2;
        pages= pages.map((p,i)=>first+i)
    }

    const tabClickHandler=(e)=>{
       setPageNumber(e.target.text)
    }
    const GoToFirstPage=()=>{
        setPageNumber(1)
    }
    const GoToLastPage=()=>{
        setPageNumber(2148)
    }

    useEffect(()=>{
        let tabs = document.querySelectorAll('.pageTabs');
        Array.from(tabs).find(t=>{
            if(t.text == currentPage){
                t.classList.remove('text-gray-500','bg-white','border');
                t.classList.add('text-white','bg-purple-500');
                t.style.color='black'
            }
        })
    },[])
    
    return (
        <div className="pagination flex">
            <div className="bg-white px-4 py-4 my-10 m-auto flex items-center justify-between border-t border-gray-200 sm:px-6"> 
                <a  onClick={GoToFirstPage}
                    href="#"
                    className="relative inline-flex items-center px-2 py-1 mr-3 border-gray-300 text-sm font-medium rounded-md duration-300 text-white bg-purple-600 hover:bg-purple-400"
                >
                    First Page
                </a>
                
            
                <div className=" sm:flex-1 sm:flex mt-1 sm:items-center sm:justify-between">
                
                    <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <span
                             className="relative p-1 rounded-l-md border-gray-300 bg-purple-600"
                        >
                        </span>
                       {
                        pages.map((p,index)=>
                            <a  key={index}
                                onClick={tabClickHandler}
                                className="bg-white pageTabs cursor-pointer border-gray-300 text-gray-500 hover:bg-purple-200 duration-300 relative inline-flex items-center px-4 py-1 border text-sm font-medium"
                            >
                                {p}
                            </a>
                        )
                       }
                    
                        <span
                         className="relative p-1 rounded-r-md  border-gray-300 bg-purple-600"
                        >
                        </span>
                    </nav>
                    </div>
                </div>
                <a  onClick={GoToLastPage}
                    href="#"
                    className="ml-3 relative inline-flex items-center px-2 py-1  border-gray-300 text-sm font-medium rounded-md bg-purple-600 text-white hover:bg-purple-400"
                >
                    Last Page
                </a>
            </div>
        </div>
      )
}
export default Pagination;