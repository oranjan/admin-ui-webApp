import { useEffect, useState } from "react";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [adminData, setAdminData] = useState("");
  const [editId, setEditId] = useState(0);


  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    const res = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const data = await res.json();
    setAdminData(data);
  };


  const handleDeleteClick = (id) => {
    const filteredData = adminData.filter((person) => person.id !== id);
    setAdminData(filteredData);
  };


  const handleNameChange = (e) => {
    setAdminData((prev) => {
      return prev.map((person) =>
        editId === person.id ? { ...person, name: e.target.value } : person
      );
    });
  };
  

  const handleEmailChange = (e) => {
    setAdminData((prev) => {
      return prev.map((person) => {
        return editId === person.id
          ? { ...person, email: e.target.value }
          : person;
      });
    });
  };

  const handleRoleChange = (e) => {
    setAdminData((prev) => {
      return prev.map((person) => {
        return person.id === editId? { ...person, role: e.target.value }: person;
      });
    });
  };


  if (!adminData) {
    return "Loading please Wait ";
  }

  return (
    <div className="app">
      <input
        type="search"
        id="search-input"
        name="inputBox"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        value={searchQuery}
        placeholder="Search by name, email or role"
      />
      <table>
        <tbody>
          <tr>
            <th>
              <input type="checkbox" name="checkbox" id="checkbox" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
          {adminData &&
            adminData
              .filter((person) => {
                if (searchQuery === "") {
                  return person;
                } else if (
                  person.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  person?.email
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  person.role.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                  return person;
                }
              })
              .map((person) => {
                if (editId && editId === person.id) {
                  return (
                    <tr key={person.id}>
                      <td>
                        <input
                          type="checkbox"
                          name="checkbox"
                          id={"checkbox" + person.id}
                        />
                      </td>

                      <td>
                        
                        <input
                          id={person.id}
                          type="text"
                          name="name"
                          onChange={e =>handleNameChange(e)}
                          value={person.name}
                        />
                      </td>

                      <td>
                        <input
                         id={person.id}
                         type="text" 
                         name="email" 
                         onChange={e=>handleEmailChange(e)}
                         value={person.email} />
                      </td>

                      <td>
                        <input
                         id={person.id}
                         type="text"
                         name="role" 
                         onChange={e=>handleRoleChange(e)}
                         value={person.role} />
                      </td>

                      <td>
                        <button
                        onClick={()=>setEditId(0)}
                        >
                          Save
                        </button>
                        <button onClick={() => handleDeleteClick(person.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={person.id}>
                    <td>
                      <input
                        type="checkbox"
                        name="checkbox"
                        id={"checkbox" + person.id}
                      />
                    </td>
                    <td>{person.name}</td>
                    <td>{person.email}</td>
                    <td>{person.role}</td>
                    <td>
                      <button onClick={() => setEditId(person.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteClick(person.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
