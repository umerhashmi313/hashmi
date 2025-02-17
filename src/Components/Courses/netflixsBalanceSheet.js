export const balanceSheet = [
    { year: '2020', currAss: 100, nCurrAss: 200, curLia: 150, nCurLia: 50, capStock: 50, retEarn: 80, treas: 20 },
    { year: '2021', currAss: 120, nCurrAss: 210, curLia: 160, nCurLia: 60, capStock: 60, retEarn: 90, treas: 30 },
    { year: '2022', currAss: 140, nCurrAss: 230, curLia: 170, nCurLia: 70, capStock: 70, retEarn: 100, treas: 40 },
  ];
  
  export const addLabels = (series) => {
    return series.map((s) => ({
      ...s,
      label: s.dataKey,
    }));
  };
  