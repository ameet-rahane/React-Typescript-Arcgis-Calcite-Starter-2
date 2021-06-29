import React, { useEffect, useState } from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';
import './App.css';
import { loadModules } from 'esri-loader';
function App() {
  const [ImageServerList, setImageServerList] = useState([]);
  const [ImageServerName, setImageServerName] = useState("");
  const [ImageServerDesc, setImageServerDesc] = useState("");
  const [URL, setURL] = useState("http://sampleserver6.arcgisonline.com/arcgis/rest/services");
  const [InputURL, setInputURL] = useState(URL + "?f=pjson");
  const [ServiceName, setServiceName] = useState("ImageServer");

  const CalcitePickListItem = ({name, onClick}) => {
    return (
      <calcite-pick-list-item label={name} onClick={onClick}></calcite-pick-list-item>
    )
  };
  const CalciteDescriptionPanel = () => {
    alert (
      
    );
  }
  
  loadModules(['esri/views/MapView', 'esri/Map'])
  .then(([MapView, Map]) => {
    const map = new Map({
      basemap: "topo-vector"
    });
    const view = new MapView({
      container: "viewDiv", // Reference to the DOM node that will contain the view
      map: map // References the map object created in step 3
    });
  })
  .catch(err => {
    // handle any errors
    console.error(err);
  });

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
        // data.services.forEach(function (item, index) {
          
        //   if (item.type === ServiceName)
        //     ImageServerList.push(<calcite-pick-list-item label={item.name} onClick={alertFunc}></calcite-pick-list-item>);
        // });
        setImageServerList(ServiceList);
      });    
  }, []);

  return (
    <div className="AppName">
      <calcite-shell dir="ltr" class="calcite-theme-light">
        <div slot="header-content"><b>ESRI Assignment 1 - Ameet Rahane </b></div>
        <calcite-shell-panel slot="primary-panel" position="start">
          <calcite-pick-list id="PickList">{ImageServerList}</calcite-pick-list>
          <calcite-action-bar class="calcite-theme-dark" slot="action-bar">
            <calcite-action-group>
            </calcite-action-group>
          </calcite-action-bar>
        </calcite-shell-panel>
        
        
        <calcite-shell-center-row height-scale="s" position="end" slot="center-row">
        <div id='viewDiv' style={{"padding":"0","margin":"0","height":"100%","width":"100%"}}></div>
        </calcite-shell-center-row>
        <calcite-shell-panel slot="contextual-panel" position="end">
          <calcite-panel>
          <div id='viewDiv'></div>
            <div slot="header-content" style={{"margin": "1% 1% 1% 1%"}}>{ImageServerName}</div>
            <div style={{"padding": "10% 10% 10% 10%"}}>{ImageServerDesc}</div>
          </calcite-panel>
          <calcite-action-bar class="calcite-theme-light" slot="action-bar">
            <calcite-action-group>
           
          <calcite-action text="Idea" id="reference-element" label="Add Item" icon="lightbulb" appearance="solid" scale="m" onClick={CalciteDescriptionPanel}>          
          </calcite-action>   
            </calcite-action-group>
          </calcite-action-bar>
        </calcite-shell-panel>
      </calcite-shell>
      
    </div>
  )};

export default App;
