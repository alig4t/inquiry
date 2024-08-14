import { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './App.css'

function App() {


    const [fetchData,setFetchData] = useState(false)
    const [info,setInfo] = useState({})
    const [loading, setLoading] = useState(false);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  

async function getPersonInfoBySsn(ssn, treatmentCenterCode) {
    const endpoint = `${import.meta.env.VITE_APP_REQUEST_BASE_URL}/medical/person-infos/getBySsn/${ssn}/${treatmentCenterCode}`;

    axios.post(endpoint)
            .then(response => {
              console.log(response.data)
              setInfo(response.data); 
                setFetchData(true)
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    alert('کاربر یافت نشد'); 
                } else {
                  alert('خطا در سرور')
                    console.error('Error fetching data:', error);
                }
            })
            .finally(() => {
                setLoading(false);
            });

}


function replacePersianWithEnglishNumbers(input) {
  if (input == null) {
    return input;
  }
  return input.replace('\u06f0', '0').replace('\u06f1', '1').replace('\u06f2', '2').replace('\u06f3', '3').replace('\u06f4', '4').replace('\u06f5', '5')
    .replace('\u06f6', '6').replace('\u06f7', '7').replace('\u06f8', '8').replace('\u06f9', '9');
}


const submitForm = (values) => {
  console.log(values)

  if(values.ssn.length != 10){
    alert("کد ملی معتبر نیست")
    return;
  }

  
  if(values.code.length === 0){
    alert("کد مرکز معتبر نیست")
    return;
  }
  getPersonInfoBySsn(values.ssn,values.code)

}


  return (
    <>
    
  
    <div className="form-container">
    <h1 className='font-bold text-2xl text-slate-800'>
     {import.meta.env.VITE_APP_BASE_TITLE}
    </h1>
    

    <form onSubmit={handleSubmit((data) => submitForm(data))}>
    <div className="form-group">
    <label for="name">کد ملی</label>
      <input {...register('ssn' ,{ required: true })} />
      {errors.ssn && <p className='text-sm text-red-700'>کد ملی اجباری است.</p>}
      <label for="code">کد مرکز درمان</label>
      <input {...register('code', { required: true })} />
      {errors.code && <p className='text-sm text-red-700'>کد مرکز درمان اجباری است.</p>}
      <input type="submit" className='mt-[25px]' />
      </div>
    </form>

    
    
</div>

{fetchData && <div className='w-[80%] col-container mx-auto rtl'>
  
  <div className='col'>
<p>  شماره درخواست : {info.requestNo}</p>
<p>  کد بیمارستان : {info.hospitalizeCode}</p>
  </div>

<div className='col'>

  {info.exemptionCheckUpReports && info.exemptionCheckUpReports.map((item)=>{
    return(
     <>
      <p>  گزارش : {item.madicalAdvice}</p>
      <p>{item.visitExplanation}</p>
      <p>{item.visitDocument}</p>
     </>
    )
 
  })}


</div> 

</div>}



</>
  )
}

export default App
