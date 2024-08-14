
export function replacePersianWithEnglishNumbers(input) {
    if (input == null) {
      return input;
    }
    return input.replace('\u06f0', '0').replace('\u06f1', '1').replace('\u06f2', '2').replace('\u06f3', '3').replace('\u06f4', '4').replace('\u06f5', '5')
      .replace('\u06f6', '6').replace('\u06f7', '7').replace('\u06f8', '8').replace('\u06f9', '9');
  }
  
  // export function checkCodeMeli(code)
  // {
   
  //    let L=code.length;
   
  //    if(L<8 || parseInt(code,10)==0) return "کد ملی معتبر نیست";
  //    code=('0000'+code).substr(L+4-10);
  //    if(parseInt(code.substr(3,6),10)==0) return "کد ملی معتبر نیست";
  //    let c=parseInt(code.substr(9,1),10);
  //    let s=0;
  //    for(let i=0;i<9;i++)
  //       s+=parseInt(code.substr(i,1),10)*(10-i);
  //    s=s%11;
  //    return (s<2 && c==s) || (s>=2 && c==(11-s));
  //    return true;
  // }  

  export function checkCodeMeli(xv) {
    if (isNaN(xv)) {
        return "کد ملی باید شامل ارقام باشد ";
    } else if (xv == "") {
      return "کد ملی الزامی است";
    } else if (xv.length < 10) {
      return "کد ملی صحیح نیست ";
    } else {
        var yy = 0;
        var yv = parseInt(yv);
        for (let i = 0; i < xv.length; i++) {
            yv = xv[i] * (xv.length - i);
            yy += yv;
        }
        var x = yy % 11;
        if (x === 0) {
            // alert("your code is valid !");
        } else {
          return "کد ملی صحیح نیست ";
        }
        yy = 0;
    }
}

export function checkCode(value){
  if (isNaN(value)) {
    return "کد باید شامل ارقام باشد ";
  }else if(value == ""){
    return "کد الزامی است";
  }
}