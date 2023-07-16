import fs from 'fs';

interface IReports {
  reports: IReport[];
  addReport: (message: string) => void;
  generateReportFile: (fileName: 'server.json' | 'client.json') => void;
}

const Reports: IReports = {
  reports: [],
  addReport: (message: string) => {
    Reports.reports.push({
      date: new Date(),
      message,
    });
  },
  generateReportFile: (fileName: 'server.json' | 'client.json'): void => {
    const filePath = `./outputs/${fileName}`;
    fs.writeFile(filePath, JSON.stringify(Reports.reports), (err: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Successfully wrote file');
      }
    });

    Reports.reports = [];
  },
};

export default Reports;
