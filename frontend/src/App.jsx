import "./App.css";
import useUpdateUserData from "./hooks/useUpdateUserData";
import AllRoutes from "./routes/AllRoutes";

function App() {
  const { data, loading, error } = useUpdateUserData();

  return (
    <div className="font-Poppins">
      <AllRoutes />
    </div>
  );
}

export default App;
