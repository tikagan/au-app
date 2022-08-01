function TableHeader({ handleColumnSort, isSortingColumn, sortBy, columnName, dataType, columnTitle }) {
    return (
        <th>{columnTitle} 
            <button className="arrow-button" onClick ={(e) => handleColumnSort(columnName, dataType)}>
                <svg className={`arrow ${isSortingColumn[columnName] &&  sortBy.asc ? "asc" :  ""}` + 
                    `${isSortingColumn[columnName] &&  !sortBy.asc ? "desc" :  ""}` }
                     xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 100 100">
                    <polygon fill="currentcolor" points="50,16 85,85 15,85 50,16" />
                </svg>
            </button>
        </th>    
    )
};

export default TableHeader;