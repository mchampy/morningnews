export default function reducer(articleList = [], action) {
    if (action.type == 'addArticle') {
        var articleListCopy = [...articleList];
        var findArticle = false

        for (let i = 0; i < articleListCopy.length; i++) {
            if (articleListCopy[i].title == action.articleLiked.article.title) {
                findArticle = true
            }
        }
        if (!findArticle) {
            articleListCopy.push(action.articleLiked.article);
           var saveArticle = fetch('/save-article', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `newArticle=${JSON.stringify(action.articleLiked.article)}&token=${JSON.stringify(action.articleLiked.token)}`
            });
        }
    return articleListCopy;
} else if (action.type == 'deleteArticle') {
    var articleListCopy = [...articleList];
    var position = null
    for (let i = 0; i < articleListCopy.length; i++) {
        if (articleListCopy[i].title == action.title) {
            position = i
        }
    }
    articleListCopy.splice(position, 1);
    return articleListCopy;
}
else {
    return articleList;
}
   }

