
// import { Spinner } from "@material-tailwind/react";
 
export default function Loading() {
  return (
  <div className=" min-w-full min-h-screen h-full absolute z-10 top-0 left-0 flex justify-center align-middle items-center text-center bg-[#80808054]">
  {/* <Spinner className="h-8 w-8" color="indigo"/> */}
  <svg class="animate-spin -ml-1 mr-3 h-9 w-9 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
		<circle class="opacity-25" stroke="currentColor" stroke-width="4" cx="12" cy="12" r="10"></circle>
		<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
	</svg>
  </div>
  );
}