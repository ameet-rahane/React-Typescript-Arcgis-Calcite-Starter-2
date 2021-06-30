import React, { useEffect, useState} from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';
import './App.css';

function App() {
  const [ImageServerList, setImageServerList] = useState([]);
  const [ImageServerName, setImageServerName] = useState("");
  const [ImageServerDesc, setImageServerDesc] = useState("");
  const [URL, setURL] = useState("http://sampleserver6.arcgisonline.com/arcgis/rest/services");
  const [InputURL, setInputURL] = useState(URL + "?f=pjson");
  const [ServiceName, setServiceName] = useState("ImageServer");
  const CalcitePickListItem = ({name, onClick}) => {
    return (
      <calcite-pick-list-item label={name} onClick={onClick} />
    )
  };
  useEffect(() => {
    fetch(InputURL)
      .then((resp) => resp.json())
      .then((data) => {
        const  DisplayNameDescription = (item) => {
          let EndPointURLList = URL + '/' + item.name + '/' + ServiceName + '?f=pjson';
          fetch(EndPointURLList)
            .then((resp) => resp.json())
            .then((data) => {
              setImageServerName(data.name);
              setImageServerDesc(data.description);
            })
        };
        const ServiceList = data.services.filter( EndPointServices => EndPointServices.type === ServiceName)
          .map( EndPointServices => <CalcitePickListItem  name={EndPointServices.name} onClick={() => DisplayNameDescription(EndPointServices)}/>);
        setImageServerList(ServiceList);
      });   
  }, []);  
  return (
    <div className="AppName">
     
      <calcite-shell dir="ltr" class="calcite-theme-light">
        
        <calcite-shell-panel slot="primary-panel" position="start"> 
        <div style={{"padding" : "10% 10% 10% 10%", "font-weight":"bold"}}>ESRI Assignment 1 - Ameet Rahane</div>
          <calcite-pick-list id="PickList">{ImageServerList}</calcite-pick-list>
          <calcite-action-bar class="calcite-theme-dark" slot="action-bar">
            <calcite-action-group />
          </calcite-action-bar>
        </calcite-shell-panel>
        <calcite-shell-center-row height-scale="s" position="end" slot="center-row" />
        <calcite-shell-panel slot="contextual-panel" position="end">
          <calcite-panel>          
            <div slot="header-content" style={{"margin": "1% 1% 1% 1%"}} dangerouslySetInnerHTML = {{__html: ImageServerName}}/>
            <div style={{"padding": "10% 10% 10% 10%"}} dangerouslySetInnerHTML= {{__html: ImageServerDesc}}/>
          </calcite-panel>
          <calcite-action-bar class="calcite-theme-light" slot="action-bar">
            <calcite-action-group>
              <calcite-popover-manager>
                <calcite-action text="Idea" id="reference-element" label="Add Item" icon="lightbulb" appearance="solid" scale="m" />               
              </calcite-popover-manager>
              <calcite-popover className="calcite-theme-light" reference-element="reference-element" placement="auto" offset-distance="6" offset-skidding="0" open="" text-close="Close">
                <div style={{ "padding": "55px 16px" }}>
                  <p>This application was built by Esri's <a href="mailto: arahane@esri.com" style={{ "color": "cornflowerblue" }}>@arahane</a> </p>
                  <p>using <a href="https://esri.github.io/calcite-components/" style={{ "color": "cornflowerblue" }}> Calcite Components</a></p>
                </div>
              </calcite-popover>
            </calcite-action-group>
          </calcite-action-bar>
        </calcite-shell-panel>
      </calcite-shell>      
    </div>
  )};

export default App;
