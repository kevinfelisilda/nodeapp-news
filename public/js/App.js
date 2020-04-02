const query = `
  query getNews {
    news {
      id
      title
      link
      snippet
      date
    }
  }
`;

const getNews = () => window.fetch('/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
}).then(response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw new Error(response.statusText);
  }
}).then(response => response.json()).then(({ data }) => data.news);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    getNews().then(news => {
      this.setState({
        news,
        loading: false,
      });
    }).catch(error => {
      this.setState({
        loading: false,
        error: true,
      })
    });
  }

  render() {
    const { news, loading, error } = this.state;
    return (
      <div>
        <h2>News:</h2>
        <div>
          {loading && <p>Please wait...</p>}
          {!error ? news.map((item) => (
            <div key={item.id} className="news-item">
              <small>{item.date.substring(0, item.date.length - 13)}</small>
              <a href={item.link}><h5>{item.title}</h5></a>
              <p>{item.snippet}</p>
            </div>
          )) : (
            <p className="error">Unable to fetch news data</p>
          )}
        </div>
      </div>
    );
  }
}
