import React from 'react';
import BarChart from 'mqtt/Bar/BarChart.js';
import { Card, CardHeader, CardBody, CardTitle, Col } from 'reactstrap';
import { CardCategory } from 'components';

class BarWidget extends React.Component{

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
                    <CardCategory>Bar</CardCategory>
                    <CardTitle>Mouse Coordinates</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <BarChart id={this.props.id} url={this.props.url} topic={this.props.topic}/>
                    </div>
                  </CardBody>
                </Card>
              </Col>
      );
  }
}
export default BarWidget;
