import { Container, Table, Button, Form} from "react-bootstrap";
// import SelectComponent from "./SelectComponent";
// import { capitalize } from './../utils/capitalize'
import React, { useState } from "react";

    


export default function Historial({rows}) {
  const rows_dev = [
    {
      id: 0,
      name: 'Jaime Wallace',
      company: 'UBERLUX',
      active: false,
      country: 'Peru'
    },
    {
      id: 1,
      name: 'Jaime Wallace',
      company: 'UBERLUX',
      active: false,
      country: 'Peru'
    }
  ]

  const filter = (event) => {
    const value = event.target.value
  
    if (value) { // https://www.sitepoint.com/create-sortable-filterable-table-react/
      setRows([ ...rows.filter(row => {
        return Object.values(row)
          .join('')
          .toLowerCase()
          .includes(value)
      }) ])
    } else {
      setRows(rows)
    }
  }

  const handleKeyPress = (e, newValue) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Evita que el formulario se envíe
        if (newValue.trim() !== "") {
          addArrayItem(field, newValue.trim());
          setNewFilter("");
        }
      }
    }

  rows = rows? rows: rows_dev; 

  const [sortedRows, setRows] = useState(rows);
  const [newFilter, setNewFilter] = useState("");


  

  return (
    <Container>

       {/* <Form.Group className="mb-3">
        <Form.Label>Filter</Form.Label>
        <Form.Control
          type="text"
          value={newFilter}
          onKeyDown={(e) =>
            handleKeyPress(e, e.target.value)
          }
          onChange={(e) => filter(e)}
          placeholder="Filtrar por"
        /> */}
        {/* <SelectComponent  */}
          {/* onChange={(event) => sort()}> */}
          {/* {Object.keys(rows[0]).map((entry, index) => (
            <option value={entry} key={index}>
              Order by {capitalize(entry)}
            </option>
          ))} */}
        {/* </SelectComponent> */}
        {/* <Button onClick={updateOrder}>Switch order ({order})</Button>
      </Form.Group> */}
      <h4>Historial</h4>
      <Table striped bordered hover >
        <thead>
          <tr>
            {Object.keys(rows[0]).map((entry, index) => (
              <th key= {index}> {entry}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((entry, columnIndex) => (
                <td key={columnIndex}>{entry}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}




{/* Input */}
      {/* <Form.Group className="mb-3">
        <Form.Label>Filter</Form.Label>
        <Form.Control
          type="text"
          value={newFilter}
          onKeyDown={(e) =>
            handleKeyPress(e, e.target.value)
          }
          onChange={(e) => filter(e)}
          placeholder="Filtrar por"
        /> */}
        {/* <SelectComponent  */}
          {/* onChange={(event) => sort()}> */}
          {/* {Object.keys(rows[0]).map((entry, index) => (
            <option value={entry} key={index}>
              Order by {capitalize(entry)}
            </option>
          ))} */}
        {/* </SelectComponent> */}
        {/* <Button onClick={updateOrder}>Switch order ({order})</Button>
      </Form.Group> */}