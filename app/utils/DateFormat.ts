const DateFormat = (date: Date) => {
  const dateFormatting = new Date(date);

  const yyyy = dateFormatting.getFullYear();
  const mm = dateFormatting.getMonth() + 1;
  const dd = dateFormatting.getDate();
  return `${yyyy}.${mm >= 10 ? mm : '0' + mm}.${dd >= 10 ? dd : '0' + dd}`;
};

export default DateFormat;
