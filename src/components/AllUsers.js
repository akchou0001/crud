import React, { useState, useEffect, useMemo, useRef } from "react";
import { useHistory } from "react-router";
import { useTable } from "react-table";
import CrudDataService from "../services/crud.service";
import editimg from "../images/edit.svg";
import delimg from "../images/delete1.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adduser } from "../features/userSlice";

function AllUsers() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const usersRef = useRef();
  usersRef.current = users;
  useEffect(() => {
    retrieveUsers();
  }, []);
  const retrieveUsers = () => {
    CrudDataService.get()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const editUser = (rowIndex) => {
    const id = usersRef.current[rowIndex].id;
    const firstName = usersRef.current[rowIndex].firstName;
    const lastName = usersRef.current[rowIndex].lastName;
    const email = usersRef.current[rowIndex].email;
    const password = usersRef.current[rowIndex].password;
    dispatch(
      adduser({
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
    );
    history.push("/user");
  };
  const deleteUser = (rowIndex) => {
    const id = usersRef.current[rowIndex].id;
    CrudDataService.delete(id)
      .then((response) => {
        alert(response.data.message);
        retrieveUsers();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email ID",
        accessor: "email",
      },
      {
        Header: "Password",
        accessor: "password",
      },
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
      },
      {
        Header: "Updated At",
        accessor: "updatedAt",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          console.log("rowIdx...", rowIdx);
          return (
            <div>
              <span onClick={() => editUser(rowIdx)} className="actions">
                <img src={editimg} alt="edit" />
              </span>

              <span onClick={() => deleteUser(rowIdx)} className="actions">
                <img src={delimg} alt="edit" />
              </span>
            </div>
          );
        },
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: users,
    });
  return (
    <div className="list row">
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered table-responsive"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="col-md-12">
        <Link to="/" className="btn btn-primary btn-md">
          Add New User
        </Link>
      </div>
    </div>
  );
}

export default AllUsers;
