import React, {useEffect, useState, useRef} from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';
import './App.css';
import MapView from "@arcgis/core/views/MapView";
import Map from '@arcgis/core/Map';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

function App() { 

  const [ImageServerList, setImageServerList] = useState([]);
  const [ImageServerName, setImageServerName] = useState("");
  const [ImageServerDesc, setImageServerDesc] = useState("");
  const [URL, setURL] = useState("http://sampleserver6.arcgisonline.com/arcgis/rest/services");
  const [InputURL, setInputURL] = useState(URL + "?f=pjson");
  const [ServiceName, setServiceName] = useState("ImageServer");
  const mapDiv = useRef(null);

  const CalcitePickListItem = ({name, onClick}) => {return <calcite-pick-list-item label={name} onClick={onClick} />};

  useEffect(() => {
    fetch(InputURL)
      .then((resp) => resp.json())
      .then((data) => {
        const  DisplayNameDescription = (item) => {
          const EndPointURLList = URL + '/' + item.name + '/' + ServiceName + '?f=pjson';
          fetch(EndPointURLList)
            .then((resp) => resp.json())
            .then((data) => {
              setImageServerName(data.name);
              setImageServerDesc(data.description);
            })
        };

        const ServiceList = data.services.filter( EndPointServices => EndPointServices.type === ServiceName);
        const ServiceListMapping = ServiceList.map(EndPointServices => <CalcitePickListItem  name={EndPointServices.name} onClick={() => {DisplayNameDescription(EndPointServices); MapOption(EndPointServices)}}><calcite-action slot="actions-end" icon="circle"></calcite-action></CalcitePickListItem>);
        setImageServerList(ServiceListMapping);

        const MapOption = (ServiceItem) => {
          const ServiceItemChoice = ServiceList.filter(ItemChoice => ItemChoice.name === ServiceItem.name)
          const ServiceItemChoiceURL = ServiceItemChoice.map(Services => URL + '/' + Services.name + '/' + ServiceName);
          const fl1 = ServiceItemChoiceURL.map((item) => {
            return new ImageryLayer({
              url: item
            });           
          })
         const map = new Map({
           basemap: "gray-vector",
           layers: fl1
         }); 
         console.log(fl1);
         const view = new MapView({
          container: mapDiv.current,
          map: map,
          center: [-100, 40],
          zoom: 3,
         });
        // const zoomToLayer = (layer) => {
        //   return layer.queryExtent()
        //    .then((resp) => {
        //     view.goTo(resp.extent);
        //   })
        // }
        //zoomToLayer(fl1);
        }
      });   
  }, [mapDiv.current]);

  return (
    <div className="AppName">    
      <calcite-shell dir="ltr" class="calcite-theme-light">
        <calcite-shell-panel slot="primary-panel" position="start"> 
        <div className= "webappHeading">ESRI Assignment 1 - Ameet Rahane</div>
        <calcite-pick-list id="PickList">{ImageServerList}</calcite-pick-list>    
          <calcite-action-bar class="calcite-theme-dark" slot="action-bar">
            <calcite-action-group />
          </calcite-action-bar>
        </calcite-shell-panel>   
        <div className="mapDiv" ref={mapDiv}/>   
        <header slot="header"> <h2>My Shell Header</h2> </header>
        <calcite-shell-panel slot="contextual-panel" position="end">
          <calcite-panel>          
            <div slot="header-content" className = "serviceName" dangerouslySetInnerHTML = {{__html: ImageServerName}}/>
            <div className = "serviceDescription" dangerouslySetInnerHTML= {{__html: ImageServerDesc}}/>
          </calcite-panel>
          <calcite-action-bar class="calcite-theme-light" slot="action-bar">
            <calcite-action-group>
              <calcite-popover-manager>
                <calcite-action text="About" id="reference-element" label="Add Item" icon="lightbulb" appearance="solid" scale="m" />               
              </calcite-popover-manager>
              <calcite-popover className="calcite-theme-light" reference-element="reference-element" placement="auto" offset-distance="6" offset-skidding="0" open="false" text-close="Close">
                <div className="detailPanel">
                  <p>This application was built by Esri's <a href="mailto: arahane@esri.com">@arahane</a> </p>
                  <p>using <a href="https://esri.github.io/calcite-components/"> Calcite Components</a></p>
                </div>
              </calcite-popover>
            </calcite-action-group>
          </calcite-action-bar>
        </calcite-shell-panel>
      </calcite-shell>      
    </div>
  )};
  
export default App;
