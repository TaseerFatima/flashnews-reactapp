// News.js
import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 5,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}- NewsFlash`;
  }

  async updatenews() {
    const { country, category, pageSize } = this.props;
    const { page } = this.state;
    const url = `/api/news?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}`;
    this.setState({ loading: true });
    const response = await fetch(url);
    const parsedData = await response.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  componentDidMount() {
    this.updatenews();
  }

  fetchMoreData = async () => {
    const { country, category, pageSize } = this.props;
    const nextPage = this.state.page + 1;
    const url = `/api/news?country=${country}&category=${category}&page=${nextPage}&pageSize=${pageSize}`;
    this.setState({ loading: true });
    const response = await fetch(url);
    const parsedData = await response.json();
    this.setState({
      page: nextPage,
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <h1
          className="text-center"
          style={{ margin: "35px 0px", marginTop: "90px" }}
        >
          NewsFlash-Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element, index) => {
                if (!element || !element.title || !element.url) return null;
                return (
                  <div className="col-md-4" key={element.url || index}>
                    <Newsitems
                      title={element.title}
                      description={element.description}
                      imageUrl={
                        element.urlToImage ||
                        "https://www.aljazeera.com/wp-content/uploads/2025/07/13207443-1753078512.jpg?resize=1200%2C675"
                      }
                      author={element.author || "Unknown"}
                      date={element.publishedAt || "Unknown"}
                      source={element.source?.name || "Unknown"}
                      newsurl={element.url}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
