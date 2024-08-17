export function DataTable({ data }) {
  const lables = [
    { label: "نام", key: "name" },
    { label: "نام خانوادگی", key: "lastName" },
    { label: "نام پدر", key: "fatherName" },
    { label: "کدملی", key: "ssnNo" },
    { label: "تاریخ تولد", key: "birthDate" },
    { label: "استان", key: "province" },
    { label: "شهر", key: "city" },
    { label: "شماره همراه", key: "mobileNo" },
    { label: "کدپستی", key: "zipCode" },
    { label: "تلفن", key: "phoneNo" },
    { label: "آدرس", key: "address" },
    // { label: "شرح بیماری", key: "visitexplanation" },
  ];
  return (
    <div
      className="h-full w-[80%] mx-auto p-4 mt-10 border-solid border-2 bg-white rounded-md border-blue-gray-700 "
      dir="rtl"
    >
      <div className="w-full grid xl:grid-cols-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 my-2">
        {lables.map((item) => {
          return (
            <div key={item} className={`my-2 bg-[#efefef2e] rounded-sm p-2 flex ${item.key === "address" && "col-span-2"}`}>
              <p className="font-bold text-[14px] w-20 after:content-[':'] text-[#b12e75]">
                {item.label}
              </p>
              <p className="mr-3">{data[item.key] ? data[item.key] : " - "}</p>
            </div>
          );
        })}
      </div>
      <div className="w-full flex gap-1 my-4 bg-[#efefef45] rounded-sm p-2">
        <p className="font-bold text-[14px] min-w-28 after:content-[':'] text-[#b12e75]">شرح بیماری</p>
        <p className="mx-1 leading-8">
          {data["visitexplanation"] ? data["visitexplanation"] : " - "}
        </p>
      </div>
    </div>
  );
}
