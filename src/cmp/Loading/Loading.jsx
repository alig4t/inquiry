
import { Spinner } from "@material-tailwind/react";
 
export default function Loading() {
  return (
  <div className=" min-w-full min-h-screen absolute z-10 top-0 left-0 flex justify-center align-middle items-center text-center bg-[#8080803b]">
  <Spinner className="h-8 w-8" color="indigo"/>
  </div>
  );
}