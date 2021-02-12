export default function reducer (articleList = [], action) {
    if(action.type == 'addArticle') {
        var articleListCopy = [...articleList];
        var findArticle = false

      for(let i=0;i<articleListCopy.length;i++){
          if(articleListCopy[i].title == action.articleLiked.title){
              findArticle = true
          }
      }
      if(!findArticle){
        articleListCopy.push(action.articleLiked);
    }
        return articleListCopy;
    } else if(action.type == 'deleteArticle') {
        var articleListCopy = [...articleList];
        var position = null
      for(let i=0;i<articleListCopy.length;i++){
          if(articleListCopy[i].title == action.title){
              position = i
          }
      }
      articleListCopy.splice(position,1);
        return articleListCopy;
    }
    else {
        return articleList;
    }
   }

