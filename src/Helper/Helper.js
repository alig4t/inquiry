
export function replacePersianWithEnglishNumbers(input) {
    if (input == null) {
      return input;
    }
    return input.replace('\u06f0', '0').replace('\u06f1', '1').replace('\u06f2', '2').replace('\u06f3', '3').replace('\u06f4', '4').replace('\u06f5', '5')
      .replace('\u06f6', '6').replace('\u06f7', '7').replace('\u06f8', '8').replace('\u06f9', '9');
  }
  