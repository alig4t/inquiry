import { Card, Typography } from "@material-tailwind/react";

export function DataTable({data}) {
  const lables = [
    { label: "نام", key: "name" },
    { label: "نام خانوادگی", key: "lastName" },
    { label: "نام پدر", key: "fatherName" },
    { label: "کدملی", key: "ssnNo" },
    { label: "تاریخ تولد", key: "birthDate" },
    { label: "استان", key: "province" },
    { label: "شهر", key: "city" },
    { label: "آدرس", key: "address" },
    { label: "شماره همراه", key: "mobileNo" },
    { label: "کدپستی", key: "zipCode" },
    { label: "تلفن", key: "phoneNo" },
    // { label: "شرح بیماری", key: "visitexplanation" },
  ];
  return (
    <Card className="h-full w-[80%] mx-auto p-4 mt-8 border-solid border-2 border-blue-gray-700 " dir="rtl">
      <div className="w-full grid grid-cols-4 gap-4">
        {lables.map((item) => {
          return <p className="my-2">{item.label + " : " + (data[item.key] ? data[item.key] : " - ")}</p>;
        })}
      </div>
      <div className="w-full">
        <p className="my-2">
          شرح بیماری:
          {" "}
          {data["visitexplanation"] ? data["visitexplanation"] : " - "}
        </p>
      </div>
    </Card>
  );
}
