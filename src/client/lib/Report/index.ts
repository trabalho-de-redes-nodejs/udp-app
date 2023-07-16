import fs from 'fs';

interface IReports {
  reports: IReport[];
  addReport: (message: string) => void;
  generateReportFile: () => void;
}

const Reports: IReports = {
  reports: [],
  addReport: (message: string) => {
    Reports.reports.push({
      date: new Date(),
      message,
    });
  },
  generateReportFile: (): void => {
    const filePath = 'reports.json';
    fs.writeFile(filePath, JSON.stringify(Reports.reports), (err: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Successfully wrote file');
      }
    });
  },
};

export default Reports;
