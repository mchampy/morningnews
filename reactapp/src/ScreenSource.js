import React, { useState, useEffect } from 'react';
import './App.css';
import { List, Avatar } from 'antd';
import Nav from './Nav'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {
    getSource()
  }, []);

  async function getSource() {
    var rawSource = await fetch('https://newsapi.org/v2/sources?language=fr&apiKey=55f864e8b0fe4f91ad6d6f6f51941fd8');;
    var responseSource = await rawSource.json();
    props.onFlagClick('fr')
    setSourceList(responseSource.sources)
  }

  async function getSourceAnglaise() {
            var rawSource = await fetch('https://newsapi.org/v2/sources?language=en&apiKey=55f864e8b0fe4f91ad6d6f6f51941fd8');;
            var responseSource = await rawSource.json();
            props.onFlagClick('gb')
            setSourceList(responseSource.sources)
          }

  return (
    <div>
      <Nav />
      <div className="Banner" style={{textAlign: 'center'}} mode="horizontal" >
         <img className="iconlang" src="/images/france.png" style={{width:'50px'}} onClick={() => getSource()} ></img> 
         <img className="iconlang" src='/images/united-kingdom.png' style={{width:'50px'}} onClick={() => getSourceAnglaise()}  ></img> 

    </div>
      
      <div className="HomeThemes">

        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`/images/${item.category}.png`} />}
                title={<Link to={`/screenarticlesbysource/${item.id}`} key={item.i}><h3>{item.name}</h3></Link>}
                description={item.description}
              />
            </List.Item>
          )}
        />


      </div>

    </div>
  );
}

const mapStateToProps = (state) => {
  return { token: state.token, sourceCountry: state.source };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFlagClick: (country) => {
      dispatch({ type: "changeSources", country });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSource);
