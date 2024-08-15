import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./cmp/Loading/loading";
import { DataTable } from "./cmp/DataTable/DataTable";

import {
  checkCode,
  checkCodeMeli,
  replacePersianWithEnglishNumbers,
} from "./Helper/Helper";

function App() {
  // const [fetchData, setFetchData] = useState(false);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function getPersonInfoBySsn(ssn, treatmentCenterCode) {
    setLoading(true);

    const endpoint = `${
      import.meta.env.VITE_APP_REQUEST_BASE_URL
    }/medical/person-infos/getBySsn/${ssn}/${treatmentCenterCode}`;

    // const endpoint = "https://mocki.io/v1/f8b9a316-198f-4a27-9457-4be933586a58";
    // Fake api url
    // Success! Your API is available at https://mocki.io/v1/f8b9a316-198f-4a27-9457-4be933586a58

    axios
      .get(endpoint)
      .then((response) => {
        console.log(response.data);
        setInfo(response.data);
        // setFetchData(true);
      })
      .catch((error) => {
        setInfo(null);
        console.log(error);
        if (error.response && error.response.status === 404) {
          // alert("کاربر یافت نشد");
          toast.error("کاربر در سامانه یافت نشد.", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          // alert("خطا در سرور");
          toast.error("خطا در برقراری ارتباط با سرور.", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.error("Error fetching data:", error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const onSubmit = (values) => {
    // console.log(values);
    let eng_ssn = replacePersianWithEnglishNumbers(values.ssn);
    let eng_code = replacePersianWithEnglishNumbers(values.code);
    // console.log(eng_ssn);
    // console.log(eng_code);
    getPersonInfoBySsn(eng_ssn, eng_code);
  };

  return (
    <div className="w-full h-full relative py-20">
      <div className="form-container">
        <h1 className="font-bold text-2xl text-slate-800">
          {import.meta.env.VITE_APP_BASE_TITLE}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>کد ملی</label>

            <input
              {...register("ssn", {
                validate: checkCodeMeli,
              })}
            />
            {errors.ssn && (
              <p className="text-xs pt-1 text-red-700">{errors.ssn.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>کد بیمارستان</label>
            <input
              {...register("code", {
                validate: checkCode,
              })}
            />
            {errors.code && (
              <p className="text-xs pt-1 text-red-700">{errors.code.message}</p>
            )}
          </div>

          <button className="bg-cyan-700 text-white hover:bg-cyan-800 transition w-full p-2 rounded-md mt-6 text-lg font-normal">
            مشاهده
          </button>
        </form>
      </div>

      {loading ? <Loading /> : info ? <DataTable data={info} /> : null}

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ fontFamily: "IRANSans-web" }}
      />
    </div>
  );
}

export default App;
