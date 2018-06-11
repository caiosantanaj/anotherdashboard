import React from 'react';
import LineChart from 'mqtt/Line/LineChart.js';
import { Card, CardHeader, CardBody, CardTitle, Col } from 'reactstrap';
import { CardCategory } from 'components';

class LineWidget extends React.Component{

  // criar um state

  shouldComponentUpdate(nextProps, nextState) {
   return false;
  }

  render() {
    console.log("rerendered")
      return (
              <Col xs={12} md={4}>
                <Card className="card-chart">
                  <CardHeader>
                    <CardCategory>Line</CardCategory>
                    <CardTitle>Mouse Coordinates</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <LineChart id={this.props.id} url={this.props.url} topic={this.props.topic}/>
                    </div>
                  </CardBody>
                </Card>
              </Col>
      );
  }
}
export default LineWidget;
