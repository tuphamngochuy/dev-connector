export default class Utils {
  static baseUrl = 'http://localhost:5000/api';

  static displayTime(time, changeToNowFlag = false) {
    if (!time) {
      return changeToNowFlag ? 'Now' : '';
    }
    
    if(!time.includes('T')) {
      return time;
    }
    
    const timeArray = time.split('T');
    if (timeArray.length < 2) {
      return changeToNowFlag ? 'Now' : '';
    } 

    return timeArray[0];
  }

  static displayTimePretty(time, changeToNowFlag = false) {
    if (!time) {
      return changeToNowFlag ? 'Now' : '';
    }
    
    if(!time.includes('T')) {
      return time;
    }
    
    const timeArray = time.split('T');
    if (timeArray.length < 2) {
      return changeToNowFlag ? 'Now' : '';
    } 

    const timeElement = timeArray[0].split('-');

    const month = this.getMonthName(timeElement[1]);

    return month + ' ' + timeElement[0];

  }

  static getMonthName = (month) => {
    if (month === '01') {
      return 'January';
    } else if (month === '02') {
      return 'February';
    } else if (month === '03') {
      return 'March';
    } else if (month === '04') {
      return 'April';
    } else if (month === '05') {
      return 'May';
    } else if (month === '06') {
      return 'June';
    } else if (month === '07') {
      return 'July';
    } else if (month === '08') {
      return 'August';
    } else if (month === '09') {
      return 'September';
    } else if (month === '10') {
      return 'October';
    } else if (month === '11') {
      return 'November';
    } else {
      return 'December';
    }
  }
}