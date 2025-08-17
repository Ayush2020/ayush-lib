import "./App.css";
import InputField from "./components/InputField";
import DataTable from "./components/DataTable";

type UserType = {
  id: number;
  name: string;
  age: number;
};

function App() {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onData = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className="w-100 mx-5">
        <InputField
          onChange={onInputChange}
          label="Name:"
          placeholder="Enter your name"
          helperText="This is a helper text"
          errorMessage="This is an error message"
          disabled={false}
          invalid={false}
          variant="filled"
          size="sm"
        />

        <DataTable<UserType>
          onRowSelect={onData}
          data={[
            { id: 1, name: "Kuch Bhi", age: 28 },
            { id: 2, name: "Masky Tqw", age: 34 },
            { id: 3, name: "John Don", age: 45 },
          ]}
          columns={[
            { header: "ID", accessor: "id" },
            { header: "Name", accessor: "name" },
            { header: "Age", accessor: "age" },
          ]}
          loading={false}
          selectable={true}
        />
      </div>
    </>
  );
}

export default App;
