import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Icon, Modal } from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux';


const { Meta } = Card;

function ScreenArticlesBySource(props) {

  const [articleList, setArticleList] = useState([]);

  useEffect( () => {
    async function getArticle () {
      var rawArticle = await fetch(`https://newsapi.org/v2/top-headlines?sources=${props.match.params.id}&apiKey=55f864e8b0fe4f91ad6d6f6f51941fd8`);
    var responseArticle = await rawArticle.json();

    setArticleList(responseArticle.articles)
  }
    getArticle ()
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const showModal = (title, content) => {
    setIsModalVisible(true);
    setTitle(title)
    setContent(content)
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>

      <Nav />

      <div className="Banner" />

      <div className="Card">

        {articleList.map((article, i) => (

          <div style={{ display: 'flex', justifyContent: 'center' }}>

            <Card
              style={{
                width: 300,
                margin: '15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              cover={
                <img
                  alt="article"
                  src={article.urlToImage}
                />
              }
              actions={[
                <>
                    <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title , article.content)}/>
                </>,
                    <Icon type="like" key="ellipsis" onClick={() => {props.addToWishList(article, props.token)}} />
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

    <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>{content}</p>
                  </Modal>

  </div >
)
};

const mapStateToProps = (state) => {
  return { token: state.token, sourceCountry: state.source };
};

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function(article, token) {

      dispatch( {type: 'addArticle', articleLiked: {article, token}})
  }
}
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ScreenArticlesBySource);

