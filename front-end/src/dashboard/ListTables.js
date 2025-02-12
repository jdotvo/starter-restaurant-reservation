import { listTables } from "../utils/api";
import { useState, useEffect } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ClearButton from "./ClearButton";

function TableList() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  useEffect(loadTables, []);
  function loadTables() {
    const controller = new AbortController();
    listTables(controller.signal).then(setTables).catch(setTablesError);
    return () => controller.abort();
  }
  let display;
  if (tables.length) {
    display = tables.map((table) => {
        let badge;
        table.reservation_id ? badge = "badge badge-secondary" : badge = "badge badge-primary";
      return (
        <tr key={table.table_id}>
          <td>{table.table_name}</td>
          <td>{table.capacity}</td>
          <td data-table-id-status={table.table_id}>
            <h6 className={badge}>
            {table.reservation_id ? "Occupied" : "Free"}
            </h6>
          </td>
          <td>
              {table.reservation_id}
          </td>
          <td>
            {table.reservation_id ? (
              <ClearButton table_id={table.table_id} />
            ) : null}
          </td>
        </tr>
      );
    });
  }
  return (
    <div>
      <ErrorAlert error={tablesError} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Table</th>
            <th scope="col">Capacity</th>
            <th scope="col">Occupied</th>
            <th scope="col">Party Size</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{tables.length ? display : null}</tbody>
      </table>
      {!tables.length && "Please add at least 1 table"}
    </div>
  );
}
export default TableList;