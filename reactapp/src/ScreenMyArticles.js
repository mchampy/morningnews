import React from 'react';
import './App.css';
import { Card, Icon} from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux';


const { Meta } = Card;

function ScreenMyArticles(props) {

  console.log(props.articleToDisplay)
  

  if(props.articleToDisplay < 1){
    return (
      <div>
        <Nav/>
        <div className="Banner"/>
            <div className="Card">
            <div  style={{display:'flex',justifyContent:'center'}}>
        <h1> No articles</h1>
        </div>
        </div>
      </div>
    )
  } else {
  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">

            {props.articleToDisplay.map((article, i) => (

                    <div  style={{display:'flex',justifyContent:'center'}}>
                      <Card
                        style={{  
                          width: 300, 
                          margin:'15px', 
                          display:'flex',
                          flexDirection: 'column',
                          justifyContent:'space-between' }}
                        cover={
                        <img
                            alt="example"
                            src={article.urlToImage}
                        />
                        
                        }
                        
                        actions={[
                          <Icon type="read" key="ellipsis2" />,
                          <Icon type="delete" key="ellipsis" onClick={() => {props.DeleteToWishList(article)}}/>
                        ]}
                        >
                          
                        <Meta
                          title={article.title}
                          description={article.description}
                        />


                  
                      </Card>


                    </div>

))}
   
             </div>
      
 

      </div>
  );
}
}

function mapStateToProps(state) {
  return { articleToDisplay: state.articleList }
 }

 function mapDispatchToProps(dispatch) {
  return {
    DeleteToWishList: function(article) {

      dispatch( {type: 'deleteArticle', articleDeleted: article.title})
  }
}
}
  
 export default connect(
  mapStateToProps,
  mapDispatchToProps
 )(ScreenMyArticles);
 