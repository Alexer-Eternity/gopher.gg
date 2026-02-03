import articleData from './article.json'
function Articles() {
    return (
        <div className="articles-container">
            <h1> Articles About Go</h1>
            <ul className="articles-list">
                {articleData.map((article,index) => (
                <li key={index} className= "article-item">
                <a href={article.url} className="article-link"target="_blank" rel="noopener noreferrer">
                    {article.title}
                </a>
                <span className={"article-author"}> Author: {article.author}</span>
                </li>


                    ))}
            </ul>



        </div>);
}

export default Articles;