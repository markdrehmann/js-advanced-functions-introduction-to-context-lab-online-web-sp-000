function createEmployeeRecord(array) {
  let res = {}
  res.firstName = array[0]
  res.familyName = array[1]
  res.title = array[2]
  res.payPerHour = array[3]
  res.timeInEvents = []
  res.timeOutEvents = []
  return res
}

function createEmployeeRecords(array) {
  return array.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(empRecord, dateInput) {
  let [date, hour] = dateInput.split(" ")
  let obj = {};
  obj.type = "TimeIn";
  obj.hour = parseInt(hour, 10);
  obj.date = date;
  empRecord.timeInEvents.push(obj);
  return empRecord;
}

function createTimeOutEvent(empRecord, dateInput) {
  let [date, hour] = dateInput.split(" ")
  let obj = {};
  obj.type = "TimeOut";
  obj.hour = parseInt(hour, 10);
  obj.date = date;
  empRecord.timeOutEvents.push(obj);
  return empRecord;
}

function hoursWorkedOnDate(empRecord, date) {
  let clockIn = empRecord.timeInEvents.find(el => el.date === date)
  let clockOut = empRecord.timeOutEvents.find(el => el.date === date)
  return (clockOut.hour - clockIn.hour) / 100
}

function wagesEarnedOnDate(empRecord, date) {
  return hoursWorkedOnDate(empRecord, date) * empRecord.payPerHour;
}

function allWagesFor(empRecord) {
  let allDates = empRecord.timeInEvents.map(el => el.date)
  let totalPay = allDates.reduce(function(total, date) {
    return total + wagesEarnedOnDate(empRecord, date)
  }, 0)
  return totalPay
}

function findEmployeeByFirstName(srcArray, searchName) {
  return srcArray.find(el => el.firstName === searchName)
}

function calculatePayroll(srcArray) {
  return srcArray.reduce(function(total, employee) {
    return total + allWagesFor(employee)
  }, 0)
}