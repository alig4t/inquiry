import { useState, useEffect } from "react";
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
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchToken() {
      try {
        const formData = new FormData();
        formData.append("grant_type", import.meta.env.VITE_APP_GRANT_TYPE);
        formData.append("client_id", import.meta.env.VITE_APP_CLIENT_ID);
        formData.append("client_secret", import.meta.env.VITE_APP_CLIENT_SECRET);
        formData.append("username", import.meta.env.VITE_APP_USERNAME);
        formData.append("password", import.meta.env.VITE_APP_PASSWORD);

        const response = await axios.post(
          `${import.meta.env.VITE_APP_REQUEST_BASE_URL}/portal/oauth/token`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setToken(response.data.access_token);
      } catch (error) {
        console.error("Error fetching token:", error);
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
      }
    }

    fetchToken();
  }, []);

  async function getPersonInfoBySsn(ssn, treatmentCenterCode) {
    setLoading(true);

    const endpoint = `${
      import.meta.env.VITE_APP_REQUEST_BASE_URL
    }/medical/person-infos/getBySsn/${ssn}/${treatmentCenterCode}`;

    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setInfo(response.data);
    } catch (error) {
      setInfo(null);
      console.log(error);

      if (error.response && error.response.status === 404) {
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
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = (values) => {
    let eng_ssn = replacePersianWithEnglishNumbers(values.ssn);
    let eng_code = replacePersianWithEnglishNumbers(values.code);
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
