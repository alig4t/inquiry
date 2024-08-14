import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./App.css";
import Loading from "./cmp/Loading/loading";

import { Button } from "@material-tailwind/react";
import { checkCode, checkCodeMeli, replacePersianWithEnglishNumbers } from "./Helper/Helper";
import { DataTable } from "./cmp/DataTable/DataTable";

function App() {
  const [fetchData, setFetchData] = useState(false);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function getPersonInfoBySsn(ssn, treatmentCenterCode) {
    setLoading(true)
    const endpoint = `${
      import.meta.env.VITE_APP_REQUEST_BASE_URL
    }/medical/person-infos/getBySsn/${ssn}/${treatmentCenterCode}`;

    axios
      .post(endpoint)
      .then((response) => {
        console.log(response.data);
        setInfo(response.data);
        setFetchData(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("کاربر یافت نشد");
        } else {
          alert("خطا در سرور");
          console.error("Error fetching data:", error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const onSubmit = (values) => {
    console.log(values);
    let eng_ssn = replacePersianWithEnglishNumbers(values.ssn);
    let eng_code = replacePersianWithEnglishNumbers(values.code);
    console.log(eng_ssn);
    console.log(eng_code);
    getPersonInfoBySsn(values.ssn, values.code);
  };

  return (
    <div className="w-full h-full relative pt-20">
      <div className="form-container">
        <h1 className="font-bold text-2xl text-blue-gray-700">
          {import.meta.env.VITE_APP_BASE_TITLE}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>کد ملی</label>
            {/* <input
              type="text"
              {...register("ssn", {
                required: "کد ملی الزامی است",
                validate: checkCodeMeli,
                pattern: {
                  value: /^\d{10}$/,
                  message: "فرمت کدملی صحیح نیست",
                },
              })}
            /> */}
              <input 
          {...register("ssn", { 
            validate: checkCodeMeli 
          })}
        />
            {errors.ssn && (
              <p className="text-sm text-red-700">{errors.ssn.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>کد بیمارستان</label>
            <input
              {...register("code", {
                validate:checkCode
              })}
            />
            {errors.code && (
              <p className="text-sm text-red-700">{errors.code.message}</p>
            )}
          </div>

          <Button
            color="green"
            type="submit"
            className="mt-6 text-lg font-normal"
            fullWidth
          >
            مشاهده
          </Button>
        </form>
      </div>

      {loading ? <Loading /> : fetchData ? <DataTable data={info} /> : null}

    </div>
  );
}

export default App;
