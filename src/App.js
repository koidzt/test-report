import { useEffect, useState } from 'react';
import { Card, Container, Tab, Table, Tabs } from 'react-bootstrap';
import './App.css';

function App() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetch('/mock-data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((jsonResponse) => {
        // console.log(jsonResponse);
        setDatas(jsonResponse);
      });
  }, []);

  //ans1
  const amountAllBills = datas.length;
  // console.log('Ans1 : ', amountAllBills);

  //ans2
  const totalSales = datas.reduce((acc, data) => {
    return acc + data.grandTotal;
  }, 0);
  // console.log('Ans2 : ', totalSales);

  //ans3
  const avgSales = totalSales / amountAllBills;
  // console.log('Ans3 : ', avgSales);

  //ans4
  const membersBill = datas.filter((data) => data.member !== null);
  const membersName = membersBill.map((bill) => bill.member.name);
  const setMember = [...new Set(membersName)];
  const amountMemberFromAllBills = setMember.length;
  // console.log('Ans4 : ', amountMemberFromAllBills);

  //ans5
  const membersAgeTotal = membersBill.reduce((acc, bill) => {
    return acc + bill.member.age;
  }, 0);
  const avgMembersAge = membersAgeTotal / membersBill.length;
  // console.log('Ans5 : ', avgMembersAge);

  //ans6
  const locationAllBill = datas.map((data) => data.location);
  const location = [...new Set(locationAllBill)];
  let totalSalesByLocation = [];
  for (let i = 0; i < location.length; i++) {
    totalSalesByLocation.push({
      location: location[i],
      grandTotal: datas
        .filter((data) => data.location === location[i])
        .reduce((acc, bill) => {
          return acc + bill.grandTotal;
        }, 0)
        .toLocaleString('en'),
    });
  }
  // console.log('Ans6 : ', totalSalesByLocation);

  //ans7
  const dateEachBill = datas.map((data) => data.businessDate);
  const allDateOfBill = [...new Set(dateEachBill)];
  let totalSalesByDate = [];
  for (let i = 0; i < allDateOfBill.length; i++) {
    totalSalesByDate.push({
      billDate: allDateOfBill[i],
      grandTotal: datas
        .filter((data) => data.businessDate === allDateOfBill[i])
        .reduce((acc, bill) => {
          return acc + bill.grandTotal;
        }, 0)
        .toLocaleString('en'),
    });
  }
  //Sort By Date
  totalSalesByDate = totalSalesByDate.slice().sort((a, b) => {
    const dateA = new Date(a.billDate),
      dateB = new Date(b.billDate);
    return dateA - dateB;
  });

  // console.log('Ans7 : ', totalSalesByDate);

  //and8
  let allTypeOfPayment = datas.map((data) => data.paymentType);
  allTypeOfPayment = [...new Set(allTypeOfPayment)];
  let summarySalesByLocation = [];
  for (let i = 0; i < location.length; i++) {
    const billsByLocation = datas.filter((data) => data.location === location[i]);

    let paymentTerm = [];
    for (let j = 0; j < allTypeOfPayment.length; j++) {
      const billsByPaymentType = billsByLocation.filter((doc) => doc.paymentType === allTypeOfPayment[j]);
      const amountBills = billsByPaymentType.length;
      const total = billsByPaymentType.reduce((acc, bill) => {
        return acc + bill.grandTotal;
      }, 0);
      const avgPerBill = total / amountBills;

      paymentTerm.push({
        type: allTypeOfPayment[j],
        amountBills: amountBills,
        total: total.toLocaleString('en'),
        avgPerBill: Number(avgPerBill.toFixed(0)).toLocaleString('en'),
      });
    }

    summarySalesByLocation.push({
      location: location[i],
      totalSales: billsByLocation
        .reduce((acc, bill) => {
          return acc + bill.grandTotal;
        }, 0)
        .toLocaleString('en'),
      amountBills: billsByLocation.length,
      avgPerBill:
        billsByLocation
          .reduce((acc, bill) => {
            return acc + bill.grandTotal;
          }, 0)
          .toLocaleString('en') / billsByLocation.length,
      paymentType: paymentTerm,
    });
  }
  // console.log('Ans8 : ', summarySalesByLocation);

  return (
    <Container className="App py-2">
      <Tabs defaultActiveKey="secA" id="uncontrolled-tab-example">
        <Tab className="py-2" eventKey="secA" title="Sec A">
          <div className="py-2">
            <Card>
              <Card.Header className="text-start" style={{ backgroundColor: '#cfe2ff' }}>
                <p className="m-0">1 how many receipts</p>
              </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <h2 className="text-success">{amountAllBills.toLocaleString('en')}</h2>
                  <p>Total Bills</p>
                </blockquote>
              </Card.Body>
            </Card>
          </div>

          <div className="py-2">
            <Card>
              <Card.Header className="text-start" style={{ backgroundColor: '#cfe2ff' }}>
                <p className="m-0">2 how much total sales in this lot.</p>
              </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <h2 className="text-success">{totalSales.toLocaleString('en')}</h2>
                  <p>Total Sales</p>
                </blockquote>
              </Card.Body>
            </Card>
          </div>

          <div className="py-2">
            <Card>
              <Card.Header className="text-start" style={{ backgroundColor: '#cfe2ff' }}>
                <p className="m-0">3 how much is avg sales in this lot.</p>
              </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <h2 className="text-success">{avgSales.toLocaleString('en')}</h2>
                  <p>Average Sales</p>
                </blockquote>
              </Card.Body>
            </Card>
          </div>
        </Tab>

        <Tab className="py-2" eventKey="secB" title="Sec B">
          <div className="py-2">
            <Card>
              <Card.Header className="text-start" style={{ backgroundColor: '#cfe2ff' }}>
                <p className="m-0">4 how many members use our service in this lot.</p>
              </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <h2 className="text-success">{amountMemberFromAllBills}</h2>
                  <p>Amount Members</p>
                </blockquote>
              </Card.Body>
            </Card>
          </div>

          <div className="py-2">
            <Card>
              <Card.Header className="text-start" style={{ backgroundColor: '#cfe2ff' }}>
                <p className="m-0">5 how much is AVERAGE members' age in this lot.</p>
              </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <h2 className="text-success">{avgMembersAge.toFixed(0).toLocaleString('en')}</h2>
                  <p>Average age of members</p>
                </blockquote>
              </Card.Body>
            </Card>
          </div>

          <div className="py-2">
            <Card>
              <Card.Header className="text-start" style={{ backgroundColor: '#cfe2ff' }}>
                <p className="m-0">6 how much total sales group by locations.</p>
              </Card.Header>
              <Card.Body className="p-1">
                <blockquote className="blockquote mb-0">
                  <p className="text-start m-1 text-secondary">Sales by Location</p>
                  <Table className="m-0">
                    {/* <thead>
                              <tr>
                                <th>Location</th>
                                <th>Total Sales</th>
                              </tr>
                            </thead> */}
                    <tbody>
                      {totalSalesByLocation.map((data, i) => (
                        <tr key={`row-${i}`}>
                          <td className="text-end">{data.location}</td>
                          <td className="text-start text-success ">{data.grandTotal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </blockquote>
              </Card.Body>
            </Card>
          </div>
        </Tab>

        <Tab className="py-2" eventKey="secC" title="Sec C">
          <div className="py-2">
            <Card>
              <Card.Header className="text-start" style={{ backgroundColor: '#cfe2ff' }}>
                <p className="m-0">7 how much total sales in each date.</p>
              </Card.Header>
              <Card.Body className="p-1">
                <blockquote className="blockquote mb-0">
                  <p className="text-start">Sales by Date</p>
                  <Table size="sm" striped className="m-0">
                    {/* <thead>
                              <tr>
                                <th>Date</th>
                                <th>Total Sales</th>
                              </tr>
                            </thead> */}
                    <tbody>
                      {totalSalesByDate.map((data, i) => (
                        <tr key={`row-${i}`}>
                          <td className="text-end">{new Date(data.billDate).toUTCString().slice(0, 16)}</td>
                          <td className="text-center text-success">{data.grandTotal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </blockquote>
              </Card.Body>
            </Card>
          </div>
        </Tab>

        <Tab className="py-2" eventKey="secD" title="Sec D">
          <div className="py-2">
            <Card.Header className="text-start" style={{ backgroundColor: '#cfe2ff' }}>
              <p className="m-0">8 IN EACH LOCATION, how much total sales, bills, average per bill by paymentType.</p>
            </Card.Header>
            <p className="text-start mt-2">Summary Sales By Location</p>

            {summarySalesByLocation.map((data, i) => (
              <Card className="my-3" key={`${data.location}-card`} wrap>
                <Card.Header className="text-start fw-bold fs-4">
                  <p className="m-0">{data.location}</p>
                </Card.Header>
                <Card.Body className="p-0">
                  <Table size="sm" className="m-0">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Sales</th>
                        <th>Bills</th>
                        <th>Avg/Bill</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.paymentType.map((payment) => (
                        <tr key={`${data.location}-paymentType-${payment.type}`}>
                          <td className="text-center">{payment.type}</td>
                          <td>{payment.total}</td>
                          <td>{payment.amountBills}</td>
                          <td>{payment.avgPerBill}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;
