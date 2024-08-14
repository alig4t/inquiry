import { Card, Typography } from "@material-tailwind/react";

export function DataTable() {
  const lables = [
    "نام",
    "نام خانوادگی",
    "نام پدر",
    "کدملی",
    "تاریخ تولد",
    "استان",
    "شهر",
  ];
  return (
    <Card className="h-full w-[80%] mx-auto p-4 mt-8  " dir="rtl">
      <div className="w-full grid grid-cols-4 gap-4">
        {lables.map((item) => {
          return <p className="my-2">{item + " : "}</p>;
        })}
      </div>
    </Card>
  );
}
