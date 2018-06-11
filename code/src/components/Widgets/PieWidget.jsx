import React from 'react';
import PieChart from 'mqtt/Pie/PieChart.js';
import { Card, CardHeader, CardBody, CardTitle, Col } from 'reactstrap';
import { CardCategory } from 'components';

class PieWidget extends React.Component{

    render() {
        console.log("rendered");
        return (
            <Col xs={12} md={4}>
                <Card className="card-chart">
                  <CardHeader>
                    <CardCategory>Pie</CardCategory>
                    <CardTitle>Mouse Coordinates</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <PieChart id={this.props.id} url={this.props.url} topic={this.props.topic}/>
                    </div>
                  </CardBody>
                </Card>
              </Col>
        );
    }
}

export default PieWidget;
