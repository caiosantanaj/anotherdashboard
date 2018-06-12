import React from 'react';

import { Row } from 'reactstrap';

import { PanelHeader } from '../../components';

import LineChart from '../../charts/lineChart.jsx';
import BarChart from '../../charts/barChart.jsx';
import PieChart from '../../charts/pieChart.jsx';
import TextWidg from '../../charts/textWidg.jsx'
import ClockDateWidgt from '../../charts/clock.jsx';
import GaugeChart from '../../charts/gaugeChart.jsx';
import BubbleChart from '../../charts/bubbleChart.jsx';
import ValueChart from '../../charts/valueChart.jsx'

import { Responsive } from "react-grid-layout";
import  CustomWidthProvider  from "../../components/CustomWidthProvider.js"
import RGL from "react-grid-layout";
import _ from "lodash";

const ResponsiveReactGridLayout = CustomWidthProvider(Responsive);

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            dashState : [],
            isOpen: false,
            widgetCount: 0
        }
        this.lastPosition = {
            x: 0,
            y: 0,
            w: 1,
            h: 1,
        };
        this.changeStyle = this.changeStyle.bind(this);
        this.storeState = this.storeState.bind(this);
        this.mapToDash = this.mapToDash.bind(this);
        this.addWidget = this.addWidget.bind(this);
        this.setState = this.setState.bind(this);
        this.removeWidget = this.removeWidget.bind(this);
        this.removeWidgetFromStorage = this.removeWidgetFromStorage.bind(this);
        this.setValues = this.setValues.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.getLastWidgetPosition = this.getLastWidgetPosition.bind(this);
   }

    static defaultProps = {
       className: "layout",
       draggableCancel: ".cancel-drag",
       rowHeight: 280,
       verticalCompact: false,
       preventCollision:false
   };

   changeStyle = () => {
       this.setState({
           isOpen: !this.state.isOpen
       });
       this.onWidthChange();
   }

   setValues(values) {
       this.addWidget(values);
   }

   getLastWidgetPosition(){
       return this.lastPosition;
   }

   storeState(object){
     //localStorage.setItem('')
     this.lastId = object.id
     localStorage.setItem(object.id,JSON.stringify(object));
     localStorage.setItem("widgets",this.state.counter);
     localStorage.setItem("counter", this.state.widgetCount);
   }

   mapToDash(){
     //efectuar para todos os elementos do array
     for (var i = 0; i < localStorage.getItem("widgets")+1; i++){
       if(localStorage.getItem(i)!=null){
         var array = this.state.dashState;
         var sarray = JSON.parse(localStorage.getItem(i));
         array.push(sarray)
         this.setState({dashState: array, counter:this.state.counter}, () => {
         });
       }
     }
   }

   componentDidMount(){
     if(this.state.counter === 0 && localStorage.getItem("widgets") != null){
       this.setState({counter: parseInt(localStorage.getItem("widgets")),widgetCount: parseInt(localStorage.getItem("counter"))}, () => {
         this.mapToDash();
       });
     }
   }

   addWidget(values) {
       // State change will cause component re-render
       if(values[0] != "text" && values[0] != "clock" && values[0] != "gauge"){
           var mapping = this.getLastWidgetPosition();
           if(this.state.widgetCount == 0){
               mapping.w = 0
           }

           var array = this.state.dashState;
           array.push({id:this.state.counter + 1,
                       type: values[0],
                       name: values[1],
                       url: values[2],
                       topic: values[3],
                       auth: values[4],
                       user: values[5],
                       password: values[6],
                       position:{
                           x: mapping.x + mapping.w,
                           y: mapping.y + mapping.h - 1,
                           w: 1,
                           h: 1,
                           moved: false
                       },
                       changed: false});
           this.setState({dashState: array, counter: this.state.counter + 1, widgetCount: this.state.widgetCount+1}, () => {
             var objct = {id:this.state.counter,type: values[0], name: values[1], url: values[2], topic: values[3],
                          auth: values[4], user: values[5], password: values[6], position:{x:mapping.x + mapping.w,y:mapping.y,w:1,h:1,moved:false}, changed: false}
             this.storeState(objct);
           });
           if(this.state.widgetCount == 1){
               this.lastPosition = {x:0, y:0,w:1,h:1}
           }
           else{
               this.lastPosition = {x: mapping.x + mapping.w,y:mapping.y,w:1,h:1}
           }
       }
       else if(values[0] == "clock") {
           var array = this.state.dashState;
           var mapping = this.getLastWidgetPosition();
           if(this.state.widgetCount == 0){
               mapping.w = 0
           }

           array.push({id:this.state.counter + 1,
                       type: values[0],
                       name: values[1],
                       position:{
                           x: mapping.x + mapping.w,
                           y: mapping.y + mapping.h - 1,
                           w: 1,
                           h: 1,
                           moved: false
                           },
                           changed: false});
           this.setState({dashState: array, counter: this.state.counter + 1, widgetCount: this.state.widgetCount+1}, () => {
             var objct = {id:this.state.counter,type: values[0], name: values[1], position:{x:mapping.x + mapping.w,y:mapping.y,w:1,h:1,moved:false}, changed: false}
             this.storeState(objct);
         });
         if(this.state.widgetCount == 1){
             this.lastPosition = {x:0, y:0,w:1,h:1}
         }
         else{
             this.lastPosition = {x: mapping.x + mapping.w,y:mapping.y,w:1,h:1}
         }

       }
       else if (values[0] == "text"){
           var mapping = this.getLastWidgetPosition();
           if(this.state.widgetCount == 0){
               mapping.w = 0
           }

           var array = this.state.dashState;
           array.push({id:this.state.counter + 1,
                       type: values[0],
                       name: values[1],
                       cont: values[2],
                       position:{
                           x: mapping.x + mapping.w,
                           y: mapping.y + mapping.h - 1,
                           w: 1,
                           h: 1,
                           moved: false},
                           changed: false});
           this.setState({dashState: array, counter: this.state.counter + 1, widgetCount: this.state.widgetCount+1}, () => {
             var objct = {id:this.state.counter,type: values[0], name: values[1], cont: values[2], position:{x:mapping.x + mapping.w,y:mapping.y,w:1,h:1,moved:false}, changed: false}
             this.storeState(objct);
           });
           if(this.state.widgetCount == 1){
               this.lastPosition = {x:0, y:0,w:1,h:1}
           }
           else{
               this.lastPosition = {x: mapping.x + mapping.w,y:mapping.y,w:1,h:1}
           }
       }
       else if (values[0] == "gauge"){
           var mapping = this.getLastWidgetPosition();
           if(this.state.widgetCount == 0){
               mapping.w = 0
           }

           var array = this.state.dashState;
           array.push({id:this.state.counter + 1,
                       type: values[0],
                       name: values[1],
                       url: values[2],
                       topic: values[3],
                       minVal: values[4],
                       maxVal: values[5],
                       auth: values[6],
                       user: values[7],
                       password: values[8],
                       position:{
                           x: mapping.x + mapping.w,
                           y: mapping.y + mapping.h - 1,
                           w: 1,
                           h: 1,
                           moved: false},
                           changed: false});
           this.setState({dashState: array, counter: this.state.counter + 1, widgetCount: this.state.widgetCount+1}, () => {
             var objct = {id:this.state.counter,type: values[0], name: values[1], url: values[2], topic: values[3], minVal: values[4], maxVal: values[5], auth: values[6], user: values[7], password: values[8],position:{x:mapping.x + mapping.w,y:mapping.y,w:1,h:1,moved:false}, changed: false}
             this.storeState(objct);
           });
           if(this.state.widgetCount == 1){
               this.lastPosition = {x:0, y:0,w:1,h:1}
           }
           else{
               this.lastPosition = {x: mapping.x + mapping.w,y:mapping.y,w:1,h:1}
           }
       }
   }

    onLayoutChange(layout) {
        //to get the last position of a widget
        var lastWidgetPosition = this.getLastWidgetPosition();
        let x = 0
        let y = 0
        let w = 1
        let h = 1
        var noWidgets = true
            this.state.dashState.map((item) => {
                if(localStorage.getItem(item.id) != null){
                    noWidgets = false;
                    var oldObject = JSON.parse(localStorage.getItem(item.id));
                    for (var i = 0; i < layout.length; i++) {
                        if(layout[i].y > y){
                            x = layout[i].x;
                            y = layout[i].y;
                            w = layout[i].w;
                            h = layout[i].h;
                        }
                        else if (layout[i].y == y && layout[i].x > x) {
                            x = layout[i].x;
                            y = layout[i].y;
                            w = layout[i].w;
                            h = layout[i].h;
                        }
                        else if (layout[i].y == 0 && layout[i].x == 0) {
                            x = layout[i].x;
                            y = layout[i].y;
                            w = layout[i].w;
                            h = layout[i].h;
                        }
                        if(item.id.toString() === layout[i].i){
                            if(item.type !="text" && item.type !="clock" && item.type !="gauge" ){
                                if(oldObject.changed === false && oldObject.position.moved===false && (layout[i].x != item.position.x || layout[i].y != item.position.y)){
                                    var objct = {id:item.id,
                                                    type: item.type,
                                                    name: item.name,
                                                    url: item.url,
                                                    topic: item.topic,
                                                    auth: item.auth,
                                                    user: item.user,
                                                    password: item.password,
                                                    position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: true},
                                                    changed: false}
                                }
                                else if (oldObject.changed === false && oldObject.position.moved===true){
                                    var objct = {id:item.id,type: item.type, name: item.name, url: item.url, topic: item.topic,
                                                     auth: item.auth, user: item.user, password: item.password, position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: true}, changed: false}
                                }
                                else if (oldObject.changed === true && oldObject.position.moved===false && (layout[i].x != item.position.x || layout[i].y != item.position.y)){
                                    var oldObject = JSON.parse(localStorage.getItem(item.id));
                                    var name = oldObject.name
                                    var url = oldObject.url
                                    var topic = oldObject.topic
                                    var objct = {id:item.id,type: item.type, name: name, url: url, topic: topic,
                                                     auth: item.auth, user: item.user, password: item.password, position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: true}, changed: true}
                                }
                                else if(oldObject.changed === true && oldObject.position.moved===true){
                                    var oldObject = JSON.parse(localStorage.getItem(item.id));
                                    var name = oldObject.name
                                    var url = oldObject.url
                                    var topic = oldObject.topic
                                    var objct = {id:item.id,type: item.type, name: name, url: url, topic: topic,
                                                     auth: item.auth, user: item.user, password: item.password, position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: true}, changed: true}
                                }
                                else {
                                    var objct = {id:item.id,type: item.type, name: item.name, url: item.url, topic: item.topic,
                                                     auth: item.auth, user: item.user, password: item.password, position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: false}, changed: false}
                                }
                            }
                            else if (item.type == "clock"){
                                if (oldObject.changed === false && oldObject.position.moved===false && (layout[i].x != item.position.x || layout[i].y != item.position.y)){
                                    var objct = {id:item.id,type: item.type, name: item.name, position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: true}, changed: false}
                                }
                                else if (oldObject.changed === false && oldObject.position.moved===true) {
                                    var objct = {id:item.id,type: item.type, name: item.name, position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: true}, changed: false}
                                }
                                else if (oldObject.changed === true && oldObject.position.moved===false && (layout[i].x != item.position.x || layout[i].y != item.position.y)){
                                    var oldObject = JSON.parse(localStorage.getItem(item.id));
                                    var name = oldObject.name
                                    var objct = {id:item.id,type: item.type, name: name, position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: true}, changed: true}
                                }
                                else if(oldObject.changed === true && oldObject.position.moved===true){
                                    var oldObject = JSON.parse(localStorage.getItem(item.id));
                                    var name = oldObject.name
                                    var objct = {id:item.id,type: item.type, name: name, position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: true}, changed: true}
                                }
                                else{
                                    var objct = {id:item.id,type: item.type, name: item.name, position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: false}, changed: false}
                                }
                            }
                            else if (item.type == "text") {
                                if (oldObject.changed === false && oldObject.position.moved===false && (layout[i].x != item.position.x || layout[i].y != item.position.y)){
                                    var objct = {id:item.id,type: item.type, name: item.name, cont: item.cont ,position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: true}, changed: false}
                                }
                                else if (oldObject.changed === false && oldObject.position.moved===true){
                                    var objct = {id:item.id,type: item.type, name: item.name, cont: item.cont ,position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: true}, changed: false}
                                }
                                else if (oldObject.changed === true && oldObject.position.moved===false && (layout[i].x != item.position.x || layout[i].y != item.position.y)){
                                    var oldObject = JSON.parse(localStorage.getItem(item.id));
                                    var cont = oldObject.cont
                                    var name = oldObject.name

                                    var objct = {id:item.id,type: item.type, name: name, cont: cont ,position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: true}, changed: true}
                                }
                                else if(oldObject.changed === true && oldObject.position.moved===true){
                                    var cont = oldObject.cont
                                    var name = oldObject.name
                                    var objct = {id:item.id,type: item.type, name: name, cont: cont ,position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: true}, changed: true}
                                }
                                else {
                                    var objct = {id:item.id,type: item.type, name: item.name, cont: item.cont ,position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: false}, changed: false}
                                }
                            }
                            else if (item.type == "gauge"){
                                if (oldObject.changed === false && oldObject.position.moved===false && (layout[i].x != item.position.x || layout[i].y != item.position.y)){
                                    var objct = {id:item.id,type: item.type, name: item.name, url: item.url, topic: item.topic, minVal: item.minVal, maxVal: item.maxVal,
                                                      auth: item.auth, user: item.user, password: item.password, position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: true}, changed: false}
                                }
                                else if (oldObject.changed === false && oldObject.position.moved===true){
                                    var objct = {id:item.id,type: item.type, name: item.name, url: item.url, topic: item.topic, minVal: item.minVal, maxVal: item.maxVal,
                                                      auth: item.auth, user: item.user, password: item.password, position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: true}, changed: false}
                                }
                                else if (oldObject.changed === true && oldObject.position.moved===false && (layout[i].x != item.position.x || layout[i].y != item.position.y)){
                                    var oldObject = JSON.parse(localStorage.getItem(item.id));
                                    var name = oldObject.name
                                    var url = oldObject.url
                                    var topic = oldObject.topic
                                    var minVal = oldObject.minVal
                                    var maxVal = oldObject.maxVal

                                    var objct = {id:item.id,type: item.type, name: name, url: url, topic: topic, minVal: minVal, maxVal: maxVal,
                                                      auth: item.auth, user: item.user, password: item.password, position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: true}, changed: true}
                                }
                                else if(oldObject.changed === true && oldObject.position.moved===true){
                                    var oldObject = JSON.parse(localStorage.getItem(item.id));
                                    var name = oldObject.name
                                    var url = oldObject.url
                                    var topic = oldObject.topic
                                    var minVal = oldObject.minVal
                                    var maxVal = oldObject.maxVal

                                    var objct = {id:item.id,type: item.type, name: name, url: url, topic: topic, minVal: minVal, maxVal: maxVal,
                                                      auth: item.auth, user: item.user, password: item.password, position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: true}, changed: true}
                                }
                                else{
                                    var objct = {id:item.id,type: item.type, name: item.name, url: item.url, topic: item.topic, minVal: item.minVal, maxVal: item.maxVal,
                                                      auth: item.auth, user: item.user, password: item.password, position:{x:layout[i].x,y:layout[i].y, w:layout[i].w, h:layout[i].h,moved: false}, changed: false}
                                }
                            }
                            this.storeState(objct);
                        }
                    }
                    this.lastPosition = {x:x,y:y,w:w,h:h}
                }
            });

            if(noWidgets){
                this.lastPosition = {x:0,y:0,w:1,h:1}
            }
    }

   onWidthChange(){
       this.refs.resp.onSidebarChange();
   }

    removeWidget(id){
        //find id inside object and not index of array
        var array = this.state.dashState;
        for (var index = 0; index < this.state.dashState.length; index++){
            if(this.state.dashState[index].id === id){
                array.splice(index,1);
            }
        }

        this.setState({dashState: array, widgetCount: this.state.widgetCount-1}, () => {
            this.removeWidgetFromStorage(id);
        });
    }

    removeWidgetFromStorage(id){
      localStorage.removeItem(id)
      localStorage.setItem("counter",this.state.widgetCount)
    }

   //MyFirstGrid
   generateDOM() {


       return this.state.dashState.map((item) => {
           var xcoord = item.position.x
           var ycoord = item.position.y
           if (item.position.moved === false){ // para os casos em que o wiget acaba de ser adicionado
               var itemPosX = item.position.x

               if(itemPosX%3 == 0 && itemPosX != 0){ // verificar se posição x é divisivel por 3(num de colunas) e se posição x não é igual a zero
                   ycoord = ycoord + 1
                   xcoord = 0
               }

               if(itemPosX%3 != 0 ){ // se posição x não for divisivel por 3 pode-se incrementar o xcoord para colocar proximo widget na posição seguinte
                   xcoord = item.position.x
               }
               this.lastPosition = {x: xcoord,y:ycoord,w:1,h:1}
           }
           else {
               xcoord = item.position.x
               ycoord = item.position.y
           }

           switch (item.type) {
                case "line":
                    return (
                        <div key={item.id} data-grid={{x: xcoord, y: ycoord, w: item.position.w, h: item.position.h, maxH:3}}>
                            <LineChart chartType={item.type} id={item.id} url={item.url} topic={item.topic} authentication={item.auth} user={item.user} password={item.password} chartName={item.name} removeWidg={this.removeWidget} position={item.position}/>
                        </div>
                    );
                    break;
                case "bar":
                    return (
                        <div key={item.id} data-grid={{x: xcoord, y: ycoord, w: item.position.w, h: item.position.h, maxH:3}}>
                            <BarChart chartType={item.type} id={item.id} url={item.url} topic={item.topic} authentication={item.auth} user={item.user} password={item.password} chartName={item.name} removeWidg={this.removeWidget} position={item.position}/>
                        </div>
                    );
                    break;
                case "pie":
                    return (
                        <div key={item.id} data-grid={{x: xcoord, y: ycoord, w: item.position.w, h: item.position.h, maxH:3}}>
                            <PieChart chartType={item.type} id={item.id} url={item.url} topic={item.topic} authentication={item.auth} user={item.user} password={item.password} chartName={item.name} removeWidg={this.removeWidget} position={item.position}/>
                        </div>
                    );
                    break;
                case "gauge":
                    return (
                        <div key={item.id} data-grid={{x: xcoord, y: ycoord, w: item.position.w, h: item.position.h, maxH:3}}>
                            <GaugeChart chartType={item.type} id={item.id} url={item.url} topic={item.topic} minVal={item.minVal} maxVal={item.maxVal} authentication={item.auth} user={item.user} password={item.password} chartName={item.name} removeWidg={this.removeWidget} position={item.position}/>
                        </div>
                    );
                    break;
                case "value":
                    return (
                        <div key={item.id} data-grid={{x: xcoord, y: ycoord, w: item.position.w, h: item.position.h, maxH:1}}>
                            <ValueChart chartType={item.type} id={item.id} url={item.url} topic={item.topic} authentication={item.auth} user={item.user} password={item.password} chartName={item.name} removeWidg={this.removeWidget} position={item.position}/>
                        </div>
                    );
                    break;
                case "text":
                    return (
                        <div key={item.id} data-grid={{x: xcoord, y: ycoord, w: item.position.w, h: item.position.h, maxH:2}}>
                            <TextWidg chartType={item.type} id={item.id} cont={item.cont} chartName={item.name} removeWidg={this.removeWidget} position={item.position}/>
                        </div>
                    );
                    break;
                case "clock":
                    return (
                        <div key={item.id} data-grid={{x: xcoord, y: ycoord, w: item.position.w, h: item.position.h,maxH:1}}>
                            <ClockDateWidgt chartType={item.type} id={item.id} url={item.url} topic={item.topic} authentication={item.auth} user={item.user} password={item.password} chartName={item.name} removeWidg={this.removeWidget} position={item.position}/>
                        </div>
                    );
                break;
                case "bubble":
                    return (
                        <div key={item.id} data-grid={{x: xcoord, y: ycoord, w: item.position.w, h: item.position.h, maxH:3}}>
                            <BubbleChart chartType={item.type} id={item.id} url={item.url} topic={item.topic} authentication={item.auth} user={item.user} password={item.password} chartName={item.name} removeWidg={this.removeWidget} position={item.position}/>
                        </div>
                    );
                break;
             default:

         }
         return (
             <div key={item.id} data-grid={{x: xcoord, y: ycoord, w: item.position.w, h: item.position.h}}>
                 <LineChart chartType={item.type} id={item.id} chartName={item.name} removeWidg={this.removeWidget} position={item.position}/>
             </div>
         );
       });
   }

   render(){
       return(
           <div>
             <PanelHeader
                 size="sm"
             />
                <div>
                   <div style={{minHeight:"100vh"}} className={this.state.isOpen ? "contentOpen" : "contentClose"} >
                       <ResponsiveReactGridLayout ref="resp" cols={{ lg: 3, md: 3, sm: 2, xs: 2, xxs: 2 }}
                                                  onLayoutChange={(layout) => this.onLayoutChange(layout)}
                                                  onWidthChange={() => this.onWidthChange()}
                                                  {...this.props}>
                            {this.generateDOM()}
                       </ResponsiveReactGridLayout>
                   </div>
               </div>
           </div>
       );
   }
}

export default Dashboard;
